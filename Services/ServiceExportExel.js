import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import XLSX from 'xlsx';

export const exportToExcelCCM = async (doc) => {
  const data = [
    ['Relacion de Interruptores Instalados en TGD o TD'],
    ['NOMBRE DEL TABLERO', doc.nameTablero, 'ALIMENTADOR', doc.corrNom],
    ['ID', doc.idCMMTab, 'PROTECCION', doc.protectionFuen],
    ['NOMBRE DEL TABLERO', 'ID DEL TABLERO',
      'CMM', 'AREA CMM', 'TD', 'AREA TD',
      'PROTECCIÓN', 'INTERRUPTOR', 'TENSIÓN NOMINAL', 'CORRIENTE NOMINAL', 'ICC',
      'NO. POLOS', 'FUSIBLES'],
    [
      doc.nameTablero,
      doc.idCMMTab,
      doc.CMM,
      doc.areaCMM,
      doc.TD,
      doc.areTD,
      doc.Proteccion[0].prot1 + ' / ' + doc.Proteccion[0].prot2,
      doc.Interruptor[0].inte1 + ' / ' + doc.Interruptor[0].inte1,
      doc.TensionNormal[0].tens1 + ' / ' + doc.TensionNormal[0].tens2,
      doc.CorrienteNominal[0].corr1 + ' / ' + doc.CorrienteNominal[0].corr2,
      doc.ICC[0].ICC1 + ' / ' + doc.ICC[0].ICC2,
      doc.NoPolos[0].noPol1 + ' / ' + doc.NoPolos[0].noPol2,
      doc.Fusibles[0].fusi1 + ' / ' + doc.Fusibles[0].fusi2],

  ];

  const ws = XLSX.utils.aoa_to_sheet(data);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Registro TD-CCM');

  const base64 = XLSX.write(wb, { type: "base64" });
  const filename = FileSystem.documentDirectory + "Registro CMM-" + doc.date + "-" + doc.idCMMTab + ".xlsx";
  FileSystem.writeAsStringAsync(filename, base64, {
    encoding: FileSystem.EncodingType.Base64
  }).then(() => {
    Sharing.shareAsync(filename);
  });
};

export const exportToExcelTD = async (doc) => {
  console.log(doc);


  const cargasData = doc.cargas.map(carga => [
    carga.nombreCar,
    carga.val1In +'*'+ carga.val2In,
    carga.icc,
    carga.noFasesCal,
    carga.noNeutrosCal,
    carga.noTierrasCal,
    carga.canal,
    carga.longuitud
  ]);

  const data = [
    ['Relacion de Interruptores Instalados en TGD o TD'],
    ['NOMBRE DEL TABLERO', doc.nameTablero, 'ALIMENTADOR', doc.corrNom],
    ['ID', doc.idTDTab, 'PROTECCION', doc.protectionFuen],
    ['Nombre E ID', 'NOMBRE DEL TABLERO', 'ID DEL TABLERO',
      'PROTECCIÓN LADO FUENTE', 'MARCA Y MODELO', 'TENSIÓN NOMINAL (VOLTS)', 'CORRIENTE NOMINAL (AMPERES)',
      'ICC(KA)', 'NO. POLOS (K)', 'NO. CABLES FASES', 'CALIBRE CABLE FASES', 'MAT CABLES FASES',
      'NO. CABLES NEUTROS', 'CALIBRE CABLES NEUTROS', 'MAT CABLES NEUTROS',
      'NO. CABLES TIERRA', 'CALIBRE CABLES TIERRA', 'MAT CABLES TIERRA', 'Canalizacion y medida',
      'LONGUITUD(m)', 'PROTECCIÓN LADO TABLERO', 'MARCA Y MODELO TABLERO', 'TENCIÓN NOMINAL TABLERO (VOLTS)',
      'CORRIENTE NOMINAL (AMPERES)', 'ICC TABLERO (KA)', 'NO. POLOS TABLERO(K)'],
    [
      doc.name,
      doc.nameTablero,
      doc.idTGDTab,
      doc.protectionFuen,
      doc.marYMod,
      doc.tenNom,
      doc.corrNom,
      doc.ICC,
      doc.noPol,
      doc.Fases[0].noCabFas,
      doc.Fases[0].calCabFas,
      doc.Fases[0].matCabFas,
      doc.Neutros[0].noCabNeu,
      doc.Neutros[0].calCabNeu,
      doc.Neutros[0].matCabNeu,
      doc.Tierras[0].noCabTie,
      doc.Tierras[0].calCabTie,
      doc.Tierras[0].matCabTie,
      doc.canYmed,
      doc.long,
      doc.protectionTab,
      doc.marYModTab,
      doc.tenNomTab,
      doc.corrNomTab,
      doc.ICCTab,
      doc.noPolTab
    ],
    ['BARRAS NEUTROS', doc.barrasNeutros],
    ['PUENTE DE UNIÓN', doc.puenteUnion],
    ['BARRA DE TIERRA', doc.barraTierra],
    ['CARGAS', '', '', '', '', '', ''],
    ['Nombre de Carga','IN' ,'ICC', 'F', 'N', 'T', 'C', 'L'],
    ...cargasData
  ];

  const ws = XLSX.utils.aoa_to_sheet(data);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Registro TD-CCM');

  const base64 = XLSX.write(wb, { type: "base64" });
  const filename = FileSystem.documentDirectory + "Registro TD-" + doc.date + "-" + doc.idTDTab + ".xlsx";
  FileSystem.writeAsStringAsync(filename, base64, {
    encoding: FileSystem.EncodingType.Base64
  }).then(() => {
    Sharing.shareAsync(filename);
  });
};

