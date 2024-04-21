import { useState } from 'react';
import { saveTD, saveCCM, saveTGD } from '../Services/ServicesSave';
import { useNavigation } from '@react-navigation/native';

export const useTDModel = () => {
  const [name, setName] = useState('');
  const [nameTablero, setNameTablero] = useState('');
  const [idTDTab, setIdTDTab] = useState('');
  const [protectionFuen, setProtectionFuen] = useState(false);
  const [marYMod, setMarYMod] = useState('');
  const [tenNom, setTenNom] = useState('');
  const [corrNom, setCorrNom] = useState('');
  const [ICC, setICC] = useState('');
  const [noPol, setNoPol] = useState('');
  const [date, setDate] = useState(new Date());
  const [noCabFas, setNoCabFas] = useState('');
  const [calCabFas, setCalCabFas] = useState('');
  const [matCabFas, setMatCabFas] = useState('');
  const [noCabNeu, setNoCabNeu] = useState('');
  const [calCabNeu, setCalCabNeu] = useState('');
  const [matCabNeu, setMatCabNeu] = useState('');
  const [noCabTie, setNoCabTie] = useState('');
  const [calCabTie, setCalCabTie] = useState('');
  const [matCabTie, setMatCabTie] = useState('');
  const [long, setLong] = useState('');
  const [canYmed, setCanYmed] = useState('');
  const [protectionTab, setProtectionTab] = useState(false);
  const [marYModTab, setMarYModTab] = useState('');
  const [tenNomTab, setTenNomTab] = useState('');
  const [corrNomTab, setCorrNomTab] = useState('');
  const [ICCTab, setICCTab] = useState('');
  const [noPolTab, setNoPolTab] = useState('');
  const [loading, setLoading] = useState(false);

  const [nombreCarga, setNombreCarga] = useState('');
  const [formaRegistro, setFormaRegistro] = useState('');
  const [icc, setIcc] = useState('');
  const [noFasesCal, setNoFasesCal] = useState('');
  const [noNeutrosCal, setNoNeutrosCal] = useState('');
  const [noTierrasCal, setNoTierrasCal] = useState('');
  const [canal, setCanal] = useState('');
  const [longuitud, setLonguitud] = useState('');
  const [elementosFormaRegistro, setElementosFormaRegistro] = useState([]);
  const [barrasNeutros, setBarrasNeutros] = useState(false);
  const [cargas, setCargas] = useState([]);
  const [puenteUnion, setPuenteUnion] = useState(false);
  const [barraTierra, setBarraTierra] = useState(false);
  const [val1, setVal1] = useState('');
  const [val2, setVal2] = useState('');

  const navigation = useNavigation();

  const handleSubmit = async (userName) =>  {
    setLoading(true);
    try {

      if (
        name.trim() === '' ||
        nameTablero.trim() === '' ||
        idTDTab.trim() === '' ||
        marYMod.trim() === '' ||
        tenNom.trim() === '' ||
        corrNom.trim() === '' ||
        ICC.trim() === '' ||
        noPol.trim() === '' ||
        noCabFas.trim() === '' ||
        calCabFas.trim() === '' ||
        matCabFas.trim() === '' ||
        noCabNeu.trim() === '' ||
        calCabNeu.trim() === '' ||
        matCabNeu.trim() === '' ||
        noCabTie.trim() === '' ||
        calCabTie.trim() === '' ||
        matCabTie.trim() === '' ||
        long.trim() === '' ||
        canYmed.trim('') === '' ||
        marYModTab.trim() === '' ||
        tenNomTab.trim() === '' ||
        corrNomTab.trim() === '' ||
        ICCTab.trim() === '' ||
        noPolTab.trim() === '' ||
        userName.trim() === ''
      ) {
        alert('Por favor completa todos los campos.');
        setLoading(false);
        return;
      }

      const success = await saveTD({
        name,
        nameTablero,
        idTDTab,
        protectionFuen,
        marYMod,
        tenNom,
        corrNom,
        ICC,
        noPol,
        /*Informacion alimentador */
        //fases
        Fases: [{
          noCabFas,
          calCabFas,
          matCabFas,
        }],
        Neutros: [{
          noCabNeu,
          calCabNeu,
          matCabNeu,
        }],
        Tierras: [{
          noCabTie,
          calCabTie,
          matCabTie,
        }],
        long,
        canYmed,
        protectionTab,
        marYModTab,
        tenNomTab,
        corrNomTab,
        ICCTab,
        noPolTab,
        cargas,
        barrasNeutros,
        puenteUnion,
        barraTierra,
        date: date ? date.toISOString().substring(0, 10).replace('T', '-') : '',
        creatorUser : userName,
      });

      if (success) {
        resetFormTD(); // Resetear el formulario después de enviar los datos
        setLoading(false);
        alert('Registro-TD guardado exitosamente!');
        navigation.navigate('Home'); 
      } else {
        setLoading(false);
        alert('Ocurrió un error al guardar el Registro-TD. Por favor, inténtalo de nuevo.');
      }
    } catch (error) {
      setLoading(false);
      alert('Ocurrió un error al guardar el Registro-TD. Por favor, inténtalo de nuevo.');
    }
  };

  const resetFormTD = () => {
    setCargas([]);
    setName('');
    setNameTablero('');
    setIdTDTab('');
    setProtectionFuen(false);
    setMarYMod('');
    setTenNom('');
    setCorrNom('');
    setICC('');
    setNoPol('');
    setNoCabFas('');
    setCalCabFas('');
    setMatCabFas('');
    setNoCabNeu('');
    setCalCabNeu('');
    setMatCabNeu('');
    setNoCabTie('');
    setCalCabTie('');
    setMatCabTie('');
    setLong('');
    setProtectionTab(false);
    setMarYModTab('');
    setTenNomTab('');
    setCorrNomTab('');
    setICCTab('');
    setCanYmed('');
    setNoPolTab('');
    setDate(new Date());
    setLoading(false);
    setNombreCarga('');
    setElementosFormaRegistro([]);
    setIcc('');
    setNoFasesCal('');
    setNoNeutrosCal('');
    setNoTierrasCal('');
    setCanal('');
    setLonguitud('');
    setVal1('');
    setVal2('');
    setBarrasNeutros(false);
    setPuenteUnion(false);
    setBarraTierra(false);
  };

  return {
    name,
    setName,
    nameTablero,
    setNameTablero,
    idTDTab,
    setIdTDTab,
    protectionFuen,
    setProtectionFuen,
    marYMod,
    setMarYMod,
    tenNom,
    setTenNom,
    corrNom,
    setCorrNom,
    ICC,
    setICC,
    noPol,
    setNoPol,
    date,
    noCabFas,
    setNoCabFas,
    calCabFas,
    setCalCabFas,
    matCabFas,
    setMatCabFas,
    noCabNeu,
    setNoCabNeu,
    calCabNeu,
    setCalCabNeu,
    matCabNeu,
    setMatCabNeu,
    noCabTie,
    setNoCabTie,
    calCabTie,
    setCalCabTie,
    matCabTie,
    setMatCabTie,
    long,
    setLong,
    canYmed,
    setCanYmed,
    protectionTab,
    setProtectionTab,
    marYModTab,
    setMarYModTab,
    tenNomTab,
    setTenNomTab,
    corrNomTab,
    setCorrNomTab,
    ICCTab,
    setICCTab,
    noPolTab,
    setNoPolTab,
    handleSubmit,
    loading,
    setLoading,
    nombreCarga,
    setNombreCarga,
    elementosFormaRegistro,
    setElementosFormaRegistro,
    formaRegistro,
    setFormaRegistro,
    icc,
    setIcc,
    noFasesCal,
    setNoFasesCal,
    noNeutrosCal,
    setNoNeutrosCal,
    noTierrasCal,
    setNoTierrasCal,
    canal,
    setCanal,
    longuitud,
    setLonguitud,
    barrasNeutros,
    setBarrasNeutros,
    puenteUnion,
    setPuenteUnion,
    barraTierra,
    setBarraTierra,
    val1,
    setVal1,
    val2,
    setVal2,
    cargas,
    setCargas,
  };
};

