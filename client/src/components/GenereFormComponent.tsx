import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { instance } from "../App";
import InputText from "./InputText";
import Checkbox from "./Checkbox";
import DatePicker from 'react-datepicker';
import AddRelationComponent, { Relation } from "./AddRelationComponent";

enum EntityType {
    PessoaColetiva = "Pessoa Coletiva",
    Familia = "Família",
    PessoaSingular = "Pessoa Singular",
};

interface Relationship {
    ID: number,
    Kinship: string,
}

export interface Genere {
    [key: string]: any,
    Relationships: Relationship[],
    UnitTitle: string,
    EntityType: EntityType,
    DescriptionLevel: string;
    CountryCode: string;
    RepositoryCode: string;
    AlternativeTitle?: string;
    UnitDateInitial: Date,
    UnitDateFinal: Date,
    UnitDateInitialCertainty: boolean,
    UnitDateFinalCertainty: boolean,
    AllowUnitDatesInference: boolean,
    Dimensions?: string,
    Repository: string,
    OtherFormsName?: string,
    AllowExtentsInference: boolean,
    ScopeContent: string,
    AccessRestrict?: string,
    PhysLoc: string,
    PreviousLoc: string,
    LangMaterial?: string,
    PhysTec?: string,
    RelatedMaterial?: string,
    Note?: string,
    AllowTextualContentInference: boolean,
    ApplySelectionTable: boolean,
    Revised: boolean,
    Published: boolean,
    Available: boolean,
    Highlighted: boolean,
    Creator: string,
    Created: Date,
    Username: string,
    ProcessInfoDate: Date,
    OtherDescriptiveData?: string,
    ProcessInfo: string,
}

const REQUIRED_FIELDS = [
    "UnitTitle",
    "PreviousLoc",
    "PhysLoc",
    "ScopeContent",
];

const REPOSITORY_CODE = "UM-ADB";
const COUNTRY_CODE = "PT";
const UNIT_TITLE_PRE = "Inquirição de genere de ";

