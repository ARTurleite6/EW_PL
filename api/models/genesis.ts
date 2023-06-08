import { InferSchemaType, Schema } from "mongoose";
import { db } from "../database";

const genesisSchema = new Schema({
    ID: {
        type: String,
        required: true,
        unique: true,
    },
    ProcessInfo: {
        type: String,
        required: false,
        unique: false,
    },
    OtherDescriptiveData: {
        type: String,
        required: false,
        unique: false,
    },
    ProcessInfoDate: {
        type: Date,
        required: true,
        unique: false,
    },
    Username: {
        type: String,
        required: true,
        unique: false,
    },
    Created: {
        type: Date,
        required: true,
        unique: false,
    },
    Creator: {
        type: String,
        required: true,
        unique: false,
    },
    Highlighted: {
        type: Boolean,
        required: true,
        unique: false,
    },
    Available: {
        type: Boolean,
        required: true,
        unique: false,
    },
    Published: {
        type: Boolean,
        required: true,
        unique: false,
    },
    Revised: {
        type: Boolean,
        required: true,
        unique: false,
    },
    DescRules: {
        type: String,
        required: true,
        unique: false,
    },
    RetentionDisposalObservations: {
        type: String,
        required: false,
        unique: false,
    },
    RetentionDisposalFinalDestination: {
        type: String,
        required: false,
        unique: false,
    },
    RetentionDisposalApplyDate: {
        type: Date,
        required: false,
        unique: false,
    },
    RetentionDisposalPeriod: {
        type: String,
        required: false,
        unique: false,
    },
    RetentionDisposalClassification: {
        type: String,
        required: false,
        unique: false,
    },
    RetentionDisposalReference: {
        type: String,
        required: false,
        unique: false,
    },
    RetentionDisposalPolicy: {
        type: String,
        required: false,
        unique: false,
    },
    ApplySelectionTable: {
        type: Boolean,
        required: true,
        unique: false,
    },
    RetentionDisposalDocumentState: {
        type: String,
        required: false,
        unique: false,
    },
    TextualContent: {
        type: String,
        required: false,
        unique: false,
    },
    AllowTextualContentInference: {
        type: Boolean,
        required: true,
        unique: false,
    },
    Note: {
        type: String,
        required: false,
        unique: false,
    },
    RelatedMaterial: {
        type: String,
        required: false,
        unique: false,
    },
    AltFormAvail: {
        type: String,
        required: false,
        unique: false,
    },
    OriginalsLoc: {
        type: String,
        required: false,
        unique: false,
    },
    ContainerTypeTerm: {
        type: String,
        required: false,
        unique: false,
    },
    OtherFindAid: {
        type: String,
        required: false,
        unique: false,
    },
    PhysTech: {
        type: String,
        required: false,
        unique: false,
    },
    LangMaterial: {
        type: String,
        required: false,
        unique: false,
    },
    PreviousLoc: {
        type: String,
        required: true,
        unique: false,
    },
    OriginalNumbering: {
        type: String,
        required: false,
        unique: false,
    },
    PhysLoc: {
        type: String,
        required: true,
        unique: false,
    },
    UseRestrict: {
        type: String,
        required: false,
        unique: false,
    },
    AccessRestrict: {
        type: String,
        required: false,
        unique: false,
    },
    Arrangement: {
        type: String,
        required: false,
        unique: false,
    },
    Accruals: {
        type: String,
        required: false,
        unique: false,
    },
    AppraisalEliminationDate: {
        type: Date,
        required: false,
        unique: false,
    },
    AppraisalElimination: {
        type: String,
        required: false,
        unique: false,
    },
    Appraisal: {
        type: String,
        required: false,
        unique: false,
    },
    Signatures: {
        type: String,
        required: false,
        unique: false,
    },
    Inscriptions: {
        type: String,
        required: false,
        unique: false,
    },
    Stamps: {
        type: String,
        required: false,
        unique: false,
    },
    Monograms: {
        type: String,
        required: false,
        unique: false,
    },
    Marks: {
        type: String,
        required: false,
        unique: false,
    },
    DocumentalTypology: {
        type: String,
        required: false,
        unique: false,
    },
    DocumentalTradition: {
        type: String,
        required: false,
        unique: false,
    },
    Terms: {
        type: String,
        required: false,
        unique: false,
    },
    ScopeContent: {
        type: String,
        required: true,
        unique: false,
    },
    Classifier: {
        type: String,
        required: false,
        unique: false,
    },
    AcqInfo: {
        type: String,
        required: false,
        unique: false,
    },
    CustodHist: {
        type: String,
        required: false,
        unique: false,
    },
    GeneralContext: {
        type: String,
        required: false,
        unique: false,
    },
    InternalStructure: {
        type: String,
        required: false,
        unique: false,
    },
    Authorities: {
        type: String,
        required: false,
        unique: false,
    },
    Functions: {
        type: String,
        required: false,
        unique: false,
    },
    LegalStatus: {
        type: String,
        required: false,
        unique: false,
    },
    GeogName: {
        type: String,
        required: false,
        unique: false,
    },
    BiogHist: {
        type: String,
        required: false,
        unique: false,
    },
    Recipient: {
        type: String,
        required: false,
        unique: false,
    },
    Contributor: {
        type: String,
        required: false,
        unique: false,
    },
    MaterialAuthor: {
        type: String,
        required: false,
        unique: false,
    },
    Author: {
        type: String,
        required: false,
        unique: false,
    },
    Producer: {
        type: String,
        required: false,
        unique: false,
    },
    Repository: {
        type: String,
        required: true,
        unique: false,
    },
    AllowExtentsInference: {
        type: Boolean,
        required: true,
        unique: false,
    },
    Dimensions: {
        type: String,
        required: false,
        unique: false,
    },
    UnitDateNotes: {
        type: String,
        required: false,
        unique: false,
    },
    UnitDateBulk: {
        type: Date,
        required: false,
        unique: false,
    },
    AccumulationDates: {
        type: Date,
        required: false,
        unique: false,
    },
    AllowUnitDatesInference: {
        type: Boolean,
        required: true,
        unique: false,
    },
    UnitDateFinalCertainty: {
        type: Boolean,
        required: true,
        unique: false,
    },
    UnitDateInitialCertainty: {
        type: Boolean,
        required: true,
        unique: false,
    },
    UnitDateFinal: {
        type: Date,
        required: true,
        unique: false,
    },
    UnitDateInitial: {
        type: Date,
        required: false,
        unique: false,
    },
    OtherFormsName: {
        type: String,
        required: false,
        unique: false,
    },
    NormalizedFormsName: {
        type: String,
        required: false,
        unique: false,
    },
    AlternativeTitle: {
        type: String,
        required: false,
        unique: false,
    },
    UnitTitle: {
        type: String,
        required: true,
        unique: false,
    },
    UnitTitleType: {
        type: String,
        required: false,
        unique: false,
    },
    CountryCode: {
        type: String,
        required: true,
        unique: false,
    },
    RepositoryCode: {
        type: String,
        required: true,
        unique: false,
    },
    UnitId: {
        type: Number,
        required: false,
        unique: true,
    },
    CompleteUnitId: {
        type: String,
        required: true,
        unique: true,
    },
    EntityType: {
        type: String,
        required: false,
        unique: false,
    },
    DescriptionLevel: {
        type: String,
        required: true,
        unique: false,
    },
    Name: {
        type: String,
        required: true,
        unique: true,
    },
    Relationships: {
        type: [String],
        required: true,
        unique: false,
    },
});

export type Genesis = InferSchemaType<typeof genesisSchema>;

export const GenesisModel = db.model('geneses', genesisSchema);