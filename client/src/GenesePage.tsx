import { useEffect, useState } from "react";
import { instance } from "./App";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import jwtDecode from "jwt-decode";
import DateRangeComponent from "./components/DateRangeComponent";
import LogoutComponent from "./components/LogoutComponent";

type TokenPayload = {
    exp: number,
    iat: number,
    user: {
        _id: string;
        email: string;
        name: string;
        userType: string;
    }
}

type Genese = {
    RelatedMaterial: string;
    PhysLoc: string;
    PreviousLoc: string;
    PhysTech?: string;
    UnitId: number;
    CompleteUnitId: string;
    UnitTitle: string;
    DescriptionLevel: string;
    ReferenceCode: string;
    Relations: string[];
    UnitDateInitial: string;
    UnitDateFinal: string;
    UnitDateInitialCertainty: boolean;
    UnitDateFinalCertainty: boolean;
    ScopeContent: string;
};

const GenesePage = () => {

    const navigator = useNavigate();

    const [cookies, setCookies] = useCookies(['jwtToken']);
    const { id } = useParams();
    const [genese, setGenese] = useState<Genese | null>(null);
    const [relationships, setRelationships] = useState<any[] | null>(null);
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        const token = cookies.jwtToken;
        const payload: TokenPayload = jwtDecode(token);
        console.log('Payload =', payload);

        setIsAdmin(payload.user.userType === 'administrador');
    }, [cookies.jwtToken, isAdmin]);

    useEffect(() => {
        // Fetch user's admin status here and set the value of isAdmin

        instance
            .get(`http://localhost:7777/api/genesis/${id}`)
            .then((response) => {
                const props = Object.entries(response.data).filter(
                    ([_key, value]) => value && value !== ""
                );
                const geneseObject = Object.fromEntries(props) as Genese;
                setGenese(geneseObject);

                const relationships = geneseObject.Relations;
                setRelationships(relationships as any[]);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [id]);

    const renderRelationships = () => {
        if (relationships && relationships.length > 0) {
            return (
                <div>
                    <h2 className="text-xl font-bold mb-2">Links to Related Materials:</h2>
                    <ul>
                        {relationships.map((relationship) => (
                            <li key={relationship.UnitId}>
                                <span>{relationship.UnitId}:&nbsp;</span>
                                <Link
                                    reloadDocument
                                    to={`/genesis/${relationship.UnitId}`}
                                    className="text-blue-600 hover:underline"
                                >
                                    <span>{relationship.UnitTitle}</span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            );
        }
    };

    const physicalTech = () => {

        if (!genese || !genese.PhysTech) {
            return null;
        }

        return (<div>
            <h2 className="text-xl font-bold mb-2">Physical characteristics and technical requirements</h2>
            <p className="mb-4">{genese.PhysTech}</p>
        </div>);

    }

    const relatedMaterial = () => {
        if (!genese || !genese.RelatedMaterial) {
            return null;
        }

        return (
            <div>
                <h2 className="text-xl font-bold mb-2">Related material</h2>
                {genese.RelatedMaterial}
            </div>
        );

    }

    const handleDeleteGenese = async () => {
        try {
            await instance.delete(`http://localhost:7777/api/genesis/${id}`);
            alert('Inquirição de Genere Deleted sucessfully');
            navigator('/');
        } catch (error) {
            alert('Error Deleting Inquirição de Genere');
            console.log(error);
        }
    }


    if (genese) {
        return (
            <LogoutComponent>
                <div className="container mx-auto">
                    <h1 className="text-2xl font-bold mb-4">{genese.UnitTitle}</h1>
                    <div className="box-border border-2 border-black p-2">
                        <h2 className="text-xl font-bold mb-2">Description Level</h2>
                        <p className="mb-4">Composed Document</p>
                        <h2 className="text-xl font-bold mb-2">Reference Code</h2>
                        <p className="mb-4">{genese.CompleteUnitId}</p>
                        <h2 className="text-xl font-bold mb-2">Production Dates</h2>
                        <DateRangeComponent initialDate={genese.UnitDateInitial} finalDate={genese.UnitDateFinal}
                            initialDateCertainty={genese.UnitDateInitialCertainty} finalDateCertainty={genese.UnitDateFinalCertainty} />
                        <h2 className="text-xl font-bold mb-2">Scope and Content</h2>
                        <p className="mb-4">{genese.ScopeContent}</p>
                        <h2 className="text-xl font-bold mb-2">Description physical location</h2>
                        <p className="mb-4">{genese.PhysLoc}</p>
                        <h2 className="text-xl font-bold mb-2">Previous location</h2>
                        <p className="mb-4">{genese.PreviousLoc}</p>
                        {physicalTech()}
                        {relatedMaterial()}
                        {renderRelationships()}
                        {isAdmin && (
                            <div className="flex flex-row">
                                <button onClick={() => navigator(`/genesis/edit/${genese.UnitId}`)} className="block mt-4 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
                                    Edit
                                </button>
                                <button onClick={handleDeleteGenese} className="block ml-8 mt-4 bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700">
                                    Delete
                                </button>
                            </div>
                        )}
                        <Link to="/" className="block mt-4 text-blue-600 hover:underline">
                            Return To List
                        </Link>
                    </div>
                </div>
            </LogoutComponent>
        );
    } else {
        return (
            <div>
                <p>Loading...</p>
            </div>
        );
    }
};

export default GenesePage;

