
import { collection, query, getDocs } from "firebase/firestore";
import db from '../Connection/firebase';

export const getListCCM = async () => {
    try {
        const usersRef = collection(db, "Registros-CMM");
        const q = query(usersRef);
        const querySnapshot = await getDocs(q);
        const usersList = [];
        querySnapshot.forEach((doc) => {
            usersList.push({
                idDoc: doc.id,
                nameTablero: doc.data().nameTablero,
                idCMMTab: doc.data().idCMMTab,
                CMM: doc.data().CMM,
                areaCMM: doc.data().areaCMM,
                TD: doc.data().TD,
                areTD: doc.data().areTD,
                /*Tabla de datos generales */
                Proteccion: [
                    {
                        prot1: doc.data().Proteccion[0].prot1,
                        prot2: doc.data().Proteccion[0].prot2,
                    }],
                Interruptor: [
                    {
                        inte1: doc.data().Interruptor[0].inte1,
                        inte2: doc.data().Interruptor[0].inte1,
                    }],
                TensionNormal: [
                    {
                        tens1: doc.data().TensionNormal[0].tens1,
                        tens2: doc.data().TensionNormal[0].tens2,
                    }],
                CorrienteNominal: [
                    {
                        corr1: doc.data().CorrienteNominal[0].corr1,
                        corr2: doc.data().CorrienteNominal[0].corr2,
                    }],
                ICC: [
                    {
                        ICC1: doc.data().ICC[0].ICC1,
                        ICC2: doc.data().ICC[0].ICC2,
                    }],
                NoPolos: [
                    {
                        noPol1: doc.data().NoPolos[0].noPol1,
                        noPol2: doc.data().NoPolos[0].noPol2,
                    }],
                Fusibles: [
                    {
                        fusi1: doc.data().Fusibles[0].fusi1,
                        fusi2: doc.data().Fusibles[0].fusi2,
                    }],
                date: doc.data().date,
                creatorUser: doc.data().creatorUser
            });
            // Verificar si existe el campo userWhoEdited
            if (doc.data().userWhoEdited) {
                userWhoEdited = doc.data().userWhoEdited;
            }
        });
        return usersList;
    } catch (error) {
        console.error('Error al obtener los Registro-CMM:', error);
        alert('Ocurrió un error al obtener los Registro-CMM. Por favor, inténtalo de nuevo.');
    }
};

export const getListTD = async () => {
    try {
        const usersRef = collection(db, "Registros-TD");
        const q = query(usersRef);
        const querySnapshot = await getDocs(q);
        const usersList = [];
        querySnapshot.forEach((doc) => {
            usersList.push({
                idDoc: doc.id,
                name: doc.data().name,
                nameTablero: doc.data().nameTablero,
                idTDTab: doc.data().idTDTab,
                protectionFuen: doc.data().protectionFuen ? "Si" : "No",
                marYMod: doc.data().marYMod,
                tenNom: doc.data().tenNom,
                corrNom: doc.data().corrNom,
                ICC: doc.data().ICC,
                noPol: doc.data().noPol,
                date: doc.data().date,
                /*Informacion alimentador */
                //fases

                Fases: [
                    {
                        noCabFas: doc.data().Fases[0].noCabFas,
                        calCabFas: doc.data().Fases[0].calCabFas,
                        matCabFas: doc.data().Fases[0].matCabFas,
                    }],
                Neutros: [
                    {
                        noCabNeu: doc.data().Neutros[0].noCabNeu,
                        calCabNeu: doc.data().Neutros[0].calCabNeu,
                        matCabNeu: doc.data().Neutros[0].matCabNeu,
                    }],
                Tierras: [
                    {
                        noCabTie: doc.data().Tierras[0].noCabTie,
                        calCabTie: doc.data().Tierras[0].calCabTie,
                        matCabTie: doc.data().Tierras[0].matCabTie,
                    }],
                canYmed: doc.data().canYmed,
                long: doc.data().long,
                protectionTab: doc.data().protectionTab ? "Si" : "No",
                marYModTab: doc.data().marYModTab,
                tenNomTab: doc.data().tenNomTab,
                corrNomTab: doc.data().corrNomTab,
                ICCTab: doc.data().ICCTab,
                noPolTab: doc.data().noPolTab,
                cargas: doc.data().cargas,
                barrasNeutros: doc.data().barrasNeutros ? "Si" : "No",
                puenteUnion: doc.data().puenteUnion ? "Si" : "No",
                barraTierra: doc.data().barraTierra ? "Si" : "No",
                creatorUser: doc.data().creatorUser
            });
            if (doc.data().userWhoEdited) {
                userWhoEdited = doc.data().userWhoEdited;
            }
        });
        return (usersList);
    } catch (error) {
        console.error('Error al obtener los registros-TD:', error);
        alert('Ocurrió un error al obtener los registros-TD. Por favor, inténtalo de nuevo.');
    }
}

export const getListTGD = async () => {
    try {
        const tgdRef = collection(db, "Registros-TGD");
        const querySnapshot = await getDocs(tgdRef);
        const tgdList = [];
        querySnapshot.forEach((doc) => {
            tgdList.push({
                idDoc: doc.id,
                nameTablero: doc.data().nameTablero,
                name: doc.data().name,
                idTGDTab: doc.data().idTGDTab,
                interruptor: doc.data().interruptor,
                tension: doc.data().tension,
                corrNom: doc.data().corrNom,
                ICC: doc.data().ICC,
                noPolos: doc.data().noPolos,
                fusibles: doc.data().fusibles ? "si" : "no",
                INOM: doc.data().INOM,
                noPolos2: doc.data().noPolos2,
                marcYTipTrans: doc.data().marcYTipTrans,
                KVA: doc.data().KVA,
                tensDivisor: doc.data().tensDivisor,
                tensCociente: doc.data().tensCociente,
                conexion: doc.data().conexion,
                porcZ: doc.data().porcZ,
                Fases: [
                    {
                        noCabFas: doc.data().Fases[0].noCabFas,
                        calCabFas: doc.data().Fases[0].calCabFas,
                        matCabFas: doc.data().Fases[0].matCabFas,
                    }
                ],
                Neutros: [
                    {
                        noCabNeu: doc.data().Neutros[0].noCabNeu,
                        calCabNeu: doc.data().Neutros[0].calCabNeu,
                        matCabNeu: doc.data().Neutros[0].matCabNeu,
                    }
                ],
                Tierras: [
                    {
                        noCabTie: doc.data().Tierras[0].noCabTie,
                        calCabTie: doc.data().Tierras[0].calCabTie,
                        matCabTie: doc.data().Tierras[0].matCabTie,
                    }
                ],
                canYmed: doc.data().canYmed,
                long: doc.data().long,
                protectionTab: doc.data().protectionTab ? "Si" : "No",
                cargas: doc.data().cargas,
                barrasNeutros: doc.data().barrasNeutros ? "Si" : "No",
                puenteUnion: doc.data().puenteUnion ? "Si" : "No",
                barraTierra: doc.data().barraTierra ? "Si" : "No",
                date: doc.data().date,
                creatorUser: doc.data().creatorUser
            });
            if (doc.data().userWhoEdited) {
                userWhoEdited = doc.data().userWhoEdited;
            }
        });
        return tgdList;
    } catch (error) {
        alert('Ocurrió un error al obtener los registros-TGD. Por favor, inténtalo de nuevo.');
    }
}
