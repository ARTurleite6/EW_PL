import mongoose, { InferSchemaType } from "mongoose";
import { mongoConn } from "../main";

const schema = new mongoose.Schema({
    id: { type: Number, required: true, unique: true },
    name: { type: String, required: true },
    descriptionLevel: { type: String, required: true },
    entityType: { type: String, required: false },
    completeUnitId: { type: String, required: true, unique: true },
    unitId: { type: Number, required: true, unique: true },
    repositoryCode: { type: String, required: true },
    countryCode: { type: String, required: true },
    unitTitleType: { type: String, required: false },
    unitTitle: { type: String, required: true },
    alternativeTitle: { type: String, required: false },
    normalizedFormsName: { type: String, required: false },
    otherFormsName: { type: String, required: false },
    unitDateInitial: { type: Date, required: true },
    unitDateFinal: { type: Date, required: true },
    unitDateInitialCertainty: { type: Boolean, required: true },
    unitDateFinalCertainty: { type: Boolean, required: true },
    allowUnitDatesInference: { type: Boolean, required: true },
    accumulationDates: { type: String, required: false },
    unitDateBulk: { type: String, required: false },
    unitDateNotes: { type: String, required: false },
    dimensions: { type: String, required: false },
    allowExtentsInference: { type: Boolean, required: true },
    repository: { type: String, required: true },
    producer: { type: String, required: false },
    author: { type: String, required: false },
    materialAuthor: { type: String, required: false },
    contributor: { type: String, required: false },
    recipient: { type: String, required: false },
    biogHist: { type: String, required: false },
    geogName: { type: String, required: false },
    legalStatus: { type: String, required: false },
    functions: { type: String, required: false },
    authorities: { type: String, required: false },
    internalStructure: { type: String, required: false },
    generalContext: { type: String, required: false },
    custodHist: { type: String, required: false },
    acqInfo: { type: String, required: false },
    classifier: { type: String, required: false },
    scopeContent: { type: String, required: true },
    relationships: { type: [Number] },
    terms: { type: String, required: false },
    documentTradition: { type: String, required: false },
    documentTypology: { type: String, required: false },
    marks: { type: String, required: false },
    monograms: { type: String, required: false },
    stamps: { type: String, required: false },
    inscriptions: { type: String, required: false },
    signatures: { type: String, required: false },
    appraisal: { type: String, required: false },
    appraisalElimination: { type: String, required: false },
    appraisalEliminationDate: { type: Date, required: false },
    accruals: { type: String, required: false },
    arrangement: { type: String, required: false },
    accessRestrict: { type: String, required: false },
    useRestrict: { type: String, required: false },
    physLoc: { type: String, required: true },
    originalNumbering: { type: String, required: false },
    previousLoc: { type: String, required: true },
    langMaterial: { type: String, required: false },
    physTech: { type: String, required: false },
    otherFindAid: { type: String, required: false },
    containerTypeTerm: { type: String, required: false },
    originalsLoc: { type: String, required: false },
    altFormAvail: { type: String, required: false },
    relatedMaterial: { type: String, required: false },
    allowTextualContentInference: { type: Boolean, required: true },
    textualContent: { type: String, required: false },
    retentionDisposalDocumentState: { type: String, required: false },
    applySelectionTable: { type: Boolean, required: true },
    retentionDisposalPolicy: { type: String, required: false },
    retentionDisposalReference: { type: String, required: false },
    retentionDisposalClassification: { type: String, required: false },
    retentionDisposalPeriod: { type: String, required: false },
    retentionDisposalApplyDate: { type: Date, required: false },
    retentionDisposalFinalDestination: { type: String, required: false },
    retentionDisposalObservations: { type: String, required: false },
    descRules: { type: String, required: false },
    revised: { type: Boolean, required: true },
    published: { type: Boolean, required: true },
    available: { type: Boolean, required: true },
    highlighted: { type: Boolean, required: true },
    creator: { type: String, required: true },
    created: { type: Date, required: true },
    username: { type: String, required: true },
    processInfoDate: { type: Date, required: true },
    otherDescriptiveData: { type: String, required: false },
    processInfo: { type: String, required: false },
    filiacoes: [String],
});

export type Entry = InferSchemaType<typeof schema>;

export const EntryModel = mongoose.model('entries', schema);

export function parseFiliacoes(entry: Entry): string[] | undefined {

    const filiacao_regex = /Filiação: (.+?)\./

    const re_match = entry.scopeContent.match(filiacao_regex)
    if (!re_match || re_match.length < 2) return undefined;
    const nomes_group = re_match[1];

    const lista_nomes_regex = /([\w\s]+)(?:,\w+)?\s+\e\s+([\w\s]+)(?:,\w+)?/;

    const lista_nomes = nomes_group.match(lista_nomes_regex);

    if (!lista_nomes || lista_nomes.length < 2) return undefined;

    return lista_nomes.slice(1);
}


export function parseName(entry: Entry): string | undefined {
    const expression = "Inquirição de genere de ([\w\s]+)";

    const re_match = entry.unitTitle.match(expression);
    if (!re_match || re_match.length < 2) return undefined;

    const name = re_match[1];

    return name;
}
