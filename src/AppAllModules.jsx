import {RouterProvider} from "react-router-dom";
// Routes
import router from "./navigation/NaviRoutesSecurity";
//import router from "./navigation/NaviRoutesEducation";
//import router from "./navigation/NaviRoutesCommerce";
import Footer from "./share/footer/components/Footer";

export default function AppAllModules() {
    return (
        <>
            <div id='div-app'>
                {/*<h1>Main App - All Modules</h1>*/}
                <RouterProvider router={router}/>
                <div id='div-footer'>
                    <Footer/>
                </div>
            </div>
        </>
    );
}