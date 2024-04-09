import React, { useState } from 'react';
import { ScrollView, View, Text, TextInput, Button,Dimensions } from 'react-native';
import { styles } from '../Styles/SaveTDViewStyles';
import { format } from 'date-fns';
const SaveTDViewContent = ({
  name,
  setName,
  nameTablero,
  setNameTablero,
  id,
  setId,
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
}) => {
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
          value={id}
          onChangeText={setId}
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
        <Text style={styles.label}>TENSIÓN NOMINAL</Text>
        <TextInput
          style={[styles.input, styles.inputFullWidth]}
          value={tenNom}
          onChangeText={setTenNom}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>CORRIENTE NOMINAL</Text>
        <TextInput
          style={[styles.input, styles.inputFullWidth]}
          value={corrNom}
          onChangeText={setCorrNom}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>ICC</Text>
        <TextInput
          style={[styles.input, styles.inputFullWidth]}
          value={ICC}
          onChangeText={setICC}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>NO. POLOS</Text>
        <TextInput
          style={[styles.input, styles.inputFullWidth]}
          value={noPol}
          onChangeText={setNoPol}
        />
      </View>
      <Text style={styles.label}>Informacion Alimentador</Text>
      <View style={styles.tableContainer}>
        <View style={styles.tableRow}>
          <TextInput
            style={[styles.tableInput, styles.flex1]}
            value={noCabFas}
            onChangeText={setNoCabFas}
          />
          <Text style={styles.tableHeader}>NO. CABLES FASES</Text>
          <TextInput
            style={[styles.tableInput, styles.flex1]}
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
            value={noCabNeu}
            onChangeText={setNoCabNeu}
          />
          <Text style={styles.tableHeader}>NO. DE CABLES NEUTROS</Text>
          <TextInput
            style={[styles.tableInput, styles.flex1]}
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
            value={noCabTie}
            onChangeText={setNoCabTie}
          />
          <Text style={styles.tableHeader}>NO. DE CABLES TIERRAS</Text>
          <TextInput
            style={[styles.tableInput, styles.flex1]}
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
        <Text style={styles.label}>TENSIÓN NOMINAL</Text>
        <TextInput
          style={[styles.input, styles.inputFullWidth]}
          value={tenNomTab}
          onChangeText={setTenNomTab}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>CORRIENTE NOMINAL</Text>
        <TextInput
          style={[styles.input, styles.inputFullWidth]}
          value={corrNomTab}
          onChangeText={setCorrNomTab}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>ICC</Text>
        <TextInput
          style={[styles.input, styles.inputFullWidth]}
          value={ICCTab}
          onChangeText={setICCTab}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>NO. POLOS</Text>
        <TextInput
          style={[styles.input, styles.inputFullWidth]}
          value={noPolTab}
          onChangeText={setNoPolTab}
        />
      </View>

      <Text style={styles.label}>REGISTRATION DATE:</Text>
      <Text style={styles.inputFullWidth}>{format(date, 'yyyy-MM-dd HH:mm:ss')}</Text>

      <Button title="Siguiente →" onPress={handleSubmit} style={styles.marginTop} />
    </ScrollView>
  );
};

export default SaveTDViewContent;