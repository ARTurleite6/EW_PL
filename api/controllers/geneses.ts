import { FilterQuery } from "mongoose";
import { Genesis } from "../models/genesis";
import { GenesisModel } from "../models/genesis";

export async function getGeneseByName(name: string): Promise<Genesis[]> {
    return await GenesisModel.aggregate([
        {
            $unwind: "$Names",
        },
        {
            $match: {
                Names: name,
            },
        },
        {
            $project: {
                UnitId: true,
                UnitTitle: true,
                UnitDateInitial: true,
                UnitDateFinal: true,
            },
        },
    ]).exec();
}

export async function getAllGeneses(filterOptions: FilterQuery<Genesis> & { Name?: string }): Promise<Genesis[]> {

    const pipelines: any[] = []

    if ("Name" in filterOptions) {
        pipelines.push({
            $unwind: "$Names",
        });

        const name = filterOptions.Name;
        delete filterOptions.Name;
        filterOptions.Names = name;
    }

    console.log("Filter Options = ", filterOptions);

    pipelines.push({
        $match: filterOptions
    },
        {
            $project: {
                UnitId: true,
                UnitTitle: true,
                UnitDateInitial: true,
                UnitDateFinal: true,
            },
        });

    console.log(pipelines);


    return await GenesisModel.aggregate(pipelines).exec();
    //return await GenesisModel.find(filterOptions).select("UnitId UnitTitle UnitDateInitial UnitDateFinal").exec() as Genesis[];
}

export async function getGenese(id: number): Promise<Genesis | undefined> {
    const response = await GenesisModel.aggregate([
        {
            $match: { "UnitId": id },
        },
        {
            $limit: 1,
        },
        {
            $unwind: {
                path: "$Relationships",
                preserveNullAndEmptyArrays: true,
            }
        },
        {
            $lookup: {
                from: "geneses",
                localField: "Relationships",
                foreignField: "UnitId",
                as: "Relations",
                pipeline: [
                    {
                        $project: {
                            "UnitId": true,
                            "UnitTitle": true,
                        },
                    }
                ],
            },
        },
    ]).exec();

    console.dir(response);

    if (response.length == 0) {
        console.log('nao encontrei ninguem');
        return undefined;
    }

    return response[0];
}

export async function addGenese(genese: Genesis): Promise<Genesis> {
    const newGenese = new GenesisModel(genese);
    return await newGenese.save();
}
