import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { MaterialCommunityIcons } from '@expo/vector-icons';
// Import your screen components here
import SaveTDView from './SaveTDView';
import SaveCCMView from './SaveCCMView';
import SaveTGDView from './SaveTGDView';
import ListGeneralView from './ListGeneralView';
import Login from './LoginView';
import RegistrarUser from './RegistroView';
import ListaUsuarios from './ListUserView';
import EditarRegistroView from './EditarRegistroView';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const ListaUsuariosStack = () => (
  <Stack.Navigator
  options={{
    headerShown : false,
   }}
  >
    <Stack.Screen name="ListaUser"
     component={ListaUsuarios} 
     options={{
      headerShown : false,
     }}/>
    <Stack.Screen name="EditarRegistro" 
    component={EditarRegistroView} 
    options={{
      title : false,
     }}/>
  </Stack.Navigator>
);


const TabNavigator = () => (
  <Tab.Navigator
    initialRouteName="Login"
    screenOptions={{
      tabBarActiveTintColor: 'purple',
    }}
  >
    <Tab.Screen
      name="Login"
      component={Login}
      options={{
        tabBarLabel: 'Login',
        tabBarIcon: ({ color, size }) => {
          return (
            <MaterialCommunityIcons name="login" size={24} color="black" />
          )},
          headerShown :false,
      }} />
    <Tab.Screen 
    name="Registro" 
    component={RegistrarUser} 
    options={{
      tabBarLabel: 'Registro',
      tabBarIcon: ({ color, size }) => {
        return (
          <MaterialCommunityIcons name="account" size={24} color="black" />
        )},
        headerShown :false,
    }}/>
    <Tab.Screen 
    name="SaveTD" 
    component={SaveTDView} 
    options={{
      tabBarLabel: 'Guardar TD',
      tabBarIcon: ({ color, size }) => {
        return (
          <MaterialCommunityIcons name="content-save" size={24} color="black" />
        )},
        headerShown :false,
    }}/>
    <Tab.Screen 
    name="SaveCCM" 
    component={SaveCCMView}
    options={{
      tabBarLabel: 'Guardar CCM',
      tabBarIcon: ({ color, size }) => {
        return (
          <MaterialCommunityIcons name="content-save" size={24} color="black" />
        )},
        headerShown :false,
    }} />
    <Tab.Screen 
    name="SaveTGD" 
    component={SaveTGDView} 
    options={{
      tabBarLabel: 'Guardar TGD',
      tabBarIcon: ({ color, size }) => {
        return (
          <MaterialCommunityIcons name="content-save" size={24} color="black" />
        )},
        headerShown :false,
    }}/>
    <Tab.Screen 
    name="ListRegistros" 
    component={ListGeneralView} 
    options={{
      tabBarLabel: 'Registros',
      tabBarIcon: ({ color, size }) => {
        return (
          <MaterialCommunityIcons name="clipboard-list" size={24} color="black" />
        )},
        headerShown :false,
    }}/>
    <Tab.Screen 
    name="ListUsuarios" 
    component={ListaUsuariosStack}
    options={{
      tabBarLabel: 'Usuarios',
      tabBarIcon: ({ color, size }) => {
        return (
          <MaterialCommunityIcons name="clipboard-list" size={24} color="black" />
        )},
        headerShown :false,
    }} />
  </Tab.Navigator>
);




export default TabNavigator;