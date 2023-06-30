import { FilterQuery } from "mongoose";
import { Genesis } from "../models/genesis";
import { GenesisModel } from "../models/genesis";

export async function createGenere(genese: Genesis): Promise<Genesis> {
    const newGenese = new GenesisModel(genese);
    return await newGenese.save();
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
