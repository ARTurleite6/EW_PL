import csv
import json
import sys
import re
from typing import Any

inquiricao_re = re.compile(r'^Inquirição de genere de (.*)$')
group_names_re = re.compile(r'^Filiação: ([^\.]+\.)')
names_re = re.compile(r"([A-Z][a-z]+)(?:\s+[A-Z][a-z]+)*")
inside_parenthesis = re.compile(r"\((.*)\)")

def get_my_name(entry: dict[str | Any, str | Any]) -> list[list[str]]:
    campo_nomes = inquiricao_re.match(entry['UnitTitle'])
    result: list[list[str]] = list()
    if campo_nomes:
        nomes = campo_nomes.group(1).split(',')

        ultimos_nomes = nomes[-1].split(' e ')
        nomes.pop()
        nomes += ultimos_nomes

        result_aux: list[set[str]] = list()
        for nome in nomes:
            alternativas = nome.split(' (ou ')
            if len(alternativas) == 1:
                alternativas = nome.split(' ou ')
            else:
                alternativas = list(map(lambda x: x.rstrip(')'), alternativas))
            result_aux.append(set(alternativas))

        for person in result_aux:
            alternativas = list()
            for alternativa in person:
                match = inside_parenthesis.search(alternativa)
                if match:
                    name_match = names_re.match(match.group(1))
                    if name_match:
                        name = name_match.group(0)
                        alternativa_1 = re.sub(r'\((.*?)\)', '', alternativa)
                        alternativa_2 = re.sub(r'\((.*?)\)', name, alternativa)
                        alternativas.append(alternativa_1)
                        alternativas.append(alternativa_2)
                else:
                    alternativas.append(alternativa)
            result.append(alternativas)
    return result

def get_names_scope(entry: dict[str | Any, str | Any]) -> list[str]:
    scope = entry['ScopeContent']
    list_names = group_names_re.match(scope)

    if list_names:
        list_names = list_names.group(1)
    else:
        return []

    return list(map(lambda x: x.group(0), names_re.finditer(list_names)))


def main():
    filepath = sys.argv[1]
    match = re.match(r"([^\.]+)\.CSV", filepath)

    if not match:
        return
    out_file = match.group(1) + ".json"
    entries = list()

    with open(filepath, "r") as file:
        csv_reader = csv.DictReader(file, delimiter=";")
        first = True

        total_count = 0
        count = 0
        for entry in csv_reader:
            if first:
                first = False
                continue
            entry['ID'] = entry['\ufeffID']
            del entry['\ufeffID']
            entry['Names'] = get_my_name(entry)
            if len(entry['Names']) > 0:
                count += 1
            entry['Relationships'] = get_names_scope(entry)
            total_count += 1
            entries.append(entry)



    with open(out_file, 'w') as file:
        json_string = json.dumps(entries)
        file.write(json_string)



             

if __name__ == "__main__":
    main()
