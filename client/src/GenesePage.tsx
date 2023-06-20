import { ReactNode, useEffect, useState } from "react";
import { instance } from "./App";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const GenesePage = () => {
    const { id } = useParams();
    const [genese, setGenese] = useState<any | null>(null);
    const [relationships, setRelationships] = useState<any[] | null>(null);

    useEffect(() => {
        instance.get(`http://localhost:7777/api/genesis/${id}`)
            .then((response) => {
                const props = Object.entries(response.data).filter(([_key, value]) => value && value !== '');
                const geneseObject = Object.fromEntries(props);
                setGenese(geneseObject);

                const relationships = geneseObject.Relations;
                setRelationships(relationships as any[]);
            }).catch((error) => {
                console.log(error);
            });
    }, []);

    const renderRelationships = () => {
        if (relationships) {
            console.dir(relationships);
            return (
                <ul>
                    {relationships.map((relationship) => (
                        <li key={relationship.UnitId}>
                            <Link reloadDocument to={`/genesis/${relationship.UnitId}`}>{relationship.UnitTitle}</Link>
                        </li>
                    ))}
                </ul>
            );
        }
    }

    if (genese) {
        return (
            <div className="container mx-auto p-4">
                <ul className="w-1/2 bg-white p-4 shadow-md rounded">
                    {Object.entries(genese).map(([key, value]) => {
                        if (key !== '_id' && key !== 'Relations' && key !== 'Relationships') {
                            return (
                                <li key={key}>
                                    <strong>{key}: </strong>
                                    {value as ReactNode}
                                </li>
                            );
                        } else if(key === 'Relationships') {
                            return (
                                <li key={key}>
                                    <strong>{key}: </strong>
                                    {renderRelationships()}
                                </li>
                            );
                        }
                    })}
                </ul>
                <Link to="/" className="block mt-4 text-blue-600 hover:underline">
                    Return To List
                </Link>
            </div>
        );
    } else {
        return (
            <div>
                <p>Loading...</p>
            </div>
        )
    }
}

export default GenesePage;