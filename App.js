import React from 'react';
import {styles} from './Styles/AppStyle'
import { NavigationContainer } from "@react-navigation/native";
import AppNavigator from "./Components/AppNavigator";

function App() {
  return (
    <NavigationContainer style={styles.container}>
    <AppNavigator />
  </NavigationContainer>
  );
}

export default App;