export const useCCMModel = () => {
  const [nameTablero, setNameTablero] = useState('');
  const [idCMMTab, setIdCMMTab] = useState('');
  const [CMM, setCMM] = useState('');
  const [areaCMM, setAreCMM] = useState('');
  const [TD, setTD] = useState('');
  const [areTD, setAreTD] = useState('');
  //fecha para registro
  const [date, setDate] = useState(new Date());
  /*Informacion alimentador */
  //protección
  const [prot1, setProt1] = useState('');
  const [prot2, setProt2] = useState('');
  //interruptor
  const [inte1, setinte1] = useState('');
  const [inte2, setinte2] = useState('');
  //Tensión normal
  const [tens1, setTens1] = useState('');
  const [tens2, setTens2] = useState('');
  //Corriente nominal
  const [corr1, setCorr1] = useState('');
  const [corr2, setCorr2] = useState('');
  //ICC
  const [ICC1, setICC1] = useState('');
  const [ICC2, setICC2] = useState('');
  //No. polos
  const [noPol1, setNoPol1] = useState('');
  const [noPol2, setNoPol2] = useState('');
  //Fusible
  const [fusi1, setFusi1] = useState('');
  const [fusi2, setFusi2] = useState('');
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();
  const handleSubmit = async (userName) =>  {
    try {

      if (!nameTablero || !idCMMTab || !CMM || !areaCMM || !TD ||
        !prot1 || !prot2 || !inte1 || !inte2 || !tens1 || !tens2 ||
        !corr1 || !corr2 || !ICC1 || !ICC2 || !noPol1 || !noPol2 ||
        !fusi1 || !fusi2 || !date) {
        alert('Por favor, completa todos los campos.');
        setLoading(false);
        return;
      }
      setLoading(true);
      const success = await saveCCM({
        nameTablero,
        idCMMTab,
        CMM,
        areaCMM,
        TD,
        /*Tabla de datos generales */
        Proteccion: [
          {
            prot1,
            prot2,
          }],
        Interruptor: [
          {
            inte1,
            inte2,
          }],
        TensionNormal: [
          {
            tens1,
            tens2,
          }],
        CorrienteNominal: [
          {
            corr1,
            corr2,
          }],
        ICC: [
          {
            ICC1,
            ICC2,
          }],
        NoPolos: [
          {
            noPol1,
            noPol2,
          }],
        Fusibles: [
          {
            fusi1,
            fusi2,
          }],
        date: date ? date.toISOString().substring(0, 10).replace('T', '-') : '',
        creatorUser : userName,
      });

      if (success) {
        resetFormCCM();
        setLoading(false);
        alert('Registro-CMM guardado exitosamente!');
        navigation.navigate('Home'); 
      } else {
        setLoading(false);
        alert('Ocurrió un error al guardar el Registro-CMM. Por favor, inténtalo de nuevo.');
      }
    } catch (error) {
      setLoading(false);
      alert('Ocurrió un error al guardar el Registro-CMM. Por favor, inténtalo de nuevo.');
    }
  };
  const resetFormCCM = () => {
    setNameTablero('');
    setIdCMMTab('');
    setCMM('');
    setAreCMM('');
    setTD('');
    setAreTD('');
    setProt1('');
    setProt2('');
    setinte1('');
    setinte2('');
    setTens1('');
    setTens2('');
    setCorr1('');
    setCorr2('');
    setICC1('');
    setICC2('');
    setNoPol1('');
    setNoPol2('');
    setFusi1('');
    setFusi2('');
    setLoading(true);
  };
  return {
    nameTablero,
    setNameTablero,
    idCMMTab,
    setIdCMMTab,
    CMM,
    setCMM,
    areaCMM,
    setAreCMM,
    TD,
    setTD,
    areTD,
    setAreTD,
    date,
    setDate,
    prot1,
    setProt1,
    prot2,
    setProt2,
    inte1,
    setinte1,
    inte2,
    setinte2,
    tens1,
    setTens1,
    tens2,
    setTens2,
    corr1,
    setCorr1,
    corr2,
    setCorr2,
    ICC1,
    setICC1,
    ICC2,
    setICC2,
    noPol1,
    setNoPol1,
    noPol2,
    setNoPol2,
    fusi1,
    setFusi1,
    fusi2,
    setFusi2,
    loading,
    setLoading,
    handleSubmit,
  };
};

