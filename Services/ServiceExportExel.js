import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import XLSX from 'xlsx-js-style';

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

// Estilo específico para el título con color de fondo
const titleStyle = {
  ...commonStyle,
  fill: {
    fgColor: { rgb: "C6E0B4" }
  },
  font: {
    bold: true,  // Texto en negrita
    sz: 13,      // Tamaño de la fuente
    color: { rgb: "000000" }  // Color de la fuente, negro
  }
};

const secondTitle = {
  ...commonStyle,
  font: {
    bold: true,  // Texto en negrita
    sz: 12,      // Tamaño de la fuente
    color: { rgb: "000000" }  // Color de la fuente, negro
  }
};
const Title = {
  ...commonStyle,
  font: {
    bold: true,  // Texto en negrita
    sz: 9,      // Tamaño de la fuente
    color: { rgb: "000000" }  // Color de la fuente, negro
  }
};
const text = {
  ...commonStyle,
  font: {
    sz: 9,      // Tamaño de la fuente
    color: { rgb: "FF0000" }  // Color de la fuente, negro
  }
};


export const exportToExcelCCM = async (doc) => {
  try {
    // Crear la estructura básica de datos con objetos de celda completos para evitar undefined
    const data = [
      [{ v: 'RELACIÓN DE INTERRUPTORES INSTALADOS EN CCM', t: 's' }],
      [{ v: 'NOMBRE DEL TABLERO', t: 's' }, null, { v: doc.nameTablero, t: 's' }],
      [{ v: 'ID', t: 's' }, null, { v: doc.idCMMTab, t: 's' }],
      [{ v: 'INFORMACIÓN GENERAL', t: 's' }, null, null, null, { v: 'TABLA DE DATOS GENERALES', t: 's' }, null, null, null, null, null, null, 'INFORMACIÓN DEL REGISTRO'],
      [{ v: 'CMM', t: 's' }, { v: 'AREA CMM', t: 's' }, { v: 'TD', t: 's' }, { v: 'AREA TD', t: 's' }, { v: 'PROTECCIÓN', t: 's' },
      { v: 'INTERRUPTOR', t: 's' }, { v: 'TENSIÓN NO.', t: 's' }, { v: 'CORRIENTE NO.', t: 's' }, { v: 'ICC', t: 's' },
      { v: 'NO. POLOS', t: 's' }, { v: 'FUSIBLES', t: 's' },
      { v: 'USUARIO CREADOR', t: 's' }, { v: 'FECHA DE CREACIÓN', t: 's' }, { v: 'ULTIMA MODIFICACIÓN POR', t: 's' }, { v: 'FECHA DE ULTIMA MODIFICACIÓN', t: 's' }],
      [
        { v: doc.CMM, t: 's' },
        { v: doc.areaCMM, t: 's' },
        { v: doc.TD, t: 's' },
        { v: doc.areTD, t: 's' },
        { v: doc.Proteccion[0].prot1 + ' / ' + doc.Proteccion[0].prot2, t: 's' },
        { v: doc.Interruptor[0].inte1 + ' / ' + doc.Interruptor[0].inte1, t: 's' },
        { v: doc.TensionNormal[0].tens1 + ' / ' + doc.TensionNormal[0].tens2, t: 's' },
        { v: doc.CorrienteNominal[0].corr1 + ' / ' + doc.CorrienteNominal[0].corr2, t: 's' },
        { v: doc.ICC[0].ICC1 + ' / ' + doc.ICC[0].ICC2, t: 's' },
        { v: doc.NoPolos[0].noPol1 + ' / ' + doc.NoPolos[0].noPol2, t: 's' },
        { v: doc.Fusibles[0].fusi1 + ' / ' + doc.Fusibles[0].fusi2, t: 's' },
        { v: doc.creatorUser, t: 's' },
        { v: doc.date, t: 's' },
        { v: doc.userWhoEdited ? doc.userWhoEdited : "AÚN NO SE HA MODIFICADO", t: 's' },
        { v: doc.UpdateDate ? doc.UpdateDate : "AÚN NO SE HA MODIFICADO", t: 's' }
      ]
    ];

    const ws = XLSX.utils.aoa_to_sheet(data);



    // Aplicar estilos a cada celda
    const range = XLSX.utils.decode_range(ws['!ref']);
    for (let R = range.s.r; R <= range.e.r; ++R) {
      for (let C = range.s.c; C <= range.e.c; ++C) {
        let cell_ref = XLSX.utils.encode_cell({ r: R, c: C });
        if (!ws[cell_ref]) ws[cell_ref] = { t: 's', v: '' };  // Asegurarse de que la celda está definida
        ws[cell_ref].s = commonStyle;
      }
    }

    // Aplica el estilo en negrita a las celdas de A5 a O5
    for (let C = 0; C < 15; C++) {  // Asume que O es la 15ª columna (0-indexed)
      let cell_ref = XLSX.utils.encode_cell({ r: 4, c: C }); // Fila 5 (0-indexed es 4)
      ws[cell_ref].s = Title;
    }
    ws['A2'].s = Title;
    ws['A3'].s = Title;
    ws['C2'].s = text;
    ws['C3'].s = text;
    ws['A4'].s = secondTitle;
    ws['E4'].s = secondTitle;
    ws['L4'].s = secondTitle;
    // Merge cells as needed
    ws['!merges'] = [
      { s: { r: 0, c: 0 }, e: { r: 0, c: 14 } },
      { s: { r: 1, c: 0 }, e: { r: 1, c: 1 } },
      { s: { r: 2, c: 0 }, e: { r: 2, c: 1 } },
      { s: { r: 3, c: 0 }, e: { r: 3, c: 3 } },
      { s: { r: 3, c: 4 }, e: { r: 3, c: 10 } },
      { s: { r: 3, c: 11 }, e: { r: 3, c: 14 } }
    ];

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Registro CCM');
    const base64 = XLSX.write(wb, { type: "base64" });
    const filename = FileSystem.documentDirectory + "Registro CCM-" + doc.date + "-" + doc.idCMMTab + ".xlsx";
    await FileSystem.writeAsStringAsync(filename, base64, { encoding: FileSystem.EncodingType.Base64 });
    await Sharing.shareAsync(filename);
  } catch (error) {
    console.log('An error occurred:', error);
  }
};