export const exportToExcelTGD = async (doc) => {
  const cargasData = doc.cargas.map(carga => [
    carga.nombreCar,
    carga.val1In +'*'+ carga.val2In,
    carga.icc,
    carga.noFasesCal,
    carga.noNeutrosCal,
    carga.noTierrasCal,
    carga.canal,
    carga.longuitud
  ]);
  const data = [
    ['Relación de Interruptores Instalados en TGD'],
    ['NOMBRE DEL TABLERO', doc.nameTablero, 'ALIMENTADOR', doc.corrNom],
    ['ID', doc.idTGDTab, 'PROTECCIÓN', doc.protectionTab],
    ["Nombre", "ID", 'INTERRUPTOR', 'TENSIÓN (VOLTS)', 'ICC(KA)', 'NO. POLOS', 'FUSIBLES',
      'INOM', 'NO. POLOS2', 'MARCA Y TIPO DE TRANSFORMADOR', 'KVA', 'TENSIÓN DIVISOR (VOLTS)',
      'TENSIÓN COCIENTE (VOLTS)', 'CONEXIÓN', '% Z', 'NO. CABLES FASES', 'CALIBRE CABLES FASES',
      'MAT CABLES FASES', 'NO. CABLES NEUTROS', 'CALIBRE CABLES NEUTROS', 'MAT CABLES NEUTROS',
      'NO. CABLES TIERRA', 'CALIBRE CABLES TIERRA', 'MAT CABLES TIERRA', 'Canalizacion y medida','LONGITUD (m)', 'FECHA'],
    [
      doc.name,
      doc.idTGDTab,
      doc.interruptor,
      doc.tension,
      doc.ICC,
      doc.noPolos,
      doc.fusibles,
      doc.INOM,
      doc.noPolos2,
      doc.marcYTipTrans,
      doc.KVA,
      doc.tensDivisor,
      doc.tensCociente,
      doc.conexion,
      doc.porcZ,
      doc.Fases[0].noCabFas,
      doc.Fases[0].calCabFas,
      doc.Fases[0].matCabFas,
      doc.Neutros[0].noCabNeu,
      doc.Neutros[0].calCabNeu,
      doc.Neutros[0].matCabNeu,
      doc.Tierras[0].noCabTie,
      doc.Tierras[0].calCabTie,
      doc.Tierras[0].matCabTie,
      doc.canYmed,
      doc.long,
      doc.date
    ],
    ['BARRAS NEUTROS', doc.barrasNeutros],
    ['PUENTE DE UNIÓN', doc.puenteUnion],
    ['BARRA DE TIERRA', doc.barraTierra],
    ['CARGAS', '', '', '', '', '', ''],
    ['Nombre de Carga','IN' ,'ICC', 'F', 'N', 'T', 'C', 'L'],
    ...cargasData
  ];


  const ws = XLSX.utils.aoa_to_sheet(data);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Registro TGD');


  const base64 = XLSX.write(wb, { type: "base64" });
  const filename = FileSystem.documentDirectory + "Registro TGD-" + doc.date + "-" + doc.idTGDTab + ".xlsx";
  FileSystem.writeAsStringAsync(filename, base64, {
    encoding: FileSystem.EncodingType.Base64
  }).then(() => {
    Sharing.shareAsync(filename);
  });
};
