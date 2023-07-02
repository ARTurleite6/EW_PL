import { useEffect, useState } from "react";
import { instance } from "../App";

import { ReactSearchAutocomplete } from 'react-search-autocomplete'

import { ReactComponent as CloseSVG } from "../assets/cross-svgrepo-com.svg";

interface SearchItem {
    id: number,
    name: string,
}

interface Kinships {
    [key: string]: string,
}

const kinships: Kinships = {
    Pai: "pai",
    Avô: "avô",
    Bisavô: "bisavô",
    TioMaterno: "tio materno",
    TioPaterno: "tio paterno",
    PrimoMaterno: "primo materno",
    PrimoPaterno: "primo paterno",
    Irmão: "irmão",
    Filho: "filho",
    Neto: "neto",
    Bisneto: "bisneto",
    SobrinhoMaterno: "sobrinho materno",
    SobrinhoPaterno: "sobrinho paterno",
}

export interface Relation {
    UnitId: number,
    Name: string,
    Kinship: string,
}

interface Genere {
    _id: string,
    UnitId: number,
    UnitTitle: string,
    Kinship: string,
}

const AddRelationComponent = ({ relationships, onRelationsUpdate }: { relationships?: Genere[], onRelationsUpdate: (relations: Relation[]) => void }) => {

    const [initialized, setInitialized] = useState(false);
    const [generes, setGeneres] = useState<SearchItem[]>([]);

    const [currentSearchString, setCurrentSearchString] = useState("");

    const [relations, setRelations] = useState<Relation[]>([]);

    const [newRelation, setNewRelation] = useState<Relation>({
        UnitId: 0,
        Name: "",
        Kinship: "pai",
    });

    useEffect(() => {
        if (!initialized) {
            instance.get('/api/genesis')
                .then((response) => {
                    const result: SearchItem[] = response.data.map((genere: any) => {
                        return {
                            id: genere.UnitId,
                            name: genere.UnitTitle,
                        }
                    });
                    if (relationships) {
                        const currentRelations: Relation[] = result.filter((item) => relationships.map((value) => value.UnitId).includes(item.id)).map((item) => {
                            const kindship = relationships.find((value) => value.UnitId === item.id)?.Kinship;
                            return {
                                UnitId: item.id,
                                Name: item.name.split('Inquirição de genere de ')[1],
                                Kinship: kindship ?? "",
                            }
                        }
                        );
                        setRelations(currentRelations);
                        onRelationsUpdate(currentRelations);
                    }
                    setGeneres(result);
                }).catch((error) => {
                    console.log(error);
                });

            setInitialized(true);
        }
    }, [generes, initialized, onRelationsUpdate, relationships]);

    const onSubmit = (e: any) => {
        e.preventDefault();

        if (newRelation.UnitId === 0) {
            alert("Selecione um genere");
            return;
        }

        const relation: Relation = {
            UnitId: newRelation.UnitId,
            Name: newRelation.Name.split('Inquirição de genere de ')[1],
            Kinship: newRelation.Kinship,
        }

        const newRelations = [
            ...relations,
            relation
        ];

        setRelations(newRelations);

        setNewRelation({
            UnitId: 0,
            Name: "",
            Kinship: "pai",
        });


        onRelationsUpdate(newRelations);

    }

    const handleOnSearch = (string: string, results: SearchItem[]) => {
        // onSearch will have as the first callback parameter
        // the string searched and for the second the results.
        results.filter((result) => result.name.includes(string))
        console.log(string, results)

        setNewRelation((prevRelation) => ({ ...prevRelation, UnitId: 0 }));
    }

    const handleOnHover = (result: any) => {
        // the item hovered
        console.log(result)
    }

    const handleOnSelect = (item: any) => {
        // the item selected
        console.log(item)

        setNewRelation((prevRelation) => ({ ...prevRelation, UnitId: item.id, Name: item.name }));
    }

    const handleOnFocus = () => {
        console.log('Focused')
    }

    const formatResult = (item: SearchItem) => {
        return (
            <>
                <span style={{ display: 'block', textAlign: 'left' }}>UnitId: {item.id}</span>
                <span style={{ display: 'block', textAlign: 'left' }}>UnitTitle: {item.name}</span>
            </>
        )
    }

    const handleRemove = (relation: Relation) => {

        //remove from relations
        const newRelations = relations.filter((value) => value.UnitId !== relation.UnitId);
        setRelations(newRelations);
        onRelationsUpdate(newRelations);
        setCurrentSearchString("");
    }

    return (

        <div>
            <fieldset className={"mb-8 mt-8"} >
                <h2 className={"text-2xl font-bold mb-4"}>Related Material</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Unit</th>
                            <th>Kinship</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td style={{ width: 800 }}>
                                <ReactSearchAutocomplete<SearchItem>
                                    items={generes}
                                    onSearch={handleOnSearch}
                                    onHover={handleOnHover}
                                    onSelect={handleOnSelect}
                                    onFocus={handleOnFocus}
                                    autoFocus
                                    formatResult={formatResult}
                                    inputSearchString={currentSearchString}
                                />
                            </td>
                            <td>
                                <select id="kinship" name="Kinship" onChange={(e) => setNewRelation((prev) => ({ ...prev, Kinship: e.target.value }))}
                                    className="w-full border border-gray-300 rounded px-3 py-2"
                                >
                                    {
                                        Object.keys(kinships).map((key) => {
                                            return <option key={key} value={kinships[key]}
                                            >{kinships[key]}</option>
                                        })
                                    }
                                </select>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <button
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
                    onClick={onSubmit}
                >
                    Add
                </button>
            </fieldset >
            <div className="border-b border-t border-gray-200 mb-4">
                <ul>
                    {relations.map((relation, index) => (
                        <li key={index} className={"flex justify-between"}>
                            {<p className={"mt-2"}>{relation.Name} - {relation.Kinship}</p>}
                            <button
                                onClick={(e) => { e.preventDefault(); handleRemove(relation) }}
                                className="w-[30px] h-[30px]">
                            
                                <CloseSVG />
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </div >

    );
};

export default AddRelationComponent;
