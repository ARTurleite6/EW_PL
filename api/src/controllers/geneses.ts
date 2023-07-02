import { FilterQuery } from "mongoose";
import { Genesis, fillIDValues } from "../models/genesis";
import { GenesisModel } from "../models/genesis";

export async function getLocations(): Promise<string[]> {
    return await GenesisModel.distinct("PhysLoc").exec();
}

export async function createGenere(genese: Genesis): Promise<Genesis> {
    genese = await fillIDValues(genese);

    const newGenese = new GenesisModel(genese);

    return await newGenese.save();
}

export async function updateGenere(genere: Genesis): Promise<Genesis> {
    return await GenesisModel.updateOne({ UnitId: genere.UnitId }, genere).exec();
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

    pipelines.push({
        $match: filterOptions
    },
        {
            $project: {
                UnitId: true,
                UnitTitle: true,
                UnitDateInitial: true,
                UnitDateFinal: true,
                Names: true,
                PhysLoc: true,
            },
        },
        {
            $sort: {
                UnitId: 1,
                UnitTitle: 1,
            }
        });

    if ("_page" in filterOptions && "_limit" in filterOptions) {
        const page = parseInt(filterOptions._page);
        const limit = parseInt(filterOptions._limit);
        delete filterOptions._page;
        delete filterOptions._limit;
        pipelines.push({
            $skip: (page - 1) * limit
        },
            {
                $limit: limit
            })
    }


    return await GenesisModel.aggregate(pipelines).exec();
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
                localField: "Relationships.ID",
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
        {
            $unwind: {
                path: "$Relations",
                preserveNullAndEmptyArrays: true,
            }
        },
        {
            $addFields: {
                "Relations.Kinship": "$Relationships.Kinship",
            }
        },
        {
            $group: {
                _id: "$_id",
                data: { $first: "$$ROOT" },
                Relations: { $push: "$Relations" },
            }
        },
        //now unwrap the data
        {
            $replaceRoot: {
                newRoot: {
                    $mergeObjects: ["$data", { Relations: "$Relations" }]
                }
            }
        },
    ]).exec();


    if (response.length == 0) {
        console.log('nao encontrei ninguem');
        return undefined;
    }

    const genese = response[0];

    if (genese.Relations.length == 1 && Object.keys(genese.Relations[0]).length == 0) {
        genese.Relations = [];
    }

    return genese;
}

