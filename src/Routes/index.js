import { NavigationContainer } from "@react-navigation/native";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import RotasPrivadas from "./RotasPrivadas";
import RotasPublicas from "./RotasPublicas";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ActivityIndicator, View } from "react-native";
import { login } from "../services/auth";

const Routes = () => {
  const { user, setUser, loading, setLoading } = useContext(AuthContext);
  const [nome, setNome] = useState('');

  const setNomeUser = async () => {
    const { user } = await login();
    setNome(user.name)
  }

  useEffect(() => {
    setNomeUser()
    if (user) return;
    const handleRefresh = async () => {
      const userBd = await AsyncStorage.getItem("@Admin:user");
      await new Promise((resolve) => setTimeout(resolve, 2000));
      if (userBd) {
        setUser(JSON.parse(userBd));
      }
      setLoading(false);
    };
    handleRefresh();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: 'center', backgroundColor: "#181818" }}>
        <ActivityIndicator size="large" color={'#FF5500'} />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {!!user ? <RotasPrivadas /> : <RotasPublicas />}
    </NavigationContainer>
  );
};

export default Routes;
