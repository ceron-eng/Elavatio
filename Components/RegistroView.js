import React, { useState } from "react";
import { Text, View, TextInput, TouchableOpacity, Modal, ActivityIndicator, Alert } from "react-native";
import { registerUser } from '../Services/ServiceUsers';
import { validatePassword } from '../Filters/validatePassword';
import { styles } from '../Styles/RegistroStyles';

const Registro = ({ route  }) => {
    const { userRole } = route.params;
    const [name, setname] = useState("");
    const [lastName, setlastName] = useState("");
    const [lastName2, setlastName2] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [rol, setRol] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    async function registrarUsuario() {
        if (username && password && rol) {
            var  validPassword = validatePassword(password);
            // Validar la contraseña
            if (validPassword.score <= 2) {
                console.log(password);
                Alert.alert("Contraseña no válida", "La contraseña debe tener al menos 8 caracteres y contener al menos una letra mayúscula, una letra minúscula, un número y un caracter especial(@,#...) .");
                return;
            }

            setLoading(true);
            try {
                const infoUsuario = await registerUser(name, lastName, lastName2, username, password, rol);
                if (infoUsuario.success) {
                    Alert.alert("Registro exitoso", "Se ha registrado el usuario correctamente");

                    setShowModal(false);
                    setname("");
                    setlastName("");
                    setlastName2("");
                    setUsername("");
                    setPassword("");
                    setRol("");
                    setLoading(false);
                } else {
                    Alert.alert("Error de registro", infoUsuario.message);
                    setLoading(false);
                }
            } catch (error) {
                setLoading(false);
                setErrorMessage(error.message);
                Alert.alert("Error de registro", error.message);
            }
        } else {
            Alert.alert("Error", "Ingresa todos los campos");
        }
        setLoading(false);
    }

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Nombre"
                value={name}
                onChangeText={(text) => setname(text)}
            />
            <TextInput
                style={styles.input}
                placeholder="Apellido P"
                value={lastName}
                onChangeText={(text) => setlastName(text)}
            />
            <TextInput
                style={styles.input}
                placeholder="Apellido M"
                value={lastName2}
                onChangeText={(text) => setlastName2(text)}
            />
            <TextInput
                style={styles.input}
                placeholder="Username"
                value={username}
                onChangeText={(text) => setUsername(text)}
            />
            <TextInput
                style={styles.input}
                placeholder="Contraseña"
                value={password}
                onChangeText={(text) => setPassword(text)}
                secureTextEntry
            />
            {/* Si el usuario es administrador, puede seleccionar cualquier rol */}
            {userRole === 'Administrador' && (
                <TouchableOpacity
                    style={styles.input}
                    onPress={() => setShowModal(true)}
                >
                    <Text>{rol ? rol : "Selecciona un rol"}</Text>
                </TouchableOpacity>
            )}
            {/* Si el usuario es editor, solo puede seleccionar el rol General */}
            {userRole === 'Editor' && (
                 <TouchableOpacity
                 style={[styles.input, rol === 'General' && styles.selectedRol]}
                 onPress={() => setRol("General")}
             >
                 <Text>{rol ? rol : "General"}</Text>
             </TouchableOpacity>    
            )}
            {loading ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : (
                <TouchableOpacity
                    style={styles.button}
                    onPress={registrarUsuario}
                >
                    <Text style={styles.buttonText}>Registrar</Text>
                </TouchableOpacity>
            )}

            <Modal
                visible={showModal}
                transparent={true}
                animationType="slide"
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <TouchableOpacity
                            style={styles.option}
                            onPress={() => {
                                setRol("Administrador");
                                setShowModal(false);
                            }}
                        >
                            <Text>Administrador</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.option}
                            onPress={() => {
                                setRol("Editor");
                                setShowModal(false);
                            }}
                        >
                            <Text>Editor</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.option}
                            onPress={() => {
                                setRol("General");
                                setShowModal(false);
                            }}
                        >
                            <Text>General</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.option}
                            onPress={() => setShowModal(false)}
                        >
                            <Text>Cancelar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

export default Registro;
