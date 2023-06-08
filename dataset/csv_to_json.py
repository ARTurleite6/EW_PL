import csv
import json
import sys
import re
from typing import Any

inquiricao_re = re.compile(r'^Inquirição de genere de ([A-Z][a-z]+(?:\s+[A-Z][a-z]+)*)$')
group_names_re = re.compile(r'^Filiação: ([^\.]+\.)')
names_re = re.compile(r"([A-Z][a-z]+)(?:\s+[A-Z][a-z]+)*")

def get_my_name(entry: dict[str | Any, str | Any]) -> str | None:
    match = inquiricao_re.match(entry['UnitTitle'])
    if match:
        print(match.group(1))
    else:
        print(entry['UnitTitle'])

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

    entries_name = dict()

    with open(filepath, "r") as file:
        csv_reader = csv.DictReader(file, delimiter=";")
        first = True
        for entry in csv_reader:
            if first:
                first = False
                continue
            entry['ID'] = entry['\ufeffID']
            del entry['\ufeffID']
            entries.append(entry)
            entry['Name'] = get_my_name(entry)
            entry['Relationships'] = get_names_scope(entry)

    with open(out_file, 'w') as file:
        json_string = json.dumps(entries)
        file.write(json_string)



             

if __name__ == "__main__":
    main()