const GenereFormComponent = ({ genereEntry, username }: { genereEntry?: Genere, username: string }) => {
    const navigate = useNavigate();

    const [newGenere, setNewGenere] = useState<Genere>(genereEntry ?? {
        Relationships: [],
        EntityType: EntityType.PessoaSingular,
        UnitTitle: "",
        DescriptionLevel: "DC",
        CountryCode: COUNTRY_CODE,
        RepositoryCode: REPOSITORY_CODE,
        UnitDateInitial: new Date(),
        UnitDateFinal: new Date(),
        UnitDateInitialCertainty: false,
        UnitDateFinalCertainty: false,
        AllowUnitDatesInference: false,
        Repository: "Arquivo Distrital de Braga",
        ApplySelectionTable: false,
        PhysLoc: "",
        PreviousLoc: "",
        ScopeContent: "",
        AllowTextualContentInference: true,
        Creator: username,
        Created: new Date(),
        Username: username,
        ProcessInfo: "Registo criado pelo utilizador " + username,
        ProcessInfoDate: new Date(),
        Revised: true,
        Available: false,
        Published: true,
        Highlighted: false,
        AllowExtentsInference: false,
    });

    const [actualUnitInitialDate, setActualUnitInitialDate] = useState<Date>(new Date(newGenere.UnitDateInitial));

    const [actualUnitFinalDate, setActualUnitFinalDate] = useState<Date>(new Date(newGenere.UnitDateFinal));

    const [relations, setRelations] = useState<Relation[]>([]);

    useEffect(() => {


        if (genereEntry) {

            const booleanCamps = ['UnitDateInitialCertainty', 'UnitDateFinalCertainty', 'AllowUnitDatesInference', 'AllowExtentsInference', 'AllowTextualContentInference', 'ApplySelectionTable', 'Revised', 'Published', 'Available', 'Highlighted'];

            for (const camp of booleanCamps) {
                const booleanValue = genereEntry[camp];

                if (booleanValue === "False" || booleanValue === "false") {
                    genereEntry[camp] = false;
                } else if (booleanValue === "True" || booleanValue === "true") {
                    genereEntry[camp] = true;
                }
            }

            genereEntry.ProcessInfoDate = new Date();
            genereEntry.ProcessInfo = "Registo atualizado pelo utilizador " + username;

            setNewGenere(genereEntry);
        }
    }, [newGenere, username, genereEntry]);

    const handleUnitInitialDateChange = (date: Date) => {
        setActualUnitInitialDate(date);
        setNewGenere((prevGenere) => ({ ...prevGenere, UnitDateInitial: date }));
    }

    const handleUnitFinalDateChange = (date: Date) => {
        setActualUnitFinalDate(date);
        setNewGenere((prevGenere) => ({ ...prevGenere, UnitDateFinal: date }));
    }

    const handleFormSubmit = async (event: { preventDefault: () => void; }) => {
        event.preventDefault();


        if (!REQUIRED_FIELDS.every((value) => {
            return newGenere[value] !== "";
        })) {
            alert('Required fields were not given');
            return;
        }

        if (!genereEntry) {
            try {
                let auxGenere = {
                    ...newGenere,
                };
                if (relations.length > 0) {
                    auxGenere.RelatedMaterial = "Serie de inquiricoes de genere: ";
                    for (const relation of relations) {
                        auxGenere.RelatedMaterial += " " + relation.Name + ", " + relation.Kinship + ". Proc." + relation.UnitId.toString() + ".";
                    }

                    auxGenere.Relationships = relations.map((value) => ({ ID: value.UnitId, Kinship: value.Kinship }));

                    console.log(auxGenere.RelatedMaterial);
                    setNewGenere(auxGenere);
                } else {
                    auxGenere.RelatedMaterial = "";
                    auxGenere.Relationships = [];
                }

                const response = await instance.post('http://localhost:7777/api/genesis', auxGenere);

                alert('Entry inserted sucessfully');

                const createGenese = response.data;

                navigate('/genesis/' + createGenese.UnitId);

            } catch (error) {
                alert('Ocurred an error when creating the entry');
            }
        } else {
            try {
                let auxGenere = {
                    ...newGenere,
                }
                if (relations.length > 0) {
                    auxGenere.RelatedMaterial = "Serie de inquiricoes de genere:";
                    for (const relation of relations) {
                        auxGenere.RelatedMaterial += " " + relation.Name + ", " + relation.Kinship + ". Proc." + relation.UnitId.toString() + ".";
                    }

                    auxGenere.Relationships = relations.map((value) => ({ ID: value.UnitId, Kinship: value.Kinship }));
                } else {
                    auxGenere.RelatedMaterial = "";
                    auxGenere.Relationships = [];
                }

                const response = await instance.put('http://localhost:7777/api/genesis/' + genereEntry.UnitId, auxGenere);

                alert('Entry updated sucessfully');
                navigate('/genesis/' + auxGenere.UnitId);
            } catch (error) {
                alert('Ocurred an error when updating the entry');
            }
        }
    }

    const handleFormChange = (e: React.ChangeEvent<HTMLSelectElement>, field: string) => {
        e.preventDefault();
        const auxGenere = {
            ...newGenere,
            field: e.target.value
        }
        setNewGenere(auxGenere);
    }

    return (
        <div className="container mx-auto p-4" >
            {
                !genereEntry ? <h2 className="text-2xl font-bold mb-4">Create Inquirição Genere</h2> :
                    <h2 className="text-2xl font-bold mb-4">Edit Inquirição Genere</h2>
            }

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

                <InputText onChange={(value) => {
                    const auxGenere = {
                        ...newGenere,
                        UnitTitle: UNIT_TITLE_PRE + value,
                    }
                    setNewGenere(auxGenere);
                }
                }
                    required={true}
                    message={"UnitTitle"} placeholder={"Insert the required title (person/name of people)"} value={newGenere.UnitTitle} />

                <InputText onChange={(value) => newGenere.AlternativeTitle = value}
                    message={"AlternativeTitle"} placeholder={"Insert the alternative title"} value={newGenere.AlternativeTitle ?? ""} />

                <InputText onChange={(value) => newGenere.OtherFormsName = value}
                    message={"Other forms of name"} placeholder={"Insert other forms of name"} value={newGenere.OtherFormsName ?? ""} />

                <div className="flex">
                    <div className="mr-4">
                        <label className="block text-gray-700 font-bold mb-2" htmlFor="unitTitle">
                            Unit Date Initial
                        </label>
                        <DatePicker selected={actualUnitInitialDate} onChange={handleUnitInitialDateChange} />
                        <Checkbox message={"Unit Date Initial Certainty"} checked={newGenere.UnitDateInitialCertainty} onChange={(value) => { newGenere.UnitDateInitialCertainty = value as boolean; setNewGenere(newGenere); }} />
                    </div>
                    <div>
                        <label className="block text-gray-700 font-bold mb-2" htmlFor="unitTitle">
                            Unit Date Initial
                        </label>
                        <DatePicker selected={actualUnitFinalDate} onChange={handleUnitFinalDateChange} />
                        <Checkbox message={"Unit Date Final Certainty"} checked={newGenere.UnitDateFinalCertainty} onChange={(value) => { newGenere.UnitDateFinalCertainty = value as boolean; setNewGenere(newGenere); }} />
                    </div>
                </div>
                <Checkbox message={"Allow Unit Dates Inference"} checked={newGenere.AllowUnitDatesInferece} onChange={(value) => { newGenere.AllowUnitDatesInferece = value as boolean; setNewGenere(newGenere); }} />

                <InputText onChange={(value) => newGenere.Dimensions = value}
                    message={"Dimensions"} placeholder={"Insert dimension"} value={newGenere.Dimensions ?? ""} />

                <Checkbox message={"Allow Extents Inference"} checked={newGenere.AllowExtentsInference} onChange={(value) => { newGenere.AllowExtentsInference = value as boolean; setNewGenere(newGenere); }} />

                <InputText value={newGenere.PhysTec ?? ""} placeholder={"Insert Physical characteristics and technical requirements of the document"} message={"Physical characteristics and technical requirements"} onChange={(value) => newGenere.PhysLoc = value} />

                <InputText message={"Previous Location"} required={true} value={newGenere.PreviousLoc} placeholder={"Insert the previous location of the document"} onChange={(value) => newGenere.PreviousLoc = value} />

                <InputText message={"Physical Location"} required={true} value={newGenere.PhysLoc} placeholder={"Insert the physical location of the document"} onChange={(value) => newGenere.PhysLoc = value} />

                <InputText message={"Scope and Content"} required={true} value={newGenere.ScopeContent} placeholder="Insert Scope and Content" onChange={(value) => newGenere.ScopeContent = value} />

                <Checkbox message={"Allow Textual Content Inference"} checked={newGenere.AllowTextualContentInference} onChange={(value) => { newGenere.AllowTextualContentInference = value as boolean; setNewGenere(newGenere); }} />

                <Checkbox message={"Apply Selection Table"} checked={newGenere.ApplySelectionTable} onChange={(value) => { newGenere.ApplySelectionTable = value as boolean; setNewGenere(newGenere); }} />

                <Checkbox message={"Revised"} checked={newGenere.Revised} onChange={(value) => { newGenere.Revised = value as boolean; setNewGenere(newGenere); }} />

                <Checkbox message={"Available"} checked={newGenere.Available} onChange={(value) => { newGenere.Available = value as boolean; setNewGenere(newGenere); }} />

                <Checkbox message={"Published"} checked={newGenere.Published} onChange={(value) => { newGenere.Published = value as boolean; setNewGenere(newGenere); }} />

                <Checkbox message={"Highlighted"} checked={newGenere.Highlighted} onChange={(value) => { newGenere.Highlighted = value as boolean; setNewGenere(newGenere); }} />

                <InputText message={"Notes"} placeholder={"Insert Notes"} value={newGenere.Notes} onChange={(value) => newGenere.Notes = value} />

                <AddRelationComponent relationships={genereEntry?.Relations} onRelationsUpdate={(newRelations) => { setRelations([...newRelations]); }} />

                <div className="flex justify-between">
                    <button
                        type="submit"
                        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Save
                    </button>
                    <Link
                        to={'/'}
                        className="text-blue-600 hover:underline"
                    >
                        Cancel
                    </Link>
                </div>
            </form>

            <p className={"mt-8"}>* - Required Field</p>

        </div >
    );
}

export default GenereFormComponent;
