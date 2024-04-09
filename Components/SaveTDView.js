// File: SaveTDView.js

import React from 'react';
import { View,ActivityIndicator,TouchableOpacity, TextInput, Text, Button, ScrollView, Dimensions } from 'react-native';
import { format } from 'date-fns';
import {styles} from '../Styles/SaveTDViewStyles'
import {useTDModel} from '../ModelsViews/ModelViewAll' // Importar el modelo

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
  } = useTDModel();

  const windowWidth = Dimensions.get('window').width;

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

      <Text style={styles.label}>REGISTRATION DATE:</Text>
      <Text style={styles.inputFullWidth}>{format(date, 'yyyy-MM-dd HH:mm:ss')}</Text>

      {loading ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : (
                <TouchableOpacity
                    style={styles.button}
                    onPress={handleSubmit}
                >
                    <Text style={styles.buttonText}>Guardar</Text>
                </TouchableOpacity>
            )}
    </ScrollView>
  );
};

export default SaveTDView;
