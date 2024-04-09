// Login.js
import React, { useState } from "react";
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Modal,
  ActivityIndicator,
  Alert,
} from "react-native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../Connection/firebase";
import { CheckPassword } from "../Filters/validatePassword";
import { styles } from "../Styles/LoginStyles";
import { storeData, getData } from "../Services/AsyncStorageUtil";

export default function Login({ navigation }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const login = async () => {
    if (!CheckPassword(password)) {
      return Alert.alert("Contraseña insegura", "La contraseña debe tener entre 7 y 14 caracteres y empezar por una letra.");
    }
    setLoading(true);

    const { userCredential, error } = await signInWithEmailAndPassword(auth, `${username}@example.com`, password);

    if (error) {
      Alert.alert("Error al iniciar sesión", error.message);
    } else {
      const { user } = userCredential;

      const userRoleRef = await user.getIdTokenResult();

      if (userRoleRef.claims.role === 'admin') {
        storeData('role', 'admin', 0.5);
        navigation.replace("RestrictedArea");
      } else if (userRoleRef.claims.role === 'editor') {
        storeData('role', 'editor', 0.5);
        navigation.replace("EditorArea");
      } else {
        Alert.alert("Error al iniciar sesión", "El usuario no tiene acceso.");
      }
    }

    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Correo electrónico:</Text>
      <TextInput
        style={styles.input}
        placeholder="email@example.com"
        value={username}
        onChangeText={setUsername}
      />

      <Text style={styles.label}>Contraseña:</Text>
      <TextInput
        style={styles.input}
        placeholder="********"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TouchableOpacity
        style={styles.button}
        disabled={loading}
        onPress={() => {
          Alert.alert("Función deshabilitada")
        }}
      >
        {loading ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Iniciar sesión</Text>
        )}
      </TouchableOpacity>

    </View>
  );
}

