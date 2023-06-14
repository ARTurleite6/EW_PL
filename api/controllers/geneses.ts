import { Genesis } from "../models/genesis";
import { GenesisModel } from "../models/genesis";

export async function getAllGeneses(): Promise<Genesis[] | undefined> {
    return await GenesisModel.find().select("UnitId UnitTitle UnitDateInitial UnitDateFinal Relationships").exec() as Genesis[];
}

export async function getGenese(id: string): Promise<Genesis | undefined> {
    return await GenesisModel.findById(id).exec() as Genesis;
}

export async function addGenese(genese: Genesis): Promise<Genesis> {
    const newGenese = new GenesisModel(genese);
    return await newGenese.save();
}
