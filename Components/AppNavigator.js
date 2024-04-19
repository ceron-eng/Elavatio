import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Menu from './Menu';

const Stack = createStackNavigator();

const AppNavigator = ({ userRole }) => (
  <Stack.Navigator>
    <Stack.Screen 
      name="Menu" 
      options={{ headerShown: false }}
    >
      {props => <Menu {...props} userRole={userRole} />}
    </Stack.Screen>
  </Stack.Navigator>
);

export default AppNavigator;