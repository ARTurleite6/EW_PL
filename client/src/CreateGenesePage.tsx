import React, { useState } from "react";
import { Link } from "react-router-dom";
import { instance } from "./App";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

enum EntityType {
    PessoaColetiva = "Pessoa Coletiva",
    Familia = "Família",
    PessoaSingular = "Pessoa Singular",
};

interface Genese {
    [key: string]: any,
    UnitTitle: string,
    EntityType: EntityType,
    DescriptionLevel: string;
    CountryCode: string;
    RepositoryCode: string;
    AlternativeTitle?: string;
    UnitDateInitial: Date,
    UnitDateFinal: Date,
}

const REPOSITORY_CODE = "UM-ADB";
const COUNTRY_CODE = "PT";
const UNIT_TITLE_PRE = "Inquirição de genere de ";

const CreateGenesePage = () => {

    const [newGenese, setNewGenese] = React.useState<Genese>({
        EntityType: EntityType.PessoaSingular,
        UnitTitle: "",
        DescriptionLevel: "DC",
        CountryCode: COUNTRY_CODE,
        RepositoryCode: REPOSITORY_CODE,
        UnitDateInitial: new Date(),
        UnitDateFinal: new Date(),
    });

    const handleFormSubmit = async () => {
        const response = await instance.post("api/genesis", newGenese);

        if (response.status === 201) {
            alert("Genese created successfully");
        }
    }

    const handleFormChange = (e: React.ChangeEvent<HTMLSelectElement>, field: string) => {
        newGenese[field] = e.target.value;
    }

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">Create Genese</h2>

            <form onSubmit={handleFormSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2" htmlFor="unitTitle">
                        EntityType
                    </label>
                    <select id="entityType" name="EntityType" onChange={(e) => handleFormChange(e, 'EntityType')}
                        className="w-full border border-gray-300 rounded px-3 py-2"
                    >
                        <option value="Pessoa Singular">Pessoa Singular</option>
                        <option value="Pessoa Coletiva">Pessoa Coletiva</option>
                        <option value="Família">Família</option>
                    </select>
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2" htmlFor="unitTitle">
                        Unit Title
                    </label>
                    <input
                        type="text"
                        id="unitTitle"
                        name="UnitTitle"
                        placeholder="Insert the required title (person/name of persons)"
                        onChange={(e) => newGenese.UnitTitle = UNIT_TITLE_PRE + e.target.value}
                        className="w-full border border-gray-300 rounded px-3 py-2"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2" htmlFor="unitTitle">
                        Alternative Title
                    </label>
                    <input
                        type="text"
                        id="alternativeTitle"
                        name="AlternativeTitle"
                        placeholder="Insert the alternative title"
                        onChange={(e) => newGenese.AlternativeTitle = e.target.value}
                        className="w-full border border-gray-300 rounded px-3 py-2"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2" htmlFor="unitTitle">
                        Other forms of name
                    </label>
                    <input
                        type="text"
                        id="otherFormsName"
                        name="OtherFormsName"
                        placeholder="Insert other forms of name"
                        onChange={(e) => newGenese.OtherFormsName = e.target.value}
                        className="w-full border border-gray-300 rounded px-3 py-2"
                    />
                </div>

                <DatePicker selected={newGenese.UnitDateInitial} onChange={(date: Date) => newGenese.UnitDateInitial = date} />
                <DatePicker selected={newGenese.UnitDateFinal} onChange={(date: Date) => newGenese.UnitDateFinal = date} />


                <div className="flex justify-between">
                    <button
                        type="submit"
                        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Save
                    </button>
                    <Link
                        to={'/genesis'}
                        className="text-blue-600 hover:underline"
                    >
                        Cancel
                    </Link>
                </div>
            </form>

        </div >
    );
}

export default CreateGenesePage;
