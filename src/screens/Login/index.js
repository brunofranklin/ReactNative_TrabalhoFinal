import { View, Text, Image, TextInput, TouchableOpacity, ActivityIndicator, Alert } from "react-native";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import styles from '../Login/styles'
import { login } from "../../services/auth";

const Login = () => {

  const { signIn, loading, setLoading } = useContext(AuthContext)

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const verificaLogin = async () => {
    setLoading(true)
    const { user } = await login();
    if (user.email !== email || user.pass !== senha) {
      setLoading(false)
      return Alert.alert("Email ou senha incorretos")
    }
    signIn();
  }

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", backgroundColor: "#181818" }}>
        <ActivityIndicator size="large" color={'#FF5500'} />
      </View>
    )
  }

  return (
    <>
      <View style={styles.container}>
        <View style={styles.containerLogo}>
          <Image source={require('../../../assets/logoCarrotech.png')} style={{ width: 300, height: 50, marginBottom: 25 }} />
          <TextInput
            style={styles.input}
            placeholder="Email"
            keyboardType="email-address"
            textContentType="emailAddress"
            autoCapitalize="none"
            autoCompleteType="email"
            autoCorrect={false}
            value={email}
            onChangeText={setEmail}
          />

          <TextInput
            style={styles.input}
            placeholder="Senha"
            //keyboardType="visible-password"
            textContentType="password"
            autoCapitalize="none"
            autoCompleteType="password"
            autoCorrect={false}
            secureTextEntry={true}
            value={senha}
            onChangeText={setSenha}
          />

          <TouchableOpacity onPress={verificaLogin} style={styles.buttonSubmit}>
            <Text style={styles.submitText}>Acessar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

export default Login;
