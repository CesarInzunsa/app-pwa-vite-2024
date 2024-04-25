import {Box} from "@mui/material";
import {useState} from "react";
import InstitutesNavTab from "../components/tabs/InstitutesNavTab";
//import InstitutesTab from "../components/tabs/InstitutesTab.jsx";
import BusinessTab from "../components/tabs/BusinessTab.jsx";
import InstitutesTable from "../components/tables/InstitutesTable.jsx";

const Institutes = () => {

    const [currentRowInInstitutesTab, setCurrentRowInInstitutesTab] = useState(0);
    const [currentNameTabInPrincipalTab, setCurrentNameTabInPrincipalTab] = useState("INSTITUTOS");

    // useState para guardar los ids seleccionados de un instituto y compartirlos entre tabs.
    const [datosSeleccionados, setDatosSeleccionados] = useState({IdInstitutoOK: "0", IdInstitutoBK: "0"});

    return (
        <Box>
            <InstitutesNavTab
                setCurrentRowInInstitutesTab={setCurrentRowInInstitutesTab}
                setCurrentNameTabInPrincipalTab={setCurrentNameTabInPrincipalTab}
            />

            {currentNameTabInPrincipalTab == "INSTITUTOS" &&
                <InstitutesTable setDatosSeleccionados={setDatosSeleccionados}
                                 datosSeleccionados={datosSeleccionados}/>}
            {currentNameTabInPrincipalTab == "NEGOCIOS" && <BusinessTab/>}
        </Box>
    );
};
export default Institutes;