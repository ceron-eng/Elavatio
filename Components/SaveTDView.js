// File: SaveTDView.js

import React from 'react';
import { View, ActivityIndicator, TouchableOpacity, TextInput, Text, Button, ScrollView, Dimensions, FlatList, Alert } from 'react-native';
import { format } from 'date-fns';
import { styles } from '../Styles/SaveTDViewStyles'
import { useTDModel } from '../ModelsViews/ModelViewAll' // Importar el modelo

const SaveTDView = () => {
  const {
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
  } = useTDModel();

  const windowWidth = Dimensions.get('window').width;

  const agregarCarga = () => {
    if (
      !nombreCarga ||
      !icc ||
      !val1 ||
      !val2 ||
      !noFasesCal ||
      !noNeutrosCal ||
      !noTierrasCal ||
      !canal ||
      !longuitud
    ) {
      Alert.alert("Favor de llenar todos los campos");
      return;
    }

    setCargas([...cargas, { nombreCar: nombreCarga, icc, val1In: val1, val2In: val2, noFasesCal, noNeutrosCal, noTierrasCal, canal, longuitud }]);
    setNombreCarga('');
    setVal1('');
    setVal2('');
    setIcc('');
    setNoFasesCal('');
    setNoNeutrosCal('');
    setNoTierrasCal('');
    setCanal('');
    setLonguitud('');
  };
  const eliminarCarga = (index) => {
    const nuevasCargas = [...cargas];
    nuevasCargas.splice(index, 1);
    setCargas(nuevasCargas);
  };

  return (
    <ScrollView style={[styles.text, { width: windowWidth - 40 }]}>

      <Text style={styles.label}>Informacion General</Text>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>DESCRIBE EL ORIGEN (NOMBRE E ID)</Text>
        <TextInput
          style={[styles.input, styles.inputFullWidth]}
          value={name}
          onChangeText={setName}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>NOMBRE DEL TABLERO</Text>
        <TextInput
          style={[styles.input, styles.inputFullWidth]}
          value={nameTablero}
          onChangeText={setNameTablero}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>ID DEL TABLERO</Text>
        <TextInput
          style={[styles.input, styles.inputFullWidth]}
          value={idTDTab}
          onChangeText={setIdTDTab}
        />
      </View>
      <View style={[styles.switchContainer, styles.marginBottom]}>
        <Text style={styles.label}>PROTECCIÓN LADO FUENTE</Text>
        <Button
          title={protectionFuen ? 'SI' : 'NO'}
          buttonStyle={styles.switchButton}
          onPress={() => setProtectionFuen(!protectionFuen)}
        />
      </View>

      <Text style={styles.label}>Informacion Lado FUENTE</Text>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>MARCA Y MODELO</Text>
        <TextInput
          style={[styles.input, styles.inputFullWidth]}
          value={marYMod}
          onChangeText={setMarYMod}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>TENSIÓN NOMINAL (VOLTS)</Text>
        <TextInput
          style={[styles.input, styles.inputFullWidth]}
          keyboardType="numeric"
          value={tenNom}
          onChangeText={setTenNom}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>CORRIENTE NOMINAL (AMPERES)</Text>
        <TextInput
          style={[styles.input, styles.inputFullWidth]}
          keyboardType="numeric"
          value={corrNom}
          onChangeText={setCorrNom}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>ICC</Text>
        <TextInput
          style={[styles.input, styles.inputFullWidth]}
          keyboardType="numeric"
          value={ICC}
          onChangeText={setICC}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>NO. POLOS</Text>
        <TextInput
          style={[styles.input, styles.inputFullWidth]}
          keyboardType="numeric"
          value={noPol}
          onChangeText={setNoPol}
        />
      </View>

      {/* Informacion Alimentador */}
      <Text style={styles.label}>Informacion Alimentador</Text>
      <View style={styles.tableContainer}>
        <View style={styles.tableRow}>
          <TextInput
            style={[styles.tableInput, styles.flex1]}
            keyboardType="numeric"
            value={noCabFas}
            onChangeText={setNoCabFas}
          />
          <Text style={styles.tableHeader}>NO. CABLES FASES</Text>
          <TextInput
            style={[styles.tableInput, styles.flex1]}
            keyboardType="numeric"
            value={calCabFas}
            onChangeText={setCalCabFas}
          />
          <Text style={styles.tableHeader}>CALIBRE</Text>
          <TextInput
            style={[styles.tableInput, styles.flex1]}
            value={matCabFas}
            onChangeText={setMatCabFas}
          />
          <Text style={styles.tableHeader}>MAT</Text>
        </View>
        <View style={styles.tableRow}>
          <TextInput
            style={[styles.tableInput, styles.flex1]}
            keyboardType="numeric"
            value={noCabNeu}
            onChangeText={setNoCabNeu}
          />
          <Text style={styles.tableHeader}>NO. DE CABLES NEUTROS</Text>
          <TextInput
            style={[styles.tableInput, styles.flex1]}
            keyboardType="numeric"
            value={calCabNeu}
            onChangeText={setCalCabNeu}
          />
          <Text style={styles.tableHeader}>CALIBRE</Text>
          <TextInput
            style={[styles.tableInput, styles.flex1]}
            value={matCabNeu}
            onChangeText={setMatCabNeu}
          />
          <Text style={styles.tableHeader}>MAT</Text>
        </View>
        <View style={styles.tableRow}>
          <TextInput
            style={[styles.tableInput, styles.flex1]}
            keyboardType="numeric"
            value={noCabTie}
            onChangeText={setNoCabTie}
          />
          <Text style={styles.tableHeader}>NO. DE CABLES TIERRAS</Text>
          <TextInput
            style={[styles.tableInput, styles.flex1]}
            keyboardType="numeric"
            value={calCabTie}
            onChangeText={setCalCabTie}
          />
          <Text style={styles.tableHeader}>CALIBRE</Text>
          <TextInput
            style={[styles.tableInput, styles.flex1]}
            value={matCabTie}
            onChangeText={setMatCabTie}
          />
          <Text style={styles.tableHeader}>MAT</Text>
        </View>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Canalizacion y medida</Text>
        <TextInput
          style={[styles.input, styles.inputFullWidth]}
          value={canYmed}
          onChangeText={setCanYmed}
        />
      </View>
      
      <View style={styles.inputContainer}>
        <Text style={styles.label}>LONGITUD</Text>
        <TextInput
          style={[styles.input, styles.inputFullWidth]}
          keyboardType="numeric"
          value={long}
          onChangeText={setLong}
        />
      </View>

      
      <View style={[styles.switchContainer, styles.marginBottom]}>
        <Text style={styles.label}>PROTECCIÓN LADO TABLERO</Text>
        <Button
          title={protectionTab ? 'SI' : 'NO'}
          buttonStyle={styles.switchButton}
          onPress={() => setProtectionTab(!protectionTab)}
        />
      </View>

      <Text style={styles.label}>Informacion Lado Tablero</Text>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>MARCA Y MODELO</Text>
        <TextInput
          style={[styles.input, styles.inputFullWidth]}
          value={marYModTab}
          onChangeText={setMarYModTab}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>TENSIÓN NOMINAL(VOLTS)</Text>
        <TextInput
          style={[styles.input, styles.inputFullWidth]}
          keyboardType="numeric"
          value={tenNomTab}
          onChangeText={setTenNomTab}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>CORRIENTE NOMINAL(AMPERES)</Text>
        <TextInput
          style={[styles.input, styles.inputFullWidth]}
          keyboardType="numeric"
          value={corrNomTab}
          onChangeText={setCorrNomTab}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>ICC(KA)</Text>
        <TextInput
          style={[styles.input, styles.inputFullWidth]}
          keyboardType="numeric"
          value={ICCTab}
          onChangeText={setICCTab}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>NO. POLOS (K)</Text>
        <TextInput
          style={[styles.input, styles.inputFullWidth]}
          keyboardType="numeric"
          value={noPolTab}
          onChangeText={setNoPolTab}
        />
      </View>
      <Text style={styles.label}>Informacion de la carga</Text>

      <View style={styles.inputContainer}>
        <Text>Forma de registrar:</Text>
        <TextInput
          placeholder='(Indicar el nombre de la carga)'
          style={[styles.input, styles.inputFullWidth]}
          onChangeText={setFormaRegistro}
          value={formaRegistro}
          readOnly={true}
        />
        <Text

        >(No. Fases-CAL/No.Neutros-Cal/No. tierras-CAL/CANAL/LONG-MTS)</Text>
      </View>

      <View style={styles.inputContainer}>
        <Text>Nombre de la carga:</Text>
        <TextInput
          style={[styles.input, styles.inputFullWidth]}
          value={nombreCarga}
          onChangeText={setNombreCarga}
        />
      </View>
      <View style={styles.tableContainer}>
        <View style={styles.tableRow}>

          <Text style={styles.tableHeader}>In:</Text>
          <TextInput
            style={[styles.tableInput, styles.flex1]}
            onChangeText={setVal1}
            value={val1}
            keyboardType="numeric"
          />
          <Text>*</Text>
          <TextInput
            style={[styles.tableInput, styles.flex1]}
            onChangeText={setVal2}
            value={val2}
            keyboardType="numeric"
          />
          <Text style={styles.tableHeader}>A</Text>
        </View>

        <View style={styles.tableRow}>
          <Text style={styles.tableHeader}>Icc:(Ka)</Text>
          <TextInput
            style={[styles.tableInput, styles.flex1]}
            onChangeText={setIcc}
            value={icc}
            keyboardType="numeric"
          />
        </View>

        <View style={styles.tableRow}>
          <Text style={styles.tableHeader}>F:</Text>
          <TextInput
            onChangeText={setNoFasesCal}
            style={[styles.tableInput, styles.flex1]}
            value={noFasesCal}
            keyboardType="numeric"
          />

          <Text style={styles.tableHeader}>/N:</Text>
          <TextInput
            onChangeText={setNoNeutrosCal}
            style={[styles.tableInput, styles.flex1]}
            value={noNeutrosCal}
            keyboardType="numeric"
          />

          <Text style={styles.tableHeader}>/T:</Text>
          <TextInput
            onChangeText={setNoTierrasCal}
            style={[styles.tableInput, styles.flex1]}
            value={noTierrasCal}
            keyboardType="numeric"
          />
          <Text style={styles.tableHeader}>/C:</Text>
          <TextInput
            onChangeText={setCanal}
            style={[styles.tableInput, styles.flex1]}
            value={canal}
            keyboardType="numeric"
          />
          <Text style={styles.tableHeader}>/L:</Text>
          <TextInput
            style={[styles.tableInput, styles.flex1]}
            onChangeText={setLonguitud}
            value={longuitud}
            keyboardType="numeric"
          />
        </View>

      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={agregarCarga}
      >
        <Text style={styles.buttonText}>Agregar Carga</Text>
      </TouchableOpacity>

      <FlatList
        data={cargas}
        renderItem={({ item, index }) => (
          <View style={styles.tableContainer}>
            <View style={styles.tableRow}>
              <Text>{item.nombreCar}</Text>
              <Text>Icc: {item.icc}</Text>
              <TouchableOpacity onPress={() => eliminarCarga(index)} style={styles.button}>
                <Text style={styles.eliminarButtonText}>X</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.tableRow}>
              <Text>F: {item.noFasesCal}</Text>
              <Text>/N: {item.noNeutrosCal}</Text>
              <Text>/T: {item.noTierrasCal}</Text>
              <Text>/C: {item.canal}</Text>
              <Text>/L: {item.longuitud}</Text>
            </View>

          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />

      <View style={[styles.switchContainer, styles.marginBottom]}>
        <Text style={styles.label}>Barras de neutros</Text>
        <Button
          title={barrasNeutros ? 'SI' : 'NO'}
          buttonStyle={styles.switchButton}
          onPress={() => setBarrasNeutros(!barrasNeutros)}
        />
      </View>

      <View style={[styles.switchContainer, styles.marginBottom]}>
        <Text style={styles.label}>Puente Union</Text>
        <Button
          title={puenteUnion ? 'SI' : 'NO'}
          buttonStyle={styles.switchButton}
          onPress={() => setPuenteUnion(!puenteUnion)}
        />
      </View>

      <View style={[styles.switchContainer, styles.marginBottom]}>
        <Text style={styles.label}>Barra de Tierra</Text>
        <Button
          title={barraTierra ? 'SI' : 'NO'}
          buttonStyle={styles.switchButton}
          onPress={() => setBarraTierra(!barraTierra)}
        />
      </View>

      <Text style={styles.label}>REGISTRATION DATE:</Text>
      <Text style={styles.inputFullWidth}>{format(date, 'yyyy-MM-dd HH:mm:ss')}</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            if (cargas.length === 0) {
              Alert.alert('Error', 'Debes agregar al menos una carga antes de guardar el registro.');
            } else {
              handleSubmit();
            }
          }}
        >
          <Text style={styles.buttonText}>Guardar</Text>
        </TouchableOpacity>
      )}
    </ScrollView>
  );
};

export default SaveTDView;