export const exportToExcelTD = async (doc) => {

  const cargasData = doc.cargas.map(carga => [
    { v: carga.nombreCar, t: 's' },
    { v: carga.val1In + '*' + carga.val2In, t: 's' },
    { v: carga.icc, t: 's' },
    { v: carga.noFasesCal, t: 's' },
    { v: carga.noNeutrosCal, t: 's' },
    { v: carga.noTierrasCal, t: 's' },
    { v: carga.canal, t: 's' },
    { v: carga.longuitud, t: 's' }
  ]);

  const data = [
    [{ v: 'RELACIÓN DE INTERRUPTORES INSTALADOS EN TD', t: 's' }],
    [{ v: 'INFORMACION GENERAL', t: 's' }],
    [{ v: 'NOMBRE DEL TABLERO', t: 's' }, null, { v: doc.nameTablero, t: 's' }, null, { v: 'ALIMENTADOR', t: 's' }, null, { v: doc.corrNom, t: 's' }, null, { v: 'ORIGEN', t: 's' }, null, { v: doc.name, t: 's' }],
    [{ v: 'ID', t: 's' }, null, { v: doc.idTDTab, t: 's' }, null, { v: 'PROTECCION', t: 's' }, null, { v: doc.protectionFuen, t: 's' }],
    [{ v: 'INFORMACION LADO FUENTE', t: 's' }, null, null, null, null, null, { v: 'INFORMACION ALIMENTADOR', t: 's' }, null, null, null, null, null, null, null, null, null, null, null, { v: 'INFORMACION LADO TABLERO', t: 's' }],
    [
      { v: 'PROTECCIÓN LADO FUENTE', t: 's' }, { v: 'MARCA Y MODELO', t: 's' }, { v: 'TENSIÓN NOMINAL (VOLTS)', t: 's' }, { v: 'CORRIENTE NOMINAL (AMPERES)', t: 's' },
      { v: 'ICC (KA)', t: 's' }, { v: 'NO. POLOS (K)', t: 's' }, { v: 'NO. CABLES FASES', t: 's' }, { v: 'CALIBRE CABLE FASES', t: 's' }, { v: 'MAT CABLES FASES', t: 's' },
      { v: 'NO. CABLES NEUTROS', t: 's' }, { v: 'CALIBRE CABLES NEUTROS', t: 's' }, { v: 'MAT CABLES NEUTROS', t: 's' },
      { v: 'NO. CABLES TIERRA', t: 's' }, { v: 'CALIBRE CABLES TIERRA', t: 's' }, { v: 'MAT CABLES TIERRA', t: 's' }, { v: 'CANALIZACIÓN Y MEDIDA', t: 's' },
      { v: 'LONGUITUD (M)', t: 's' }, { v: 'PROTECCIÓN LADO TABLERO', t: 's' }, { v: 'MARCA Y MODELO TABLERO', t: 's' }, { v: 'TENCIÓN NOMINAL TABLERO (VOLTS)', t: 's' },
      { v: 'CORRIENTE NOMINAL (AMPERES)', t: 's' }, { v: 'ICC TABLERO (KA)', t: 's' }, { v: 'NO. POLOS TABLERO (K)', t: 's' }
    ],
    [
      { v: doc.protectionFuen, t: 's' },
      { v: doc.marYMod, t: 's' },
      { v: doc.tenNom, t: 's' },
      { v: doc.corrNom, t: 's' },
      { v: doc.ICC, t: 's' },
      { v: doc.noPol, t: 's' },
      { v: doc.Fases[0].noCabFas, t: 's' },
      { v: doc.Fases[0].calCabFas, t: 's' },
      { v: doc.Fases[0].matCabFas, t: 's' },
      { v: doc.Neutros[0].noCabNeu, t: 's' },
      { v: doc.Neutros[0].calCabNeu, t: 's' },
      { v: doc.Neutros[0].matCabNeu, t: 's' },
      { v: doc.Tierras[0].noCabTie, t: 's' },
      { v: doc.Tierras[0].calCabTie, t: 's' },
      { v: doc.Tierras[0].matCabTie, t: 's' },
      { v: doc.canYmed, t: 's' },
      { v: doc.long, t: 's' },
      { v: doc.protectionTab, t: 's' },
      { v: doc.marYModTab, t: 's' },
      { v: doc.tenNomTab, t: 's' },
      { v: doc.corrNomTab, t: 's' },
      { v: doc.ICCTab, t: 's' },
      { v: doc.noPolTab, t: 's' }
    ],
    [null],
    ['INFORMACIÓN DE LAS CARGAS', null, null, null, null, null, null, null, 'BARRAS NEUTROS:', doc.barrasNeutros, 'PUENTE DE UNIÓN:', doc.puenteUnion,
      'BARRA DE TIERRA:', doc.barraTierra, 'INFORMACIÓN DEL REGISTRO:', 'USUARIO CREADOR:', doc.creatorUser, 'FECHA DE CREACIÓN:', doc.date,
      'ULTIMA MODIFICACIÓN POR:', doc.userWhoEdited ? doc.userWhoEdited : "AÚN NO SE HA MODIFICADO",
      'FECHA DE ULTIMA EDICIÓN:', doc.UpdateDate ? doc.UpdateDate : "AÚN NO SE HA MODIFICADO"],
    ['NOMBRE DE LA CARGA', 'IN', 'ICC', 'F', 'N', 'T', 'C', 'L'],
    ...cargasData
  ];

  const ws = XLSX.utils.aoa_to_sheet(data);


  // Aplicar el estilo a cada celda
  const range = XLSX.utils.decode_range(ws['!ref']);
  for (let R = range.s.r; R <= range.e.r; ++R) {
    for (let C = range.s.c; C <= range.e.c; ++C) {
      let cell_ref = XLSX.utils.encode_cell({ r: R, c: C });
      if (!ws[cell_ref]) ws[cell_ref] = { t: 's', v: '' };  // Inicializar las celdas no definidas
      ws[cell_ref].s = commonStyle;
    }
  }


  // Aplica el estilo del título a las celdas combinadas del título
  const titleCell = XLSX.utils.encode_cell({ r: 0, c: 0 });
  ws[titleCell].s = titleStyle;


  // Aplica el estilo en negrita a las celdas de A5 a O5
  for (let C = 0; C < 23; C++) {  // Asume que W es la 23ª columna (0-indexed)
    let cell_ref = XLSX.utils.encode_cell({ r: 5, c: C }); // Fila 6 (0-indexed es 4)
    ws[cell_ref].s = Title;
  }

  for (let C = 8; C < 23; C++) {  // Asume que W es la 23ª columna (0-indexed)
    let cell_ref = XLSX.utils.encode_cell({ r: 8, c: C }); // Fila 8 (0-indexed es 4)
    ws[cell_ref].s = Title;
  }

  for (let C = 0; C < 8; C++) {  // Asume que W es la 23ª columna (0-indexed)
    let cell_ref = XLSX.utils.encode_cell({ r: 9, c: C }); // Fila 8 (0-indexed es 4)
    ws[cell_ref].s = Title;
  }

  ws['A2'].s = secondTitle;
  ws['A3'].s = Title;
  ws['A4'].s = Title;
  ws['E3'].s = Title;
  ws['E4'].s = Title;
  ws['I3'].s = Title;
  ws['A5'].s = secondTitle;
  ws['G5'].s = secondTitle;
  ws['S5'].s = secondTitle;
  ws['A9'].s = secondTitle;
  ws['C3'].s = text;
  ws['C4'].s = text;
  ws['G3'].s = text;
  ws['G4'].s = text;
  ws['K3'].s = text;

  ws['!merges'] = [
    { s: { r: 0, c: 0 }, e: { r: 0, c: 22 } }, // Título
    { s: { r: 1, c: 0 }, e: { r: 1, c: 10 } }, // INFORMACION GENERAL
    { s: { r: 2, c: 3 }, e: { r: 3, c: 3 } },  // Separación 1
    { s: { r: 2, c: 7 }, e: { r: 3, c: 7 } },  // Separación 2
    { s: { r: 2, c: 0 }, e: { r: 2, c: 1 } }, // NOMBRE DEL TABLERO
    { s: { r: 3, c: 0 }, e: { r: 3, c: 1 } }, // ID
    { s: { r: 2, c: 8 }, e: { r: 2, c: 9 } }, // ORIGEN
    { s: { r: 2, c: 4 }, e: { r: 2, c: 5 } }, // ALIMENTADOR
    { s: { r: 3, c: 4 }, e: { r: 3, c: 5 } }, // PROTECCION
    { s: { r: 4, c: 0 }, e: { r: 4, c: 5 } }, // INFORMACION LADO FUENTE
    { s: { r: 4, c: 6 }, e: { r: 4, c: 17 } }, // INFORMACION ALIMENTADOR
    { s: { r: 4, c: 18 }, e: { r: 4, c: 22 } }, // INFORMACION ALIMENTADOR
    { s: { r: 7, c: 0 }, e: { r: 7, c: 22 } },  // Separación
    { s: { r: 8, c: 0 }, e: { r: 8, c: 7 } }  // Sección CARGAS
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
    { v: carga.nombreCar, t: 's' },
    { v: carga.val1In + '*' + carga.val2In, t: 's' },
    { v: carga.icc, t: 's' },
    { v: carga.noFasesCal, t: 's' },
    { v: carga.noNeutrosCal, t: 's' },
    { v: carga.noTierrasCal, t: 's' },
    { v: carga.canal, t: 's' },
    { v: carga.longuitud, t: 's' }
  ]);

  const data = [
    [{ v: 'Relación de Interruptores Instalados en TGD', t: 's' }],
    [{ v: 'INFORMACION GENERAL', t: 's' }],
    [{ v: 'NOMBRE DEL TABLERO', t: 's' }, null, { v: doc.nameTablero, t: 's' }, null, { v: 'ORIGEN', t: 's' }, null, { v: doc.name, t: 's' }],
    [{ v: 'ID', t: 's' }, null, { v: doc.idTGDTab, t: 's' }],
    [{ v: 'PROTECCIÓN AL TRANSFORMADOR', t: 's' }, null, null, null, null, null, null, null, { v: 'DATOS DEL TRANSFORMADOR', t: 's' },
      null, null, null, null, null, { v: 'INFORMACION ALIMENTADOR', t: 's' }, null, null, null, null, null, null, null, null, null, null, null, 'INFORMACIÓN LADO TABLERO'],
    [
      { v: 'INTERRUPTOR (MARCA Y TIPO)', t: 's' }, { v: 'TENSIÓN (VOLTS)', t: 's' }, { v: 'CORRIENTE NOMINAL(AMPERES)', t: 's' },
      { v: 'ICC(KA)', t: 's' }, { v: 'NO. POLOS', t: 's' }, { v: 'FUSIBLES', t: 's' }, { v: 'INOM', t: 's' }, { v: 'ICC (KA)', t: 's' },//PROTECCIÓN TRANSFORMADOR
      { v: 'MARCA Y TIPO DE TRANSFORMADOR', t: 's' }, { v: 'KVA', t: 's' },
      { v: 'TENSIÓN NOMINAL (VOLTS)', t: 's' }, { v: '', t: 's' }, { v: 'CONEXIÓN', t: 's' }, { v: '% Z', t: 's' }, //DATOS DEL TRANSFORMADOR
      { v: 'NO. CABLES FASES', t: 's' }, { v: 'CALIBRE CABLES FASES', t: 's' }, { v: 'MAT CABLES FASES', t: 's' },
      { v: 'NO. CABLES NEUTROS', t: 's' }, { v: 'CALIBRE CABLES NEUTROS', t: 's' }, { v: 'MAT CABLES NEUTROS', t: 's' },
      { v: 'NO. CABLES TIERRA', t: 's' }, { v: 'CALIBRE CABLES TIERRA', t: 's' }, { v: 'MAT CABLES TIERRA', t: 's' },
      { v: 'CANALIZACIÓN Y MEDIDA', t: 's' }, { v: 'LONGITUD (m)', t: 's' }, { v: 'PROTECCIÓN LADO TABLERO', t: 's' }, //INFORMACION ALIMENTADOR
      { v: 'MARCA Y MODELO TABLERO', t: 's' }, { v: 'TENCIÓN NOMINAL TABLERO (VOLTS)', t: 's' },
      { v: 'CORRIENTE NOMINAL (AMPERES)', t: 's' }, { v: 'ICC TABLERO (KA)', t: 's' }, { v: 'NO. POLOS TABLERO(K)', t: 's' } //INFORMACIÓN LADO TABLERO
    ],
    [
      { v: doc.interruptor, t: 's' }, { v: doc.tension, t: 's' }, { v: doc.corrNom, t: 's' },
      { v: doc.ICC, t: 's' }, { v: doc.noPolos, t: 's' }, { v: doc.fusibles, t: 's' }, { v: doc.INOM, t: 's' },
      { v: doc.ICC2, t: 's' }, { v: doc.marcYTipTrans, t: 's' }, { v: doc.KVA, t: 's' }, 
      { v: doc.tensDivisor + '/' + doc.tensCociente, t: 's' }, { v: '', t: 's' },
       { v: doc.conexion, t: 's' }, { v: doc.porcZ, t: 's' },
      { v: doc.Fases[0].noCabFas, t: 's' }, { v: doc.Fases[0].calCabFas, t: 's' }, { v: doc.Fases[0].matCabFas, t: 's' },
      { v: doc.Neutros[0].noCabNeu, t: 's' }, { v: doc.Neutros[0].calCabNeu, t: 's' }, { v: doc.Neutros[0].matCabNeu, t: 's' },
      { v: doc.Tierras[0].noCabTie, t: 's' }, { v: doc.Tierras[0].calCabTie, t: 's' }, { v: doc.Tierras[0].matCabTie, t: 's' },
      { v: doc.canYmed, t: 's' }, { v: doc.long, t: 's' }, { v: doc.protectionTab, t: 's' }, { v: doc.marYModTab, t: 's' },
      { v: doc.tenNomTab, t: 's' }, { v: doc.corrNomTab, t: 's' }, { v: doc.ICCTab, t: 's' },
      { v: doc.noPolTab, t: 's' }
    ],
    [null],
    ['INFORMACIÓN DE LAS CARGAS', null, null, null, null, null, null, null, 'BARRAS NEUTROS:', doc.barrasNeutros, 'PUENTE DE UNIÓN:', doc.puenteUnion,
      'BARRA DE TIERRA:', doc.barraTierra, '', 'INFORMACIÓN DEL REGISTRO: ', 'USUARIO CREADOR:', doc.creatorUser, 'FECHA DE CREACIÓN:', doc.date,
      'ULTIMA MODIFICACIÓN POR:', doc.userWhoEdited ? doc.userWhoEdited : "AÚN NO SE HA MODIFICADO",
      'FECHA DE ULTIMA EDICIÓN:', doc.UpdateDate ? doc.UpdateDate : "AÚN NO SE HA MODIFICADO"],
    ['NOMBRE DE LA CARGA', 'IN', 'ICC', 'F', 'N', 'T', 'C', 'L'],
    ...cargasData
  ];

  const ws = XLSX.utils.aoa_to_sheet(data);

  // Estilos comunes
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
  for (let R = range.s.r; R <= range.e.r; ++R) {
    for (let C = range.s.c; C <= range.e.c; ++C) {
      let cell_ref = XLSX.utils.encode_cell({ r: R, c: C });
      if (!ws[cell_ref]) ws[cell_ref] = { t: 's', v: '' };  // Inicializar las celdas no definidas
      ws[cell_ref].s = commonStyle;
    }
  }

  // Aplica el estilo del título a las celdas combinadas del título
  const titleCell = XLSX.utils.encode_cell({ r: 0, c: 0 });
  ws[titleCell].s = titleStyle;


  // Aplica el estilo en negrita a las celdas
  for (let C = 0; C < 31; C++) {
    let cell_ref = XLSX.utils.encode_cell({ r: 5, c: C });
    ws[cell_ref].s = Title;
  }

  for (let C = 8; C < 24; C++) {
    let cell_ref = XLSX.utils.encode_cell({ r: 8, c: C });
    ws[cell_ref].s = Title;
  }

  for (let C = 0; C < 8; C++) {
    let cell_ref = XLSX.utils.encode_cell({ r: 9, c: C });
    ws[cell_ref].s = Title;
  }

  ws['A2'].s = secondTitle;
  ws['A3'].s = Title;
  ws['A4'].s = Title;
  ws['E3'].s = Title;
  ws['A5'].s = secondTitle;
  ws['I5'].s = secondTitle;
  ws['O5'].s = secondTitle;
  ws['AA5'].s = secondTitle;
  ws['A9'].s = secondTitle;
  ws['C3'].s = text;
  ws['C4'].s = text;
  ws['G3'].s = text;

  ws['!merges'] = [
    { s: { r: 0, c: 0 }, e: { r: 0, c: 30 } }, // Título
    { s: { r: 1, c: 0 }, e: { r: 1, c: 7 } }, // INFORMACION GENERAL
    { s: { r: 2, c: 3 }, e: { r: 3, c: 3 } },  // Separación 1
    { s: { r: 2, c: 0 }, e: { r: 2, c: 1 } }, // NOMBRE DEL TABLERO
    { s: { r: 3, c: 0 }, e: { r: 3, c: 1 } }, // ID
    { s: { r: 2, c: 4 }, e: { r: 2, c: 5 } }, // ORIGEN
    { s: { r: 5, c: 10 }, e: { r: 5, c: 11 } }, // TENSIÓN
    { s: { r: 6, c: 10 }, e: { r: 6, c: 11 } }, // TENSIÓN DATOS
    { s: { r: 4, c: 0 }, e: { r: 4, c: 7 } }, // PROTECCIÓN AL TRANSFORMADOR
    { s: { r: 4, c: 8 }, e: { r: 4, c: 13 } }, // DATOS DEL TRANSFORMADOR
    { s: { r: 4, c: 14 }, e: { r: 4, c: 25 } }, // INFORMACION ALIMENTADOR
    { s: { r: 4, c: 26 }, e: { r: 4, c: 30 } }, // INFORMACIÓN LADO TABLERO
    { s: { r: 7, c: 0 }, e: { r: 7, c: 30 } },  // Separación
    { s: { r: 8, c: 0 }, e: { r: 8, c: 7 } }  // Sección CARGAS
  ];

  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Registro TGD');
  const base64 = XLSX.write(wb, { type: "base64" });
  const filename = FileSystem.documentDirectory + "Registro TGD-" + doc.date + "-" + doc.idTGDTab + ".xlsx";
  await FileSystem.writeAsStringAsync(filename, base64, { encoding: FileSystem.EncodingType.Base64 });
  await Sharing.shareAsync(filename);
};
