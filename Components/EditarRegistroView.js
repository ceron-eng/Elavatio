import { updateUser } from '../Services/ServiceUsers';
import { validatePassword } from '../Filters/validatePassword';
import React, { useState } from "react";
import { useIsFocused } from '@react-navigation/native';
import { Text, View, TextInput, TouchableOpacity, Modal, ActivityIndicator, Alert } from "react-native";
import { styles } from '../Styles/RegistroStyles';

const EditarUsuario = ({ route, navigation }) => {
    const { user } = route.params;
    const isFocused = useIsFocused();
    const [id] = useState(user.id);
    const [newName, setNewName] = useState(user.Name);
    const [newLastName, setNewLastName] = useState(user.LastName);
    const [newLastName2, setNewLastName2] = useState(user.LastName2);
    const [newUsername, setNewUsername] = useState(user.Username);
    const [newPassword, setNewPassword] = useState(null);
    const [newPasswordC, setNewPasswordC] = useState(null);
    const [newRol, setNewRol] = useState(user.Rol);
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");



    async function actualizarUsuario() {
        if (newUsername && newPassword && newRol) {
            var validPassword = validatePassword(newPassword);
            // Validar la contraseña
            if (validPassword.score <= 2) {
                Alert.alert("Contraseña no válida", "La contraseña debe tener al menos 8 caracteres y contener al menos una letra mayúscula, una letra minúscula, un número y un caracter especial(@,#...) .");
                return;
            }

            if (newPassword !== newPasswordC) {
                Alert.alert("Contraseñas difrentes", "Las contraseñas no coinciden");
                return;
            }
            setLoading(true);
            try {

                const userData = {
                    id: id,
                    Name: newName,
                    LastName: newLastName,
                    LastName2: newLastName2,
                    Username: newUsername,
                    Password: newPassword,
                    Rol: newRol
                };
                const infoUsuario = await updateUser(userData);

                if (infoUsuario.success) {
                    Alert.alert("Actualización exitosa", "Se ha actualizado el usuario correctamente");
                    navigation.goBack();
                } else {
                    Alert.alert("Error de actualización", infoUsuario.message);
                    setLoading(false);
                }
            } catch (error) {
                setLoading(false);
                setErrorMessage(error.message);
                Alert.alert("Error de actualización", error.message);
            }
        } else {
            Alert.alert("Error", "Ingresa todos los campos");
        }
        setLoading(false);
    }

    return (
        isFocused && (
            <View style={styles.container}>
                <TextInput
                    style={styles.input}
                    placeholder="Cambia el Nombre"
                    value={newName}
                    onChangeText={(text) => setNewName(text)}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Cambia el Apellido P"
                    value={newLastName}
                    onChangeText={(text) => setNewLastName(text)}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Cambia el Apellido M"
                    value={newLastName2}
                    onChangeText={(text) => setNewLastName2(text)}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Cambia el Username"
                    value={newUsername}
                    onChangeText={(text) => setNewUsername(text)}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Nueva Contraseña"
                    value={newPassword}
                    onChangeText={(text) => setNewPassword(text)}
                    secureTextEntry
                />
                <TextInput
                    style={styles.input}
                    placeholder="Confirma Contraseña"
                    value={newPasswordC}
                    onChangeText={(text) => setNewPasswordC(text)}
                    secureTextEntry
                />
                <TouchableOpacity
                    style={styles.input}
                    onPress={() => setShowModal(true)}
                >
                    <Text>{newRol ? newRol : "Selecciona un rol"}</Text>
                </TouchableOpacity>
                {loading ? (
                    <ActivityIndicator size="large" color="#0000ff" />
                ) : (
                    <TouchableOpacity
                        style={styles.button}
                        onPress={actualizarUsuario}
                    >
                        <Text style={styles.buttonText}>Actualizar</Text>
                    </TouchableOpacity>
                )}

                <Modal
                    visible={showModal}
                    transparent={true}
                    animationType="slide"
                >
                    <View style={styles.modalContainer}>
                        <View style={styles.modalContent}><TouchableOpacity
                            style={styles.option}
                            onPress={() => {
                                setNewRol("Administrador");
                                setShowModal(false);
                            }}
                        >
                            <Text>Administrador</Text>
                        </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.option}
                                onPress={() => {
                                    setNewRol("Editor");
                                    setShowModal(false);
                                }}
                            >
                                <Text>Editor</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.option}
                                onPress={() => {
                                    setNewRol("General");
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
        )
    );
};

export default EditarUsuario;
