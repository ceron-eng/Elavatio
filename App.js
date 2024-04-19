import React, { useState } from 'react';
import { StyleSheet, View, Button  } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import AppNavigator from "./Components/AppNavigator";
import { loginUser } from "./Services/ServiceUsers";
import LoginScreen from "./Components/LoginView";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(null); 

  const handleLogin = async (username, password) => {
    try {
      const result = await loginUser(username, password);
      if (result.success) {
        // Si el inicio de sesión es exitoso, establece el estado de isLoggedIn en true
        setIsLoggedIn(true);
        setUserRole(result.userRole);
      } else {
        // Si el inicio de sesión falla, muestra un mensaje de error o maneja la lógica según sea necesario
        console.error(result.message);
      }
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      // Maneja el error de inicio de sesión
    }
  };
  const handleLogout = () => {
    setIsLoggedIn(false);
  };
  return (
    <NavigationContainer>
      <View style={styles.container}>
        {isLoggedIn ? (
          <>
            <AppNavigator userRole={userRole} /> 
            <Button title="Cerrar sesión" onPress={handleLogout} />
          </>
        )
          : (
            <LoginScreen handleLogin={handleLogin} />
          )}
      </View>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default App;
