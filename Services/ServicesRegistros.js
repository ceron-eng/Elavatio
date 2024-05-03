import db from '../Connection/firebase';
import {
  updateDoc,
  doc, getDoc
} from "firebase/firestore";

export const updateTD = async (TDData) => {
  try {
    if (
      TDData.id.trim() === '' ||
      TDData.name.trim() === '' ||
      TDData.nameTablero.trim() === '' ||
      TDData.idTDTab.trim() === '' ||
      TDData.marYMod.trim() === '' ||
      TDData.tenNom.trim() === '' ||
      TDData.corrNom.trim() === '' ||
      TDData.ICC.trim() === '' ||
      TDData.noPol.trim() === '' ||
      TDData.noCabFas.trim() === '' ||
      TDData.calCabFas.trim() === '' ||
      TDData.matCabFas.trim() === '' ||
      TDData.noCabNeu.trim() === '' ||
      TDData.calCabNeu.trim() === '' ||
      TDData.matCabNeu.trim() === '' ||
      TDData.noCabTie.trim() === '' ||
      TDData.calCabTie.trim() === '' ||
      TDData.matCabTie.trim() === '' ||
      TDData.long.trim() === '' ||
      TDData.canYmed.trim('') === '' ||
      TDData.marYModTab.trim() === '' ||
      TDData.tenNomTab.trim() === '' ||
      TDData.corrNomTab.trim() === '' ||
      TDData.ICCTab.trim() === '' ||
      TDData.noPolTab.trim() === ''

    ) {
      alert('Por favor completa todos los campos.');
      setLoading(false);
      return;
    }

    const TDDoc = doc(db, "Registros-TD", TDData.id);
    const userSnapshot = await getDoc(TDDoc);

    if (!userSnapshot.exists()) {
      return { success: false, message: "El registro ya no existe" };
    }

    await updateDoc(TDDoc, {
      name: TDData.name,
      nameTablero: TDData.nameTablero,
      idTDTab: TDData.idTDTab,
      protectionFuen: TDData.protectionFuen,
      marYMod: TDData.marYMod,
      tenNom: TDData.tenNom,
      corrNom: TDData.corrNom,
      ICC: TDData.ICC,
      noPol: TDData.noPol,
      /*Informacion alimentador */
      //fases
      Fases: [{
        noCabFas: TDData.noCabFas,
        calCabFas: TDData.calCabFas,
        matCabFas: TDData.matCabFas,
      }],
      Neutros: [{
        noCabNeu: TDData.noCabNeu,
        calCabNeu: TDData.calCabNeu,
        matCabNeu: TDData.matCabNeu,
      }],
      Tierras: [{
        noCabTie: TDData.noCabTie,
        calCabTie: TDData.calCabTie,
        matCabTie: TDData.matCabTie,
      }],
      long: TDData.long,
      canYmed: TDData.canYmed,
      protectionTab: TDData.protectionTab,
      marYModTab: TDData.marYModTab,
      tenNomTab: TDData.tenNomTab,
      corrNomTab: TDData.corrNomTab,
      ICCTab: TDData.ICCTab,
      noPolTab: TDData.noPolTab,
      cargas: TDData.cargas,
      barrasNeutros: TDData.barrasNeutros,
      puenteUnion: TDData.puenteUnion,
      barraTierra: TDData.barraTierra,
      creatorUser : TDData.creatorUser,
      UpdateDate: TDData.date ? TDData.date.toISOString().substring(0, 10).replace('T', '-') : '',
      userWhoEdited: TDData.userWhoEdited,
    });

    return { success: true };
  } catch (error) {
    console.log(error);
    throw new Error("Error al actualizar el registro" + error);
  }
}

