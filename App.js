import "react-native-gesture-handler";
import React from "react";
import { StatusBar } from "react-native";
import AuthProvider from "./src/context/AuthContext";
import Routes from "./src/Routes";
import ApiProvider from "./src/context/ApiContext";

const App = () => {
  return (
    <AuthProvider>
      <ApiProvider>
        <StatusBar />
        <Routes />
      </ApiProvider>
    </AuthProvider>
  );
};

export default App;
