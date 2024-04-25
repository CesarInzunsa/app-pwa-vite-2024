import {useState, useEffect} from "react";
import {
    Dialog,
    DialogContent,
    DialogTitle,
    Typography,
    TextField,
    DialogActions,
    Box,
    Alert,
    Checkbox, FormControlLabel
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import {LoadingButton} from "@mui/lab";
//FIC: Services
import {GetOneInstitute} from "../../../services/remote/get/GetOneInstitute.jsx";

const AddProductDetailsModal = ({
                                    AddInstituteDetailsShowModal,
                                    setAddInstituteDetailsShowModal,
                                    IdInstitutoOK,
                                    IdInstitutoBK
                                }) => {

    const [InstituteData, setInstituteData] = useState([]);

    async function fetchData() {
        try {
            const instituteData = await GetOneInstitute(IdInstitutoOK, IdInstitutoBK);
            setInstituteData(instituteData);
        } catch (error) {
            console.error("Error al obtener el instituto:", error);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    //FIC: props structure for TextField Control.
    const commonTextFieldProps = {
        fullWidth: true,
        margin: "dense",
    };

    return (
        <Dialog
            open={AddInstituteDetailsShowModal}
            onClose={() => setAddInstituteDetailsShowModal(false)}
            fullWidth
        >
            <form>
                {/* FIC: Aqui va el Titulo de la Modal */}
                <DialogTitle>
                    <Typography component="h6">
                        <strong>Ver Detalles</strong>
                    </Typography>
                </DialogTitle>
                {/* FIC: Aqui va un tipo de control por cada Propiedad de Productos */}
                <DialogContent
                    sx={{display: 'flex', flexDirection: 'column'}}
                    dividers
                >
                    {/* FIC: Campos de captura o selección */}
                    <TextField
                        id="IdInstitutoOK"
                        label="IdInstitutoOK*"
                        value={InstituteData.IdInstitutoOK}
                        InputProps={{
                            readOnly: true,
                        }}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        {...commonTextFieldProps}
                    />
                    <TextField
                        id="IdInstitutoBK"
                        label="IdInstitutoBK*"
                        value={InstituteData.IdInstitutoBK}
                        InputProps={{
                            readOnly: true,
                        }}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        {...commonTextFieldProps}
                    />
                    <TextField
                        id="DesInstituto"
                        label="DesInstituto*"
                        value={InstituteData.DesInstituto}
                        InputProps={{
                            readOnly: true,
                        }}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        {...commonTextFieldProps}
                    />
                    <TextField
                        id="Alias"
                        label="Alias*"
                        value={InstituteData.Alias}
                        InputProps={{
                            readOnly: true,
                        }}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        {...commonTextFieldProps}
                    />
                    <FormControlLabel
                        InputProps={{
                            readOnly: true,
                        }}
                        control={
                            <Checkbox
                                checked={InstituteData.Matriz == 'S' ? true : false}
                                name="Matriz"
                                color="primary"
                            />
                        }
                        label="Matriz"
                    />
                    <TextField
                        id="IdTipoGiroOK"
                        label="IdTipoGiroOK*"
                        value={InstituteData.IdTipoGiroOK}
                        InputProps={{
                            readOnly: true,
                        }}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        {...commonTextFieldProps}
                    />
                </DialogContent>
                {/* FIC: Aqui van las acciones del usuario como son las alertas o botones */}
                <DialogActions
                    sx={{display: 'flex', flexDirection: 'row'}}
                >
                    {/* FIC: Boton de Cerrar. */}
                    <LoadingButton
                        color="secondary"
                        loadingPosition="start"
                        startIcon={<CloseIcon/>}
                        variant="outlined"
                        onClick={() => setAddInstituteDetailsShowModal(false)}
                    >
                        <span>CERRAR</span>
                    </LoadingButton>
                </DialogActions>
            </form>
        </Dialog>
    );
};
export default AddProductDetailsModal;