import axios from "axios";

export function GetOneInstitute(IdInstitutoOK, IdInstitutoBK) {
    return new Promise((resolve, reject) => {

        axios.get(import.meta.env.VITE_GET_ONE_INSTITUTE + 'IdInstitutoOK=' + IdInstitutoOK + '&IdInstitutoBK=' + IdInstitutoBK)
            .then((response) => {
                const data = response.data;

                if (!data.success) {
                    console.error("No se pudo realizar correctamente la petición <<GetOneInstitute - Services>>", data);
                    reject(data); // Rechaza la promesa con la respuesta si no fue exitosa
                } else if (data.data.length === 0) {
                    console.info("🛈 No se encontraron documentos en <<cat_instituto>>");
                    resolve([]);
                } else if (data.success) {
                    const InstituteData = data.data[0].dataRes;
                    //console.log("Colección: <<cat_prod_serv>>", ProductsData);
                    resolve(JSON.parse(JSON.stringify(InstituteData))); // Resuelve la promesa y hace una copia profunda
                }
            })
            .catch((error) => {
                console.error("Error en <<GetOneInstitute - Services>>", error);
                reject(error); // Rechaza la promesa en caso de error
            });
    });

}