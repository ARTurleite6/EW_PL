import { EntryModel, Entry, parseFiliacoes, parseName } from "../models/genese";

export async function getAllEntries(): Promise<Entry[]> {
    const answer = await EntryModel.find().exec();
    return answer;
}

export async function addEntry(entry: Entry): Promise<Entry | null> {
    const filiacoes = parseFiliacoes(entry);
    const name = parseName(entry);
    console.dir("name: ", name);
    if (!name) return null;

    entry.filiacoes = filiacoes ?? [];
    entry.name = name;
    await addRelationships(entry);

    try {
        const response = await EntryModel.create(entry);
        return response;
    } catch {
        console.dir("Erro");
        return null;
    }
}

async function addRelationships(entry: Entry): Promise<void> {
    for (const filiacao of entry.filiacoes) {
        await EntryModel.findOneAndUpdate({ name: filiacao }, (data: Entry) => {
            data.relationships.push(entry.id);
            entry.relationships.push(data.id);
        }).exec();
    }
}
