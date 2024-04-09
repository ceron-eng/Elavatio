import { collection, doc, deleteDoc, query, where, getDoc } from "firebase/firestore";
import db from '../Connection/firebase';
export const deleteRegistro = async (user) => {
    try {
        let collectionName = "";
        let idField = "";
        if (user.id) {
            collectionName = "Registros-TD";
            idField = "id";
        } else if (user.idTGDTab) {
            collectionName = "Registros-TGD";
            idField = "idTGDTab";
        } else if (user.idCMMTab) {
            collectionName = "Registros-CCM";
            idField = "idCMMTab";
        } else {
            return false;
        }

        const userRef = doc(db, collectionName, user.idDoc);
        const docSnapshot = await getDoc(userRef);

        if (docSnapshot.exists()) {
            await deleteDoc(userRef);
            return true;
        } else {
            return false;
        }
    } catch (error) {
        console.error("Error al eliminar el registro:", error);
        throw new Error("Error al eliminar el registro" + error);
    }
}

