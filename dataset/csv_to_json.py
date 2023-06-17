import csv
import json
import sys
import re
from typing import Any

extractProcId_re = re.compile(r"Proc\.(\d+)")
extractprocessonr_re = re.compile(r"processo n\.\º (\d+)")

def get_relationships(entry: dict[str | Any, str | Any]) -> list[int]:
    related_material = entry['RelatedMaterial']

    procIds = extractProcId_re.findall(related_material)
    relationships = [int(id) for id in procIds]

    processos = extractprocessonr_re.findall(related_material)
    relationships += [ int(id) for id in processos ]

    return relationships


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

        for entry in csv_reader:
            if first:
                first = False
                continue
            entry['ID'] = entry['\ufeffID']
            del entry['\ufeffID']
            entry['Relationships'] = get_relationships(entry)
            entry['UnitId'] = int(entry['UnitId'])
            entries.append(entry)



    with open(out_file, 'w') as file:
        json_string = json.dumps(entries)
        file.write(json_string)



             

if __name__ == "__main__":
    main()
