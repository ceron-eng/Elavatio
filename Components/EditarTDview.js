// File: SaveTDView.js

import React, { useState, useEffect } from 'react';
import { View, ActivityIndicator, TouchableOpacity, TextInput, Text, Button, ScrollView, Dimensions, SectionList, Alert } from 'react-native';
import { format } from 'date-fns';
import { styles } from '../Styles/SaveTDViewStyles'
import { updateTD } from '../Services/ServicesRegistros'
import Pagination from '../Filters/Paginacion';
import { useTDModel } from '../ModelsViews/ModelViewAll' // Importar el modelo

const ITEMS_PER_PAGE = 2;

const EditTDView = ({ route, navigation }) => {
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
  const [currentPage, setCurrentPage] = useState(0);
  const startIndex = currentPage * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedCargas = cargas.slice(startIndex, endIndex);
  const totalPages = Math.ceil(cargas.length / ITEMS_PER_PAGE);
  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage(currentPage - 1);
  };
  const { user, userName } = route.params;
  const [id] = useState(user.idDoc);
  const [creatorUser] = useState(user.creatorUser);
  const userWhoEdited = userName.route.params.userName;
  
  const editarCarga = (text, campo, index) => {
    const nuevasCargas = [...cargas];
    nuevasCargas[index][campo] = text;
    setCargas(nuevasCargas);
  };

  
  useEffect(() => {
    setName(user.name);
    setNameTablero(user.nameTablero);
    setIdTDTab(user.idTDTab);
    setProtectionFuen(user.protectionFuen === 'Si' ? true : false);
    setMarYMod(user.marYMod);
    setTenNom(user.tenNom);
    setCorrNom(user.corrNom);
    setICC(user.ICC);
    setNoPol(user.noPol);
    setNoCabFas(user.Fases[0].noCabFas);
    setCalCabFas(user.Fases[0].calCabFas);
    setMatCabFas(user.Fases[0].matCabFas);
    setNoCabNeu(user.Neutros[0].noCabNeu);
    setCalCabNeu(user.Neutros[0].calCabNeu);
    setMatCabNeu(user.Neutros[0].matCabNeu);
    setNoCabTie(user.Tierras[0].noCabTie);
    setCalCabTie(user.Tierras[0].calCabTie);
    setMatCabTie(user.Tierras[0].matCabTie);
    setLong(user.long);
    setCanYmed(user.canYmed);
    setProtectionTab(user.protectionTab === 'Si' ? true : false);
    setMarYModTab(user.marYModTab);
    setTenNomTab(user.tenNomTab);
    setCorrNomTab(user.corrNomTab);
    setICCTab(user.ICCTab);
    setNoPolTab(user.noPolTab);
    setFormaRegistro(user.formaRegistro);
    setBarrasNeutros(user.barrasNeutros === 'Si' ? true : false);
    setPuenteUnion(user.puenteUnion === 'Si' ? true : false);
    setBarraTierra(user.barraTierra === 'Si' ? true : false);
    const cargaData = user.cargas.map(carga => ({
      nombreCar: carga.nombreCar,
      icc: carga.icc,
      noFasesCal: carga.noFasesCal,
      noNeutrosCal: carga.noNeutrosCal,
      noTierrasCal: carga.noTierrasCal,
      canal: carga.canal,
      longuitud: carga.longuitud,
      val1In: carga.val1In,
      val2In: carga.val2In,
    }));
    setCargas(cargaData);

  }, []);

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

  async function actualizarTD() {
    setLoading(true);
    try {

      const TDData = {
        id,
        name,
        nameTablero,
        idTDTab,
        protectionFuen,
        marYMod,
        tenNom,
        corrNom,
        ICC,
        noPol,
        date,
        noCabFas,
        calCabFas,
        matCabFas,
        noCabNeu,
        calCabNeu,
        matCabNeu,
        noCabTie,
        calCabTie,
        matCabTie,
        long,
        canYmed,
        protectionTab,
        marYModTab,
        tenNomTab,
        corrNomTab,
        ICCTab,
        noPolTab,
        nombreCarga,
        barraTierra,
        puenteUnion,
        barrasNeutros,
        cargas,
        date,
        creatorUser,
        userWhoEdited
      };

      const confirm = await updateTD(TDData);

      if (confirm.success) {
        Alert.alert("Actualización exitosa", "Se ha actualizado el registro correctamente");
        navigation.goBack();
      } else {
        Alert.alert("Error de actualización", confirm.message);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      setErrorMessage(error.message);
      Alert.alert("Error de actualización", error.message);
    }

  }


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
          />

          <Text style={styles.tableHeader}>/N:</Text>
          <TextInput
            onChangeText={setNoNeutrosCal}
            style={[styles.tableInput, styles.flex1]}
            value={noNeutrosCal}
          />

          <Text style={styles.tableHeader}>/T:</Text>
          <TextInput
            onChangeText={setNoTierrasCal}
            style={[styles.tableInput, styles.flex1]}
            value={noTierrasCal}
          />
          <Text style={styles.tableHeader}>/C:</Text>
          <TextInput
            onChangeText={setCanal}
            style={[styles.tableInput, styles.flex1]}
            value={canal}
          />
          <Text style={styles.tableHeader}>/L:</Text>
          <TextInput
            style={[styles.tableInput, styles.flex1]}
            onChangeText={setLonguitud}
            value={longuitud}
          />
        </View>

      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={agregarCarga}
      >
        <Text style={styles.buttonText}>Agregar Carga</Text>
      </TouchableOpacity>

      <View>
        <SectionList
          sections={[{ title: 'Cargas', data: paginatedCargas }]}
          renderItem={({ item, index }) => (
            <View style={styles.tableContainer}>
              <View style={styles.tableRow}>
                <TextInput
                  style={[styles.input, styles.flex1]}
                  value={item.nombreCar}
                  onChangeText={(text) => editarCarga(text, 'nombreCar', index)}
                />
                <Text>Icc: {item.icc}</Text>
                <TouchableOpacity onPress={() => eliminarCarga(index)} style={styles.button}>
                  <Text style={styles.eliminarButtonText}>X</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.tableRow}>
                <TextInput
                  style={[styles.input, styles.flex1]}
                  value={item.noFasesCal}
                  onChangeText={(text) => editarCarga(text, 'noFasesCal', index)}
                />
                <TextInput
                  style={[styles.input, styles.flex1]}
                  value={item.noNeutrosCal}
                  onChangeText={(text) => editarCarga(text, 'noNeutrosCal', index)}
                />
                <TextInput
                  style={[styles.input, styles.flex1]}
                  value={item.noTierrasCal}
                  onChangeText={(text) => editarCarga(text, 'noTierrasCal', index)}
                />
                <TextInput
                  style={[styles.input, styles.flex1]}
                  value={item.canal}
                  onChangeText={(text) => editarCarga(text, 'canal', index)}
                />
                <TextInput
                  style={[styles.input, styles.flex1]}
                  value={item.longuitud}
                  onChangeText={(text) => editarCarga(text, 'longuitud', index)}
                />
              </View>
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
          ListFooterComponent={() => (
            <>
              <Text>Total de cargas: {cargas.length}</Text>
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onNextPage={handleNextPage}
                onPrevPage={handlePrevPage}
              />
            </>
          )}
        />

      </View>


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
              actualizarTD();
            }
          }}
        >
          <Text style={styles.buttonText}>Guardar</Text>
        </TouchableOpacity>
      )}
    </ScrollView>
  );
};

export default EditTDView;
