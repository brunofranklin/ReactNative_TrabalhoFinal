import AsyncStorage from "@react-native-async-storage/async-storage";
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem, DrawerItemList } from "@react-navigation/drawer";
import React, { useContext } from "react";
import { Image } from 'react-native'
import { AuthContext } from "../context/AuthContext";
import CadastroProduto from "../screens/CadastroProduto";
import Home from "../screens/Home";
import Integrantes from "../screens/Integrantes";


const Drawer = createDrawerNavigator();

const MyDrawer = () => {

  const { setUser, setLoading } = useContext(AuthContext);

  const logoutHandler = () => {
    setLoading(true)
    setTimeout(() => {
      setUser('')
      setLoading(false)
    }, 2000);
  }

  return (
    <Drawer.Navigator screenOptions={{
      drawerStyle: { backgroundColor: '#181818', width: 240 },
      drawerActiveBackgroundColor: '#FF5500',
      drawerActiveTintColor: 'white',
      drawerInactiveTintColor: 'white',
      headerStyle: { backgroundColor: "#FF5500" },
      headerTitleStyle: { color: 'white', fontSize: 26, letterSpacing: 2 }
    }}

      drawerContent={(props) => {
        return (
          <DrawerContentScrollView {...props}>
            <DrawerItemList {...props} />
            <DrawerItem inactiveTintColor='white' label="Logout"
              icon={() => {
                return (<Image style={{ width: 20, height: 20, marginRight: -20 }}
                  source={require('../../assets/logout-icon.png')} />)
              }}

              onPress={
                () => {
                  AsyncStorage.removeItem('@Admin:user')
                  AsyncStorage.removeItem('@Admin:token')
                  logoutHandler()
                }}
            />
          </DrawerContentScrollView>
        )
      }}>
      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen name="Cadastrar Produto" component={CadastroProduto} />
      <Drawer.Screen name="Integrantes" component={Integrantes} />
    </Drawer.Navigator>
  );
};

export default MyDrawer;
