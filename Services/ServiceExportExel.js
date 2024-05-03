import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import XLSX from 'xlsx-js-style';

export const exportToExcelCCM = async (doc) => {
  try {
    // Crear la estructura básica de datos con objetos de celda completos para evitar undefined
    const data = [
      [{v: 'RELACIÓN DE INTERRUPTORES INSTALADOS EN CCM', t: 's'}],
      [{v: 'NOMBRE DEL TABLERO', t: 's'}, null, {v: doc.nameTablero, t: 's'}],
      [{v: 'ID', t: 's'}, null, {v: doc.idCMMTab, t: 's'}],
      [{v: 'INFORMACIÓN GENERAL', t: 's'}, null, null, null, {v: 'TABLA DE DATOS GENERALES', t: 's'}],
      [{v: 'CMM', t: 's'}, {v: 'AREA CMM', t: 's'}, {v: 'TD', t: 's'}, {v: 'AREA TD', t: 's'}, {v: 'PROTECCIÓN', t: 's'}, {v: 'INTERRUPTOR', t: 's'}, {v: 'TENSIÓN NO.', t: 's'}, {v: 'CORRIENTE NO.', t: 's'}, {v: 'ICC', t: 's'}, {v: 'NO. POLOS', t: 's'}, {v: 'FUSIBLES', t: 's'}, {v: 'Usuario Creador', t: 's'}],
      [
        {v: doc.CMM, t: 's'},
        {v: doc.areaCMM, t: 's'},
        {v: doc.TD, t: 's'},
        {v: doc.areTD, t: 's'},
        {v: doc.Proteccion[0].prot1 + ' / ' + doc.Proteccion[0].prot2, t: 's'},
        {v: doc.Interruptor[0].inte1 + ' / ' + doc.Interruptor[0].inte1, t: 's'},
        {v: doc.TensionNormal[0].tens1 + ' / ' + doc.TensionNormal[0].tens2, t: 's'},
        {v: doc.CorrienteNominal[0].corr1 + ' / ' + doc.CorrienteNominal[0].corr2, t: 's'},
        {v: doc.ICC[0].ICC1 + ' / ' + doc.ICC[0].ICC2, t: 's'},
        {v: doc.NoPolos[0].noPol1 + ' / ' + doc.NoPolos[0].noPol2, t: 's'},
        {v: doc.Fusibles[0].fusi1 + ' / ' + doc.Fusibles[0].fusi2, t: 's'},
        {v: doc.creatorUser, t: 's'}
      ]
    ];

    const ws = XLSX.utils.aoa_to_sheet(data);

    // Define el estilo común para todas las celdas
    const commonStyle = {
      alignment: {
        horizontal: "center",
        vertical: "center",
        wrapText: true
      },
      border: {
        top: { style: 'thin', color: { rgb: "000000" } },
        left: { style: 'thin', color: { rgb: "000000" } },
        bottom: { style: 'thin', color: { rgb: "000000" } },
        right: { style: 'thin', color: { rgb: "000000" } }
      }
    };

    // Aplicar estilos a cada celda
    const range = XLSX.utils.decode_range(ws['!ref']);
    for(let R = range.s.r; R <= range.e.r; ++R) {
      for(let C = range.s.c; C <= range.e.c; ++C) {
        let cell_ref = XLSX.utils.encode_cell({r:R, c:C});
        if (!ws[cell_ref]) ws[cell_ref] = {t: 's', v: ''};  // Asegurarse de que la celda está definida
        ws[cell_ref].s = commonStyle;
      }
    }

    // Merge cells as needed
    ws['!merges'] = [
      { s: { r: 0, c: 0 }, e: { r: 0, c: 11 } },
      { s: { r: 1, c: 0 }, e: { r: 1, c: 2 } },
      { s: { r: 2, c: 0 }, e: { r: 2, c: 2 } },
      { s: { r: 3, c: 0 }, e: { r: 3, c: 3 } },
      { s: { r: 3, c: 4 }, e: { r: 3, c: 11 } }
    ];

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Registro CCM');
    const base64 = XLSX.write(wb, { type: "base64" });
    const filename = FileSystem.documentDirectory + "Registro CCM-" + doc.date + "-" + doc.idCMMTab + ".xlsx";
    await FileSystem.writeAsStringAsync(filename, base64, { encoding: FileSystem.EncodingType.Base64 });
    await Sharing.shareAsync(filename);
  } catch ( error ) {
    console.log('An error occurred:', error);
  }
};



