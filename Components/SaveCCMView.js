import { View, TextInput, Text, ActivityIndicator, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { format } from 'date-fns';
import { useCCMModel } from '../ModelsViews/ModelViewAll'
import { styles } from '../Styles/SaveTDViewStyles';
const SaveCCMView = ({ route }) => {
    const { userName } = route.params;
    const {
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
    } = useCCMModel();
    const windowWidth = Dimensions.get('window').width;
    // Función para guardar los datos y redirigir al home
    const handleSaveAndRedirect = () => {
        handleSubmit(userName);
    };
    return (
        <ScrollView style={[styles.text, { width: windowWidth - 40 }]}>
            <Text style={styles.label}>Informacion General</Text>
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
                    value={idCMMTab}
                    onChangeText={setIdCMMTab}
                />
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.label}>CMM</Text>
                <TextInput
                    style={[styles.input, styles.inputFullWidth]}
                    value={CMM}
                    onChangeText={setCMM}
                />
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.label}>AREA CMM</Text>
                <TextInput
                    style={[styles.input, styles.inputFullWidth]}
                    value={areaCMM}
                    onChangeText={setAreCMM}
                />
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.label}>TD</Text>
                <TextInput
                    style={[styles.input, styles.inputFullWidth]}
                    value={TD}
                    onChangeText={setTD}
                />
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.label}>AREA TD</Text>
                <TextInput
                    style={[styles.input, styles.inputFullWidth]}
                    value={areTD}
                    onChangeText={setAreTD}
                />
            </View>

            <Text style={styles.label}>TABLA DE DATOS GENERALES</Text>
            <View style={styles.tableContainer}>
                <View style={styles.tableRow}>
                    <Text style={styles.tableHeader}>PROTECCION</Text>
                    <TextInput
                        style={[styles.tableInput, styles.flex1]}
                        value={prot1}
                        onChangeText={setProt1} />

                    <TextInput
                        style={[styles.tableInput, styles.flex1]}
                        value={prot2}
                        onChangeText={setProt2} />
                </View>
                <View style={styles.tableRow}>
                    <Text style={styles.tableHeader}>INTERRUPTOR</Text>
                    <TextInput
                        style={[styles.tableInput, styles.flex1]}
                        value={inte1}
                        onChangeText={setinte1} />
                    <TextInput
                        style={[styles.tableInput, styles.flex1]}
                        value={inte2}
                        onChangeText={setinte2} />
                </View>
                <View style={styles.tableRow}>
                    <Text style={styles.tableHeader}>TENSIÓN NOMINAL</Text>
                    <TextInput
                        style={[styles.tableInput, styles.flex1]}
                        keyboardType="numeric"
                        value={tens1}
                        onChangeText={setTens1}
                    />
                    <TextInput
                        style={[styles.tableInput, styles.flex1]}
                        keyboardType="numeric"
                        value={tens2}
                        onChangeText={setTens2}
                    />
                </View>
                <View style={styles.tableRow}>
                    <Text style={styles.tableHeader}>CORRIENTE NOMINAL</Text>
                    <TextInput
                        style={[styles.tableInput, styles.flex1]}
                        keyboardType="numeric"
                        value={corr1}
                        onChangeText={setCorr1}
                    />
                    <TextInput
                        style={[styles.tableInput, styles.flex1]}
                        keyboardType="numeric"
                        value={corr2}
                        onChangeText={setCorr2}
                    />
                </View>
                <View style={styles.tableRow}>
                    <Text style={styles.tableHeader}>ICC</Text>
                    <TextInput
                        style={[styles.tableInput, styles.flex1]}
                        keyboardType="numeric"
                        value={ICC1}
                        onChangeText={setICC1}
                    />
                    <TextInput
                        style={[styles.tableInput, styles.flex1]}
                        keyboardType="numeric"
                        value={ICC2}
                        onChangeText={setICC2}
                    />
                </View>
                <View style={styles.tableRow}>
                    <Text style={styles.tableHeader}>No. POLOS</Text>
                    <TextInput
                        style={[styles.tableInput, styles.flex1]}
                        keyboardType="numeric"
                        value={noPol1}
                        onChangeText={setNoPol1}
                    />
                    <TextInput
                        style={[styles.tableInput, styles.flex1]}
                        keyboardType="numeric"
                        value={noPol2}
                        onChangeText={setNoPol2}
                    />
                </View>
                <View style={styles.tableRow}>
                    <Text style={styles.tableHeader}>Fusibles</Text>
                    <TextInput
                        style={[styles.tableInput, styles.flex1]}
                        keyboardType="numeric"
                        value={fusi1}
                        onChangeText={setFusi1}
                    />
                    <TextInput
                        style={[styles.tableInput, styles.flex1]}
                        keyboardType="numeric"
                        value={fusi2}
                        onChangeText={setFusi2}
                    />
                </View>
            </View>

            <Text style={styles.label}>REGISTRATION DATE:</Text>
            <Text style={styles.inputFullWidth}>{format(date, 'yyyy-MM-dd HH:mm:ss')}</Text>

            {loading ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : (
                <TouchableOpacity
                    style={styles.button}
                    onPress={handleSaveAndRedirect}
                >
                    <Text style={styles.buttonText}>Guardar</Text>
                </TouchableOpacity>
            )}
        </ScrollView>
    );
};


export default SaveCCMView;