export const updateTGD = async (TGDData) => {
  try {

    if (
      TGDData.id.trim() === '' ||
      TGDData.name.trim() === '' ||
      TGDData.nameTablero.trim() === '' ||
      TGDData.idTGDTab.trim() === '' ||
      TGDData.interruptor.trim() === '' ||
      TGDData.tension.trim() === '' ||
      TGDData.corrNom.trim() === '' ||
      TGDData.ICC.trim() === '' ||
      TGDData.noPolos.trim() === '' ||
      TGDData.INOM.trim() === '' ||
      TGDData.noPolos2.trim() === '' ||
      TGDData.marcYTipTrans.trim() === '' ||
      TGDData.KVA.trim() === '' ||
      TGDData.tensDivisor.trim() === '' ||
      TGDData.tensCociente.trim() === '' ||
      TGDData.conexion.trim() === '' ||
      TGDData.porcZ.trim() === '' ||
      TGDData.noCabFas.trim() === '' ||
      TGDData.calCabFas.trim() === '' ||
      TGDData.matCabFas.trim() === '' ||
      TGDData.noCabNeu.trim() === '' ||
      TGDData.calCabNeu.trim() === '' ||
      TGDData.matCabNeu.trim() === '' ||
      TGDData.noCabTie.trim() === '' ||
      TGDData.calCabTie.trim() === '' ||
      TGDData.matCabTie.trim() === '' ||
      TGDData.long.trim() === '' ||
      TGDData.canYmed.trim() === ''
    ) {
      alert('Por favor, completa todos los campos. update ');
      return;
    }

    const TGDDoc = doc(db, "Registros-TGD", TGDData.id);
    const userSnapshot = await getDoc(TGDDoc);

    if (!userSnapshot.exists()) {
      return { success: false, message: "El registro ya no existe" };
    }

    await updateDoc(TGDDoc, {
      nameTablero: TGDData.nameTablero,
      name: TGDData.name,
      idTGDTab: TGDData.idTGDTab,
      interruptor: TGDData.interruptor,
      tension: TGDData.tension,
      corrNom: TGDData.corrNom,
      ICC: TGDData.ICC,
      noPolos: TGDData.noPolos,
      fusibles: TGDData.fusibles,
      INOM: TGDData.INOM,
      noPolos2: TGDData.noPolos2,
      marcYTipTrans: TGDData.marcYTipTrans,
      KVA: TGDData.KVA,
      tensDivisor: TGDData.tensDivisor,
      tensCociente: TGDData.tensCociente,
      conexion: TGDData.conexion,
      porcZ: TGDData.porcZ,
      Fases: [{
        noCabFas: TGDData.noCabFas,
        calCabFas: TGDData.calCabFas,
        matCabFas: TGDData.matCabFas,
      }],
      Neutros: [{
        noCabNeu: TGDData.noCabNeu,
        calCabNeu: TGDData.calCabNeu,
        matCabNeu: TGDData.matCabNeu,
      }],
      Tierras: [{
        noCabTie: TGDData.noCabTie,
        calCabTie: TGDData.calCabTie,
        matCabTie: TGDData.matCabTie,
      }],
      long: TGDData.long,
      canYmed: TGDData.canYmed,
      protectionTab: TGDData.protectionTab,
      cargas: TGDData.cargas,
      barrasNeutros: TGDData.barrasNeutros,
      puenteUnion: TGDData.puenteUnion,
      barraTierra: TGDData.barraTierra,
      creatorUser : TGDData.creatorUser,
      UpdateDate: TGDData.date ? TGDData.date.toISOString().substring(0, 10).replace('T', '-') : '',
      userWhoEdited: TGDData.userWhoEdited,
    });

    return { success: true };
  } catch (error) {
    console.log(error);
    throw new Error("Error al actualizar el registro" + error);
  }
}

export const updateCCM = async (CCMData) =>{
  try {
    if (!CCMData.nameTablero || !CCMData.idCMMTab || !CCMData.CMM || !CCMData.areaCMM || !CCMData.TD ||
      !CCMData.prot1 || !CCMData.prot2 || !CCMData.inte1 || !CCMData.inte2 || !CCMData.tens1 || !CCMData.tens2 ||
      !CCMData.corr1 || !CCMData.corr2 || !CCMData.ICC1 || !CCMData.ICC2 || !CCMData.noPol1 || !CCMData.noPol2 ||
      !CCMData.fusi1 || !CCMData.fusi2 || !CCMData.id) {
      alert('Por favor, completa todos los campos.');
      return;
    }
    const CCMDoc = doc(db, "Registros-CMM", CCMData.id);
    const userSnapshot = await getDoc(CCMDoc);

    if (!userSnapshot.exists()) {
      return { success: false, message: "El registro ya no existe" };
    }

    await updateDoc(CCMDoc,{
      nameTablero: CCMData.nameTablero,
      idCMMTab:CCMData.idCMMTab,
      CMM:CCMData.CMM,
      areaCMM:CCMData.areaCMM,
      TD:CCMData.TD,
      areTD:CCMData.areTD,
      /*Tabla de datos generales */
      Proteccion: [
        {
          prot1:CCMData.prot1,
          prot2:CCMData.prot2,
        }],
      Interruptor: [
        {
          inte1:CCMData.inte1,
          inte2:CCMData.inte2,
        }],
      TensionNormal: [
        {
          tens1:CCMData.tens1,
          tens2:CCMData.tens2,
        }],
      CorrienteNominal: [
        {
          corr1:CCMData.corr1,
          corr2:CCMData.corr2,
        }],
      ICC: [
        {
          ICC1:CCMData.ICC1,
          ICC2:CCMData.ICC2,
        }],
      NoPolos: [
        {
          noPol1:CCMData.noPol1,
          noPol2:CCMData.noPol2,
        }],
      Fusibles: [
        {
          fusi1:CCMData.fusi1,
          fusi2:CCMData.fusi2,
        }],
      Newdate: CCMData.date ? CCMData.date.toISOString().substring(0, 10).replace('T', '-') : '',
      creatorUser : CCMData.creatorUser,
      userWhoEdited: CCMData.userWhoEdited,
    });

    return { success: true };
  } catch (error) {
    console.log(error);
    throw new Error("Error al actualizar el registro" + error);
  }
}