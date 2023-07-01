import csv
import json
import sys
import re
from typing import Any

extractProcId_re = re.compile(r"[\w\s]+,\s*([\wãẽô\s]+)\.\s*Proc\.(\d+)")
extractprocessonr_re = re.compile(r"processo n\.\º (\d+)")
inquiricao_re = re.compile(r'^Inquirição de genere de (.*)$')
names_re = re.compile(r"([A-Z][a-z]+)(?:\s+[A-Z][a-z]+)*")
inside_parenthesis = re.compile(r"\((.*)\)")

date_re = re.compile(r"(\d{2})/(\d{2})/(\d{4}) (\d{2}):(\d{2}):(\d{2})")

def convert_date(date: str) -> str:
    return date_re.sub(r"\3-\2-\1 \4:\5:\6", date)

def get_my_name(entry: dict[str | Any, str | Any]) -> list[str]:
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
    return [item for sublist in result for item in sublist]

def get_relationships(entry: dict[str | Any, str | Any]) -> list[int]:
    related_material = entry['RelatedMaterial']

    relationships = []

    procIds = extractProcId_re.findall(related_material)

    for match in procIds:
        relationships.append({ "ID": int(match[1]), "Kinship": match[0] })

    processos = extractprocessonr_re.findall(related_material)
    relationships += [ {"ID": int(id), "Kinship": ""} for id in processos ]

    return relationships


def main():
    filepath = sys.argv[1]
    match = re.match(r"([^\.]+)\.CSV", filepath)

    if not match:
        return
    out_file = match.group(1) + ".json"
    entries = list()

    date_entries_to_convert = ['Created', 'ProcessInfoDate']

    with open(filepath, "r") as file:
        csv_reader = csv.DictReader(file, delimiter=";")
        first = True

        for entry in csv_reader:
            if first:
                first = False
                continue
            entry['ID'] = entry['\ufeffID']
            del entry['\ufeffID']
            entry['Names'] = get_my_name(entry)
            entry['Relationships'] = get_relationships(entry)
            entry['UnitId'] = int(entry['UnitId'])
            entries.append(entry)

            for date_entry in date_entries_to_convert:
                entry[date_entry] = convert_date(entry[date_entry])

    with open(out_file, 'w') as file:
        json_string = json.dumps(entries)
        file.write(json_string)



             

if __name__ == "__main__":
    main()
