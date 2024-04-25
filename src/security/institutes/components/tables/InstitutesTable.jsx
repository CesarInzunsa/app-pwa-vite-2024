import {useEffect, useState} from "react";

//FIC: Material UI
import {MaterialReactTable} from 'material-react-table';
import {Box, Stack, Tooltip, Button, IconButton, Dialog} from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import EditIcon from "@mui/icons-material/Edit";
import InfoIcon from "@mui/icons-material/Info";
import DeleteIcon from "@mui/icons-material/Delete";
import RefreshIcon from "@mui/icons-material/Refresh";

//FIC: DB
//import InstitutesStaticData from '../../../../db/security/json/institutes/InstitutesData';
import {getAllInstitutes} from '../../services/remote/get/GetAllInstitutes';

//FIC: Modals
import AddInstituteModal from "../modals/AddInstituteModal";
import AddProductDetailsModal from "../modals/detailsModals/AddProductDetailsModal";

//FIC: Columns Table Definition.
const InstitutesColumns = [
    {
        accessorKey: "IdInstitutoOK",
        header: "ID OK",
        size: 30, //small column
    },
    {
        accessorKey: "IdInstitutoBK",
        header: "ID BK",
        size: 30, //small column
    },
    {
        accessorKey: "DesInstituto",
        header: "INSTITUTO",
        size: 150, //small column
    },
    {
        accessorKey: "Alias",
        header: "ALIAS",
        size: 50, //small column
    },
    {
        accessorKey: "Matriz",
        header: "MATRIZ",
        size: 30, //small column
    },
    {
        accessorKey: "IdTipoGiroOK",
        header: "GIRO",
        size: 150, //small column
    },
    {
        accessorKey: "IdInstitutoSupOK",
        header: "ID OK SUP",
        size: 30, //small column
    },
];

//FIC: Table - FrontEnd.
const InstitutesTable = ({setDatosSeleccionados, datosSeleccionados}) => {

    //FIC: controlar el estado del indicador (loading).
    const [loadingTable, setLoadingTable] = useState(true);

    //FIC: controlar el estado de la data de Institutos.
    const [InstitutesData, setInstitutesData] = useState([]);

    //FIC: controlar el estado que muesta u oculta la modal de nuevo Instituto.
    const [AddInstituteShowModal, setAddInstituteShowModal] = useState(false);

    // Controlar el estado que muestra u oculta la modal para ver los detalles de un producto
    const [AddInstituteDetailsShowModal, setAddInstituteDetailsShowModal] = useState(false);

    // Función para manejar el clic en una fila
    const sendDataRow = (rowData) => {
        // Accede a los datos necesarios del registro (rowData) y llama a tu método
        const {IdInstitutoOK, IdInstitutoBK} = rowData.original;
        // Mostrar en consola los datos del registro
        console.log("IdInstitutoOK: ", IdInstitutoOK);
        console.log("IdInstitutoBK: ", IdInstitutoBK);
        // Actualizar el estado de los datos seleccionados
        setDatosSeleccionados({IdInstitutoOK, IdInstitutoBK});
    };

    async function fetchData() {
        try {
            // Obtener la data de los Institutos desde el servicio remoto.
            const AllInstitutesData = await getAllInstitutes();
            setInstitutesData(AllInstitutesData);

            // Simular la data de los Institutos desde el archivo JSON.
            //setInstitutesData(InstitutesStaticData);
            setLoadingTable(false);
        } catch (error) {
            console.error("Error al obtener los institutos en useEffect de InstitutesTable: ", error);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <Box>
            <Box>
                <MaterialReactTable
                    columns={InstitutesColumns}
                    initialState={{density: "compact", showGlobalFilter: true}}
                    data={InstitutesData}
                    state={{isLoading: loadingTable}}
                    enableMultiRowSelection={false}
                    enableRowSelection={true}
                    muiTableBodyRowProps={({row}) => ({
                        onClick: row.getToggleSelectedHandler(),
                        onClickCapture: () => sendDataRow(row),
                        sx: {cursor: 'pointer'},
                    })}
                    renderTopToolbarCustomActions={() => (
                        <>
                            {/* ------- BARRA DE ACCIONES ------ */}
                            <Stack direction="row" sx={{m: 1}}>
                                <Box>
                                    <Tooltip title="Agregar">
                                        <IconButton
                                            onClick={() => setAddInstituteShowModal(true)}>
                                            <AddCircleIcon/>
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title="Editar">
                                        <IconButton>
                                            <EditIcon/>
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title="Eliminar">
                                        <IconButton>
                                            <DeleteIcon/>
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title="Detalles ">
                                        <IconButton
                                            onClick={() => setAddInstituteDetailsShowModal(true)}>
                                            <InfoIcon/>
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title="Refrescar">
                                        <IconButton
                                            onClick={fetchData}>
                                            <RefreshIcon/>
                                        </IconButton>
                                    </Tooltip>
                                </Box>
                            </Stack>
                            {/* ------- BARRA DE ACCIONES FIN ------ */}
                        </>
                    )}
                />
                {/* M O D A L E S */}
                <Dialog open={AddInstituteShowModal}>
                    <AddInstituteModal
                        AddInstituteShowModal={AddInstituteShowModal}
                        setAddInstituteShowModal={setAddInstituteShowModal}
                        fetchData={fetchData}
                        onClose={() => setAddInstituteShowModal(false)}
                    />
                </Dialog>
                <Dialog open={AddInstituteDetailsShowModal}>
                    <AddProductDetailsModal
                        AddInstituteDetailsShowModal={AddInstituteDetailsShowModal}
                        setAddInstituteDetailsShowModal={setAddInstituteDetailsShowModal}
                        IdInstitutoOK={datosSeleccionados.IdInstitutoOK}
                        IdInstitutoBK={datosSeleccionados.IdInstitutoBK}
                        onClose={() => setAddInstituteDetailsShowModal(false)}
                    />
                </Dialog>
            </Box>
        </Box>
    );
};

export default InstitutesTable;