import csv, json, re
from sys import argv
from typing import Any

def transform_line(line: dict[str, str | Any]):

    INTEGER_KEYS = ['id', 'unitId']

    for int_key in INTEGER_KEYS:
        line[int_key] = int(line[int_key])

def lower_case_line(line: dict[str, str | Any]) -> dict[str, str | Any]:
    new_line: dict[str, str | Any] = dict()

    for key, value in line.items():
        new_key = key[0].lower() + key[1:]
        new_line[new_key] = value

    return new_line

def load_csv(file_path: str) -> list[dict[str, str]]:
    json_entries: list[dict[str, str]] = list()

    with open(file_path, "r") as file:

        csv_reader = csv.DictReader(file, delimiter=';')

        for csv_entry in csv_reader:

            #Nao sei porque isto ta a ser preciso mas pronto
            csv_entry["id"] = csv_entry["\ufeffID"]
            del csv_entry["\ufeffID"]

            csv_entry = lower_case_line(csv_entry)

            transform_line(csv_entry)
            json_entries.append(csv_entry)

    return json_entries

def dump_json(file_path: str, json_entries: list[dict[str, str]]):
    with open(file_path, "w") as file:
        json_string = json.dumps(json_entries, indent=4)
        file.write(json_string)

def main():
    if len(argv) == 1:
        print("Number of arguments is not valid(pass a path to a csv file with dataset)")
        return

    file_path = argv[1]
    match = re.match(r'(.+)\.\w+', file_path)

    file_name = None if not match else match.group(1)

    file_out = "out_file.json" if not file_name else file_name + ".json"

    json_entries = load_csv(file_path)

    dump_json(file_out, json_entries)


if __name__ == "__main__":
    main()
