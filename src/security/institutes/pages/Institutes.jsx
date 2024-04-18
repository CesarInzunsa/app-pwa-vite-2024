import {Box} from "@mui/material";
import {useState} from "react";
import InstitutesNavTab from "../components/tabs/InstitutesNavTab";
import InstitutesTab from "../components/tabs/InstitutesTab.jsx";
import BusinessTab from "../components/tabs/BusinessTab.jsx";

const Institutes = () => {

    const [currentRowInInstitutesTab, setCurrentRowInInstitutesTab] = useState(0);
    const [currentNameTabInPrincipalTab, setCurrentNameTabInPrincipalTab] = useState("INSTITUTOS");

    return (
        <Box>
            <InstitutesNavTab
                setCurrentRowInInstitutesTab={setCurrentRowInInstitutesTab}
                setCurrentNameTabInPrincipalTab={setCurrentNameTabInPrincipalTab}
            />

            {currentNameTabInPrincipalTab == "INSTITUTOS" && <InstitutesTab/>}
            {currentNameTabInPrincipalTab == "NEGOCIOS" && <BusinessTab/>}
        </Box>
    );
};
export default Institutes;