import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Menu from './Menu';

const Stack = createStackNavigator();

const AppNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen 
    name="Menu" 
    component={Menu}
    options={{
      headerShown : false,
      cardStyle : {paddingTop : 50, paddingHorizontal : 15}
     }}
    />
  </Stack.Navigator>
);

export default AppNavigator;