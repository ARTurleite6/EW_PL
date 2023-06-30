import { useState, useEffect } from "react";
import { instance } from "./App";
import { useParams, Link, useNavigate } from "react-router-dom";

interface GeneseEditForm {
    UnitTitle: string,
    UnitTitleType?: string;
    AlternativeTitle?: string;
    UnitDateInitial: Date;
    UnitDateFinal: Date;
    UnitDateInitialCertainty: Date;
    UnitDateFinalCertainty: Date;
    AllowUnitDatesInference: boolean;
    AccumulationDates?: Date[];
    UnitDateBulk?: Date;
    UnitDateNotes?: string;
    Dimensions?: string;
    AllowExtentsInference: boolean
    Producer?: string;
    Author?: string;
    MaterialAuthor?: string;
    Contributor?: string;
    Recipient?: string;
    BiogHist?: string;
    GeogName?: string;
    LegalStatus?: string,
    Functions: string;
    Authorities?: string;
    InternalStructure?: string;
    GeneralContext: string;
    CustodHist: string;
    AcqInfo: string;
    Classifier: string;
    ScopeContent: string;
    Terms?: string;
    DocumentalTradition?: string;
    DocumentalTypology?: string;
    Marks?: string;
    Monograms?: string;
    Stamps?: string;
    Inscriptions?: string;
    Signatures?: string;
    Appraisal?: string;
    AppraisalElimination?: string;
    AppraisalEliminationDate?: Date;
    Accruals?: string;
    Arrangement?: string;
    AccessRestrict?: string;
    UseRescrict?: string;
    PhysLoc: number;
    OriginalNumbering?: string;
    PreviousLoc: string;
    LangMaterial?: string[];
    PhysTech?: string;
    OtherFindAid?: string;
    ContainerTypeTerm?: string;
    OriginalsLoc?: string;
    AltFormAvail?: string;
    RelatedMaterial?: string;
    Relations: number[];
    Note?: string;
    AllowTexturalContentInference: boolean;
    TextualContent?: string;
    RetentionDisposalDocumentState?: string;
    ApplySelectionTable: boolean;
    RetentionDisposalPolicy?: string;
    RetentionDisposalClassification?: string;
    RetentionDisposalPeriod?: string;
    RetentionDisposalApplyDate?: Date;
    RetentionDisposalFinalDestination?: string;
    RetentionDisposalObservations?: string;
    DescRules?: string;
    Revised: boolean;
    Published: boolean;
    Available: boolean;
    Highlighted: boolean;
    Creator: string
    Created: Date;
    Username: string;
    ProcessInfoDate: Date;
    OtherDescriptiveDates?: string;
    ProcessInfo?: string;
}

const EditGenesePage = () => {

    const { id } = useParams();
    const [genese, setGenese] = useState<any | null>(null);
    const [updatedGenese, setUpdatedGenese] = useState<any | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        instance
            .get(`http://localhost:7777/api/genesis/${id}`)
            .then((response) => {
                setGenese(response.data);
                setIsLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setIsLoading(false);
            });
    }, [id]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUpdatedGenese((prevGenese: any) => ({
            ...prevGenese,
            [name]: value,
        }));
    };

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Perform API request to update the genese using updatedGenese state

        // Reset the form or redirect to the genese page
    };

    if (isLoading) {
        return <p>Loading...</p>;
    }

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">Edit Genese</h2>
            {genese && (
                <form onSubmit={handleFormSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-bold mb-2" htmlFor="unitTitle">
                            Unit Title
                        </label>
                        <input
                            type="text"
                            id="unitTitle"
                            name="UnitTitle"
                            value={updatedGenese?.UnitTitle || ""}
                            onChange={handleInputChange}
                            className="w-full border border-gray-300 rounded px-3 py-2"
                        />
                    </div>

                    {/* Add more input fields for other properties you want to edit */}

                    <div className="flex justify-between">
                        <button
                            type="submit"
                            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        >
                            Save
                        </button>
                        <Link
                            to={`/genesis/${id}`}
                            className="text-blue-600 hover:underline"
                        >
                            Cancel
                        </Link>
                    </div>
                </form>
            )}
        </div>
    );
};

export default EditGenesePage;

