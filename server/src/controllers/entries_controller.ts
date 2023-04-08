import mongoose from "mongoose";
import { EntryModel, Entry } from "../models/genese";

export async function getAllEntries(): Promise<Entry[]> {
    const answer = await EntryModel.find().exec();
    return answer;
}

export async function addEntry(entry: Entry): Promise<Entry | undefined> {
    const relationships = await getRelationships(entry);
    if (relationships) {
        for (const relation of relationships) {
            entry.relationships.push(relation.id);
            await EntryModel.findByIdAndUpdate(relation.id, (entry: Entry) => {
                entry.relationships.push(entry.id);
            }).exec();
        }
    }

    try {
        const response = await EntryModel.create(entry)
        return response;
    } catch (error) {
        console.log(error);
        return undefined;
    }
}

async function getRelationships(entry: Entry): Promise<Entry[] | undefined> {

    const filiacao_regex = `^Filiação: (.+)\..*`

    const re_match = filiacao_regex.match(entry.scopeContent);


    if (!re_match) return undefined;

    const names_string = re_match.groups

    console.log("names_string =", names_string);

}
