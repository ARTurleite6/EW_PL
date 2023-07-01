import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Checkbox from "./components/Checkbox";
import InputText from "./components/InputText";
import { useCookies } from "react-cookie";
import { JwtToken } from "./ProtectedRoute";
import jwt from 'jwt-decode';
import { useNavigate } from "react-router-dom";
import { instance } from "./App";
import GenereFormComponent from "./components/GenereFormComponent";

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

const REPOSITORY_CODE = "UM-ADB";
const COUNTRY_CODE = "PT";
const UNIT_TITLE_PRE = "Inquirição de genere de ";

const CreateGenesePage = () => {

    const navigate = useNavigate();

    const [cookies, setCookie] = useCookies(['jwtToken']);

    const [username, setUsername] = useState<string>("");

    const [actualUnitInitialDate, setActualUnitInitialDate] = useState<Date>(new Date());

    const [actualUnitFinalDate, setActualUnitFinalDate] = useState<Date>(new Date());

    const [newGenese, setNewGenese] = React.useState<Genese>({
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
        ProcessInfo: "Registo criado pelo utilizador ",
        ProcessInfoDate: new Date(),
        Revised: true,
        Available: false,
        Published: true,
        Highlighted: false,
        AllowExtentsInference: false,
    });

    useEffect(() => {
        const token = cookies.jwtToken;

        const payload = jwt<JwtToken>(token);

        const newUsername = payload.user.name;

        console.dir(payload);
        console.dir(newUsername);

        setUsername(newUsername);

        newGenese.Username = newUsername;
        newGenese.Creator = newUsername;

        setNewGenese(newGenese);

    }, [cookies, username, newGenese]);

    return (
        <GenereFormComponent username={username} />
    );
}

export default CreateGenesePage;
