import React from 'react';
import { View,ActivityIndicator,TouchableOpacity, TextInput, Text, Button, ScrollView, Dimensions } from 'react-native';
import { format } from 'date-fns';
import {styles} from '../Styles/SaveTDViewStyles'
import {useTGDModel} from '../ModelsViews/ModelViewAll' // Importar el modelo

const SaveTGDView = () => {
  const {
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
  } = useTGDModel();

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
          value={idTGDTab}
          onChangeText={setIdTGDTab}
        />
      </View>
      <Text style={styles.label}>PROTECCIÓN AL TRANSFORMADOR</Text>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>INTERRUPTOR (MARCA Y TIPO)</Text>
        <TextInput
          style={[styles.input, styles.inputFullWidth]}
          value={interruptor}
          onChangeText={setInterruptor}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>TENSIÓN NOMINAL (VOLTS)</Text>
        <TextInput
          style={[styles.input, styles.inputFullWidth]}
          keyboardType="numeric" 
          value={tension}
          onChangeText={setTension}
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
        <Text style={styles.label}>ICC (kA)</Text>
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
          value={noPolos}
          onChangeText={setNoPolos}
        />
      </View>

      <View style={[styles.switchContainer, styles.marginBottom]}>
        <Text style={styles.label}>FUSIBLES</Text>
        <Button
          title={fusibles ? 'SI' : 'NO'}
          buttonStyle={styles.switchButton}
          onPress={() => setfusibles(!fusibles)}
        />
      </View>
 
      <View style={styles.inputContainer}>
        <Text style={styles.label}>INOM</Text>
        <TextInput
          style={[styles.input, styles.inputFullWidth]}
          keyboardType="numeric" 
          value={INOM}
          onChangeText={setINOM}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>NO. POLOS</Text>
        <TextInput
          style={[styles.input, styles.inputFullWidth]}
          keyboardType="numeric" 
          value={noPolos2}
          onChangeText={setNoPolos2}
        />
      </View>
      <Text style={styles.label}>DATOS DEL TRANSFORMADOR</Text>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>MARCA Y TIPO</Text>
        <TextInput
          style={[styles.input, styles.inputFullWidth]}
          value={marcYTipTrans}
          onChangeText={setMarcYTipTrans}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>KVA</Text>
        <TextInput
          style={[styles.input, styles.inputFullWidth]}
          keyboardType="numeric" 
          value={KVA}
          onChangeText={setKVA}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>TENSIÓN NOMINAL</Text>
        <TextInput
          style={[styles.input, styles.inputFullWidth]}
          keyboardType="numeric" 
          value={tensDivisor}
          onChangeText={setTensDivisor}
        />
        <Text style={styles.label}>/</Text>
        <TextInput
          style={[styles.input, styles.inputFullWidth]}
          keyboardType="numeric" 
          value={tensCociente}
          onChangeText={setTensCociente}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>CONEXIÓN</Text>
        <TextInput
          style={[styles.input, styles.inputFullWidth]}
          value={conexion}
          onChangeText={setConexion}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>%Z</Text>
        <TextInput
          style={[styles.input, styles.inputFullWidth]}
          keyboardType="numeric" 
          value={porcZ}
          onChangeText={setPorcZ}
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
        <Text style={styles.label}>LONGITUD(MTROS)</Text>
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

export default SaveTGDView;
