from sys import argv
import json
from requests import post

def main():
    if len(argv) == 1:
        print("Pass the file you would like to send, it needs to be .json")
        return

    file_path = argv[1]

    with open(file_path) as file:
        content = json.load(file)

        for obj in content:
                answer = post("http://localhost:8080/entries", json=obj)
                if answer.status_code == 404:
                    print("ocorreu erro")

if __name__ == "__main__":
    main()
