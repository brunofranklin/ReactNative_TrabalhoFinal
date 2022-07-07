import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../screens/Home";
import MyDrawer from "./Drawer";
import PageProduto from "../screens/Produto";

const Stack = createNativeStackNavigator();

const RotasPrivadas = () => {

  return (
    <Stack.Navigator screenOptions={{
      headerShown: true,
      title: 'Produto',
      headerStyle: { backgroundColor: "#FF5500" },
      headerTitleStyle: { color: 'white', fontSize: 26, letterSpacing: 3 }
    }}>
      <Stack.Screen
        name="Drawer"
        component={MyDrawer}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Home"
        component={Home}
        options={{ headerShown: true }}
      />
      <Stack.Screen
        name="PagProduto"
        component={PageProduto}
      />
    </Stack.Navigator>
  );
};

export default RotasPrivadas;