export const useTGDModel = () => {
  const [nameTablero, setNameTablero] = useState('');
  const [name, setName] = useState('');
  const [idTGDTab, setIdTGDTab] = useState('');
  const [interruptor, setInterruptor] = useState('');
  const [tension, setTension] = useState('');
  const [corrNom, setCorrNom] = useState('');
  const [ICC, setICC] = useState('');
  const [noPolos, setNoPolos] = useState('');
  const [fusibles, setfusibles] = useState(false);
  const [INOM, setINOM] = useState('');
  const [noPolos2, setNoPolos2] = useState('');
  const [marcYTipTrans, setMarcYTipTrans] = useState('');
  const [KVA, setKVA] = useState('');
  const [tensDivisor, setTensDivisor] = useState('');
  const [tensCociente, setTensCociente] = useState('');
  const [conexion, setConexion] = useState('');
  const [porcZ, setPorcZ] = useState('');
  const [noCabFas, setNoCabFas] = useState('');
  const [calCabFas, setCalCabFas] = useState('');
  const [matCabFas, setMatCabFas] = useState('');
  const [noCabNeu, setNoCabNeu] = useState('');
  const [calCabNeu, setCalCabNeu] = useState('');
  const [matCabNeu, setMatCabNeu] = useState('');
  const [noCabTie, setNoCabTie] = useState('');
  const [calCabTie, setCalCabTie] = useState('');
  const [matCabTie, setMatCabTie] = useState('');
  const [long, setLong] = useState('');
  const [date, setDate] = useState(new Date());
  const [protectionTab, setProtectionTab] = useState(false);
  const [loading, setLoading] = useState(false);
  const [canYmed, setCanYmed] = useState('');

  const [nombreCarga, setNombreCarga] = useState('');
  const [formaRegistro, setFormaRegistro] = useState('');
  const [icc, setIcc] = useState('');
  const [noFasesCal, setNoFasesCal] = useState('');
  const [noNeutrosCal, setNoNeutrosCal] = useState('');
  const [noTierrasCal, setNoTierrasCal] = useState('');
  const [canal, setCanal] = useState('');
  const [longuitud, setLonguitud] = useState('');
  const [elementosFormaRegistro, setElementosFormaRegistro] = useState([]);
  const [barrasNeutros, setBarrasNeutros] = useState(false);
  const [cargas, setCargas] = useState([]);
  const [puenteUnion, setPuenteUnion] = useState(false);
  const [barraTierra, setBarraTierra] = useState(false);
  const [val1, setVal1] = useState('');
  const [val2, setVal2] = useState('');

  const navigation = useNavigation();

  const handleSubmit = async (userName) =>  {
    try {
      setLoading(true);
      if (!nameTablero || !name || !idTGDTab || !interruptor || !tension || !corrNom ||
        !ICC || !noPolos || !INOM || !noPolos2 || !marcYTipTrans || !KVA || !tensDivisor ||
        !tensCociente || !conexion || !porcZ || !noCabFas || !calCabFas || !matCabFas ||
        !noCabNeu || !calCabNeu || !matCabNeu || !noCabTie || !calCabTie || !matCabTie ||
        !long || !canYmed) {
        alert('Por favor, completa todos los campos.');
        setLoading(false);
        return;
      }
      const success = await saveTGD({
        nameTablero,
        name,
        idTGDTab,
        interruptor,
        tension,
        corrNom,
        ICC,
        noPolos,
        fusibles,
        INOM,
        noPolos2,
        marcYTipTrans,
        KVA,
        tensDivisor,
        tensCociente,
        conexion,
        porcZ,
        Fases: [{
          noCabFas,
          calCabFas,
          matCabFas,
        }],
        Neutros: [{
          noCabNeu,
          calCabNeu,
          matCabNeu,
        }],
        Tierras: [{
          noCabTie,
          calCabTie,
          matCabTie,
        }],
        long,
        canYmed,
        protectionTab,
        cargas,
        barrasNeutros,
        puenteUnion,
        barraTierra,
        date: date ? date.toISOString().substring(0, 10).replace('T', '-') : '',
        creatorUser : userName,
      });

      if (success) {
        resetFormTGD();
        alert('Registro-TGD guardado exitosamente!');
        navigation.navigate('Home'); 
      } else {
        setLoading(false);
        alert('Ocurrió un error al guardar el Registro-TGD. Por favor, inténtalo de nuevo.');
      }

    } catch (error) {
      setLoading(false);
      alert('Ocurrió un error al guardar el Registro-TGD. Por favor, inténtalo de nuevo.');
    }
  }

  const resetFormTGD = () => {
    setCargas([]);
    setNameTablero('');
    setName('');
    setIdTGDTab('');
    setInterruptor('');
    setTension('');
    setCorrNom('');
    setICC('');
    setNoPolos('');
    setfusibles(false);
    setINOM('');
    setNoPolos2('');
    setMarcYTipTrans('');
    setKVA('');
    setTensDivisor('');
    setTensCociente('');
    setConexion('');
    setPorcZ('');
    setNoCabFas('');
    setCalCabFas('');
    setMatCabFas('');
    setNoCabNeu('');
    setCalCabNeu('');
    setMatCabNeu('');
    setNoCabTie('');
    setCalCabTie('');
    setMatCabTie('');
    setCanYmed('');
    setLong('');
    setProtectionTab(false);
    setDate(new Date());
    setLoading(false);
    setNombreCarga('');
    setElementosFormaRegistro([]);
    setIcc('');
    setNoFasesCal('');
    setNoNeutrosCal('');
    setNoTierrasCal('');
    setCanal('');
    setLonguitud('');
    setVal1('');
    setVal2('');
    setBarrasNeutros(false);
    setPuenteUnion(false);
    setBarraTierra(false);
  };

  return {
    nameTablero,
    setNameTablero,
    name,
    setName,
    idTGDTab,
    setIdTGDTab,
    interruptor,
    setInterruptor,
    tension,
    setTension,
    corrNom,
    setCorrNom,
    ICC,
    setICC,
    noPolos,
    setNoPolos,
    fusibles,
    setfusibles,
    INOM,
    setINOM,
    noPolos2,
    setNoPolos2,
    marcYTipTrans,
    setMarcYTipTrans,
    KVA,
    setKVA,
    tensDivisor,
    setTensDivisor,
    tensCociente,
    setTensCociente,
    conexion,
    setConexion,
    porcZ,
    setPorcZ,
    noCabFas,
    setNoCabFas,
    calCabFas,
    setCalCabFas,
    matCabFas,
    setMatCabFas,
    noCabNeu,
    setNoCabNeu,
    calCabNeu,
    setCalCabNeu,
    matCabNeu,
    setMatCabNeu,
    noCabTie,
    setNoCabTie,
    canYmed,
    setCanYmed,
    calCabTie,
    setCalCabTie,
    matCabTie,
    setMatCabTie,
    long,
    setLong,
    protectionTab,
    setProtectionTab,
    loading,
    setLoading,
    date,
    setDate,
    handleSubmit,
    nombreCarga,
    setNombreCarga,
    elementosFormaRegistro,
    setElementosFormaRegistro,
    formaRegistro,
    setFormaRegistro,
    icc,
    setIcc,
    noFasesCal,
    setNoFasesCal,
    noNeutrosCal,
    setNoNeutrosCal,
    noTierrasCal,
    setNoTierrasCal,
    canal,
    setCanal,
    longuitud,
    setLonguitud,
    barrasNeutros,
    setBarrasNeutros,
    puenteUnion,
    setPuenteUnion,
    barraTierra,
    setBarraTierra,
    val1,
    setVal1,
    val2,
    setVal2,
    cargas,
    setCargas,
  };

};
