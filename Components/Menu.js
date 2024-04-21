import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { MaterialCommunityIcons } from '@expo/vector-icons';
// Import your screen components here
import SaveTDView from './SaveTDView';
import SaveCCMView from './SaveCCMView';
import SaveTGDView from './SaveTGDView';
import RegistrarUser from './RegistroView';
import ListaUsuarios from './ListUserView';
import EditarRegistroView from './EditarRegistroView';
import ListTDview from './ListTDView';
import ListCCMview from './ListCCMView';
import ListTGDview from './ListTGDView';
import EditarTD from './EditarTDview';
import EditarCCM from './EditarCCMview';
import EditarTGD from './EditarTGDview';
import HomeScreen from './HomeScreen'

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const ListTD = createStackNavigator();
const ListTGD = createStackNavigator();
const ListCCM = createStackNavigator();


const ListaUsuariosStack = (userName) => {
  return(
    <Stack.Navigator
    options={{
      headerShown: false,
    }}
  >
    <Stack.Screen name="ListaUser"
      component={ListaUsuarios}
      options={{
        headerShown: false,
      }} />
    <Stack.Screen name="EditarRegistro"
      component={EditarRegistroView}
      initialParams={{ userName: userName }}
      options={{
        title: false,
      }} />
  </Stack.Navigator>
  );
};
const ListaTDStack = (userName) => {
  return (
    <ListTD.Navigator
      options={{
        headerShown: false,
      }}
    >
      <ListTD.Screen name="ListaTD"
        component={ListTDview}
        options={{
          headerShown: false,
        }} />
      <ListTD.Screen name="EditarRegistroTD"
        component={EditarTD}
        initialParams={{ userName: userName }}
        options={{
          title: false,
        }} />
    </ListTD.Navigator>
  );
};
const ListaTGDStack = (userName) => {
  return (
    <ListTGD.Navigator
      options={{
        headerShown: false,
      }}
    >
      <ListTGD.Screen name="ListaUser"
        component={ListTGDview}
        options={{
          headerShown: false,
        }} />
      <ListTGD.Screen name="EditarRegistroTGD"
        component={EditarTGD}
        initialParams={{ userName: userName }}
        options={{
          title: false,
        }} />
    </ListTGD.Navigator>);

};
const ListaCCMStack = (userName) => {
  return (
    <ListCCM.Navigator
      options={{
        headerShown: false,
      }}
    >
      <ListCCM.Screen name="ListaUser"
        component={ListCCMview}
        options={{
          headerShown: false,
        }} />
      <ListCCM.Screen name="EditarRegistroCCM"
        component={EditarCCM}
        initialParams={{ userName: userName }}
        options={{
          title: false,
        }} />
    </ListCCM.Navigator>
  );
};

const TabNavigator = ({ userName, userRole }) => {
  console.log(userName, userRole);

  const showRegistrationTab = () => {
    // Si el rol del usuario es 'admin', se muestra la pestaña de registro
    if (userRole === 'Administrador' || userRole === 'Editor') {
      return (
        <>
          <Tab.Screen
            name="Registro"
            component={RegistrarUser}
            initialParams={{ userRole: userRole, userName: userName }}
            options={{
              tabBarLabel: 'Registro',
              tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons name="account" size={24} color={color} />
              ),
              headerShown: false,
            }} />
          <Tab.Screen
            name="ListRegistrosTD"
            component={ListaTDStack}
            initialParams={{ userName: userName }}
            options={{
              tabBarLabel: 'TD',
              tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons name="clipboard-list" size={24} color={color} />
              ),
              headerShown: false,
            }} />
          <Tab.Screen
            name="ListRegistrosTGD"
            component={ListaTGDStack}
            initialParams={{ userName: userName }}
            options={{
              tabBarLabel: 'TGD',
              tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons name="clipboard-list" size={24} color={color} />
              ),
              headerShown: false,
            }} />
          <Tab.Screen
            name="ListRegistrosCCM"
            component={ListaCCMStack}
            initialParams={{ userName: userName }}
            options={{
              tabBarLabel: 'CCM',
              tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons name="clipboard-list" size={24} color={color} />
              ),
              headerShown: false,
            }} />
          <Tab.Screen
            name="ListUsuarios"
            component={ListaUsuariosStack}
            initialParams={{ userName: userName }}
            options={{
              tabBarLabel: 'Usuarios',
              tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons name="clipboard-list" size={24} color={color} />
              ),
              headerShown: false,
            }} />
        </>


      );
    } else if (userRole === 'Administrador' || userRole === 'Editor' || userRole === 'General') {

    }
    // Si el rol del usuario no es 'admin', no se muestra la pestaña de registro
    return null;
  };
  if (userName != null && userName != "" && userRole != null) {
    return (
      <Tab.Navigator
        initialRouteName="Home" // Nombre de la pantalla inicial
        screenOptions={{
          tabBarActiveTintColor: 'purple',
        }}
      >
        <Tab.Screen
          name="Home" // Nombre de la pantalla
          component={HomeScreen} // Componente asociado a esta pantalla
          options={{
            tabBarLabel: 'Home', // Texto que se mostrará en la pestaña
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="home" size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="SaveTD"
          initialParams={{ userName: userName }}
          component={SaveTDView}
          options={{
            tabBarLabel: 'TD',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="content-save" size={24} color={color} />
            ),
            headerShown: false,
          }}
        />
        <Tab.Screen
          name="SaveCCM"
          initialParams={{ userName: userName }}
          component={SaveCCMView}
          options={{
            tabBarLabel: 'CCM',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="content-save" size={24} color={color} />
            ),
            headerShown: false,
          }}
        />
        <Tab.Screen
          name="SaveTGD"
          initialParams={{ userName: userName }}
          component={SaveTGDView}
          options={{
            tabBarLabel: 'TGD',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="content-save" size={24} color={color} />
            ),
            headerShown: false,
          }}
        />
        {showRegistrationTab()}
      </Tab.Navigator>
    );
  } else {
    return null;
  }
}


export default TabNavigator;