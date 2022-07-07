import { createContext, useState } from "react";
import api from "../services/api";
import { login } from "../services/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AuthContext = createContext({});

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const signIn = async () => {
    const { user, token } = await login();

    if (user && token) {
      setUser(user);
      api.defaults.headers["Authorization"] = `Bearer ${token}`;
      await AsyncStorage.setItem("@Admin:user", JSON.stringify(user));
      await AsyncStorage.setItem("@Admin:token", token);
    }
    setLoading(false)
  };

  return (
    <AuthContext.Provider
      value={{ user, setUser, signIn, loading, setLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;