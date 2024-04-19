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

const ListaUsuariosStack = () => (
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
      options={{
        title: false,
      }} />
  </Stack.Navigator>
);


const ListaTDStack = () => (
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
      options={{
        title: false,
      }} />
  </ListTD.Navigator>
);
const ListaTGDStack = () => (
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
      options={{
        title: false,
      }} />
  </ListTGD.Navigator>
);
const ListaCCMStack = () => (
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
      options={{
        title: false,
      }} />
  </ListCCM.Navigator>
);

const TabNavigator = ({ userRole }) => (
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
    {(userRole === 'Administrador' || userRole === 'Editor') && (
      <Tab.Screen
        name="Registro"
        component={RegistrarUser}
        initialParams={{ userRole: userRole }} // Pasa userRole como parámetro inicial
        options={{
          tabBarLabel: 'Registro',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" size={24} color={color} />
          ),
          headerShown: false,
        }}
      />
    )}

    {(userRole === 'Administrador' || userRole === 'Editor' || userRole === 'General') && (
      <>
        <Tab.Screen
          name="SaveTD"
          component={SaveTDView}
          options={{
            tabBarLabel: 'Guardar TD',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="content-save" size={24} color={color} />
            ),
            headerShown: false,
          }}
        />
        <Tab.Screen
          name="SaveCCM"
          component={SaveCCMView}
          options={{
            tabBarLabel: 'Guardar CCM',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="content-save" size={24} color={color} />
            ),
            headerShown: false,
          }}
        />
        <Tab.Screen
          name="SaveTGD"
          component={SaveTGDView}
          options={{
            tabBarLabel: 'Guardar TGD',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="content-save" size={24} color={color} />
            ),
            headerShown: false,
          }}
        />
      </>
    )}

    {(userRole === 'Administrador' || userRole === 'Editor') && (
      <>
        <Tab.Screen
          name="ListRegistrosTD"
          component={ListaTDStack}
          options={{
            tabBarLabel: 'TD',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="clipboard-list" size={24} color={color} />
            ),
            headerShown: false,
          }}
        />
        <Tab.Screen
          name="ListRegistrosTGD"
          component={ListaTGDStack}
          options={{
            tabBarLabel: 'TGD',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="clipboard-list" size={24} color={color} />
            ),
            headerShown: false,
          }}
        />
        <Tab.Screen
          name="ListRegistrosCCM"
          component={ListaCCMStack}
          options={{
            tabBarLabel: 'CCM',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="clipboard-list" size={24} color={color} />
            ),
            headerShown: false,
          }}
        />
        {(userRole === 'Administrador' || userRole === 'Editor') && (
          <Tab.Screen
            name="ListUsuarios"
            component={ListaUsuariosStack}
            options={{
              tabBarLabel: 'Usuarios',
              tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons name="clipboard-list" size={24} color={color} />
              ),
              headerShown: false,
            }}
          />
        )}
      </>
    )}
  </Tab.Navigator>
);





export default TabNavigator;