export const exportToExcelTD = async (doc) => {

  const cargasData = doc.cargas.map(carga => [
    {v: carga.nombreCar, t: 's'},
    {v: carga.val1In + '*' + carga.val2In, t: 's'},
    {v: carga.icc, t: 's'},
    {v: carga.noFasesCal, t: 's'},
    {v: carga.noNeutrosCal, t: 's'},
    {v: carga.noTierrasCal, t: 's'},
    {v: carga.canal, t: 's'},
    {v: carga.longuitud, t: 's'}
  ]);

  const data = [
    [{v: 'Relacion de Interruptores Instalados en TGD o TD', t: 's'}],
    [{v: 'INFORMACION GENERAL', t: 's'}],
    [{v: 'NOMBRE DEL TABLERO', t: 's'}, null, {v: doc.nameTablero, t: 's'}, null, {v: 'ALIMENTADOR', t: 's'}, null, {v: doc.corrNom, t: 's'}, null, {v: 'ORIGEN', t: 's'}, null, {v: doc.name, t: 's'}],
    [{v: 'ID', t: 's'}, null, {v: doc.idTDTab, t: 's'}, null, {v: 'PROTECCION', t: 's'}, null, {v: doc.protectionFuen, t: 's'}],
    [{v: 'INFORMACION LADO FUENTE', t: 's'},null,null,null,null,null,{v: 'INFORMACION ALIMENTADOR', t: 's'},null,null,null,null,null,null,null,null,null,null,null,{v: 'INFORMACION LADO TABLERO', t: 's'}],
    [
      {v: 'PROTECCIÓN LADO FUENTE', t: 's'}, {v: 'MARCA Y MODELO', t: 's'}, {v: 'TENSIÓN NOMINAL (VOLTS)', t: 's'}, {v: 'CORRIENTE NOMINAL (AMPERES)', t: 's'},
      {v: 'ICC(KA)', t: 's'}, {v: 'NO. POLOS (K)', t: 's'}, {v: 'NO. CABLES FASES', t: 's'}, {v: 'CALIBRE CABLE FASES', t: 's'}, {v: 'MAT CABLES FASES', t: 's'},
      {v: 'NO. CABLES NEUTROS', t: 's'}, {v: 'CALIBRE CABLES NEUTROS', t: 's'}, {v: 'MAT CABLES NEUTROS', t: 's'},
      {v: 'NO. CABLES TIERRA', t: 's'}, {v: 'CALIBRE CABLES TIERRA', t: 's'}, {v: 'MAT CABLES TIERRA', t: 's'}, {v: 'Canalizacion y medida', t: 's'},
      {v: 'LONGUITUD(m)', t: 's'}, {v: 'PROTECCIÓN LADO TABLERO', t: 's'}, {v: 'MARCA Y MODELO TABLERO', t: 's'}, {v: 'TENCIÓN NOMINAL TABLERO (VOLTS)', t: 's'},
      {v: 'CORRIENTE NOMINAL (AMPERES)', t: 's'}, {v: 'ICC TABLERO (KA)', t: 's'}, {v: 'NO. POLOS TABLERO(K)', t: 's'}, {v: 'Usuario Creador', t: 's'}
    ],
    [
      {v: doc.protectionFuen, t: 's'},
      {v: doc.marYMod, t: 's'},
      {v: doc.tenNom, t: 's'},
      {v: doc.corrNom, t: 's'},
      {v: doc.ICC, t: 's'},
      {v: doc.noPol, t: 's'},
      {v: doc.Fases[0].noCabFas, t: 's'},
      {v: doc.Fases[0].calCabFas, t: 's'},
      {v: doc.Fases[0].matCabFas, t: 's'},
      {v: doc.Neutros[0].noCabNeu, t: 's'},
      {v: doc.Neutros[0].calCabNeu, t: 's'},
      {v: doc.Neutros[0].matCabNeu, t: 's'},
      {v: doc.Tierras[0].noCabTie, t: 's'},
      {v: doc.Tierras[0].calCabTie, t: 's'},
      {v: doc.Tierras[0].matCabTie, t: 's'},
      {v: doc.canYmed, t: 's'},
      {v: doc.long, t: 's'},
      {v: doc.protectionTab, t: 's'},
      {v: doc.marYModTab, t: 's'},
      {v: doc.tenNomTab, t: 's'},
      {v: doc.corrNomTab, t: 's'},
      {v: doc.ICCTab, t: 's'},
      {v: doc.noPolTab, t: 's'},
      {v: doc.creatorUser, t: 's'}
    ],
    ['INFORMACIÓN DE LAS CARGAS', null, null, null, null, null, null, null, 'BARRAS NEUTROS:', '', doc.barrasNeutros, 'PUENTE DE UNIÓN:', '', doc.puenteUnion, 'BARRA DE TIERRA:', '', doc.barraTierra],
    ['Nombre de Carga', 'IN', 'ICC', 'F', 'N', 'T', 'C', 'L'],
    ...cargasData
  ];

  const ws = XLSX.utils.aoa_to_sheet(data);
console.log(ws);
  // Aplicar estilos comunes
  const commonStyle = {
    alignment: {
      horizontal: "center",
      vertical: "center",
      wrapText: true
    },
    border: {
      top: { style: 'thin', color: { rgb: "000000" } },
      left: { style: 'thin', color: { rgb: "000000" } },
      bottom: { style: 'thin', color: { rgb: "000000" } },
      right: { style: 'thin', color: { rgb: "000000" } }
    }
  };

  // Aplicar el estilo a cada celda
  const range = XLSX.utils.decode_range(ws['!ref']);
  for(let R = range.s.r; R <= range.e.r; ++R) {
    for(let C = range.s.c; C <= range.e.c; ++C) {
      let cell_ref = XLSX.utils.encode_cell({r: R, c: C});
      if (!ws[cell_ref]) ws[cell_ref] = {t: 's', v: ''};  // Inicializar las celdas no definidas
      ws[cell_ref].s = commonStyle;
    }
  }

  ws['!merges'] = [
    { s: { r: 0, c: 0 }, e: { r: 0, c: 23 } }, // Título
    { s: { r: 1, c: 0 }, e: { r: 1, c: 10 } }, // INFORMACION GENERAL
    { s: { r: 2, c: 0 }, e: { r: 2, c: 1 } }, // NOMBRE DEL TABLERO
    { s: { r: 3, c: 0 }, e: { r: 3, c: 1 } }, // ID
    { s: { r: 2, c: 8 }, e: { r: 2, c: 9 } }, // ORIGEN
    { s: { r: 2, c: 4 }, e: { r: 2, c: 5 } }, // ALIMENTADOR
    { s: { r: 3, c: 4 }, e: { r: 3, c: 5 } }, // PROTECCION
    { s: { r: 4, c: 0 }, e: { r: 4, c: 5 } }, // INFORMACION LADO FUENTE
    { s: { r: 4, c: 6 }, e: { r: 4, c: 17 } }, // INFORMACION ALIMENTADOR
    { s: { r: 4, c: 18 }, e: { r: 4, c: 22 } }, // INFORMACION ALIMENTADOR
    { s: { r: 7, c: 0 }, e: { r: 7, c: 7 } }  // Sección CARGAS
  ];


  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Registro TD');
  const base64 = XLSX.write(wb, { type: "base64" });
  const filename = FileSystem.documentDirectory + "Registro TD-" + doc.date + "-" + doc.idTDTab + ".xlsx";
  await FileSystem.writeAsStringAsync(filename, base64, { encoding: FileSystem.EncodingType.Base64 });
  await Sharing.shareAsync(filename);
};

export const exportToExcelTGD = async (doc) => {
  const cargasData = doc.cargas.map(carga => [
    carga.nombreCar,
    carga.val1In + '*' + carga.val2In,
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
      'NO. CABLES TIERRA', 'CALIBRE CABLES TIERRA', 'MAT CABLES TIERRA', 'Canalizacion y medida', 'LONGITUD (m)', 'FECHA', 'Usuario Creador'],
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
      doc.date,
      doc.creatorUser,
    ],
    ['BARRAS NEUTROS', doc.barrasNeutros],
    ['PUENTE DE UNIÓN', doc.puenteUnion],
    ['BARRA DE TIERRA', doc.barraTierra],
    ['CARGAS', '', '', '', '', '', ''],
    ['Nombre de Carga', 'IN', 'ICC', 'F', 'N', 'T', 'C', 'L'],
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
