import * as React from 'react'
import { ApiContext } from '../../context/ApiContext';
import api from "../../services/api";
import SelectDropdown from 'react-native-select-dropdown';
import { ScrollView,Image, Text, Alert, StyleSheet, TextInput, KeyboardAvoidingView, TouchableOpacity} from 'react-native';
import { useIsFocused } from '@react-navigation/native';

const CadastroProduto = ({navigation}) =>{

    const{categorias, getCategoria} = React.useContext(ApiContext)

    const [categoria, setCategoria] = React.useState('');
    const [nomeProduto, setNomeProduto] = React.useState('');
    const [valor, setValor] = React.useState('');
    const [foto, setFoto] = React.useState('');

    const isFocused = useIsFocused();

    const createProduto = async () => {
        if (nomeProduto === "" || valor === "" || foto === "" || categoria === "") {
            return Alert.alert('Existem campos inválidos')
        }
        if(isNaN(valor.replace(/,/g,'.'))){
            return Alert.alert('O valor do produto não está em formato válido');
        }
        const novoProduto = {
            nome: nomeProduto,
            valorUnitario: valor.replace(/,/g, '.'),
            categoria: categoria,
            foto: foto
        }
    
        await api.post('/produtos', novoProduto)

        alert("Produto cadastrado com sucesso");

        setNomeProduto('')
        setValor('')
        setFoto('')
        setCategoria('')

        navigation.goBack('Home')
    }

    React.useEffect(() => {
        getCategoria()
    }, [isFocused]);

    return(
        <KeyboardAvoidingView behavior="height" keyboardVerticalOffset={1}>
            <ScrollView style={styles.container}>
                
                <TextInput style={styles.inputs} placeholder='Nome do Produto' defaultValue={nomeProduto} 
                    onChangeText={setNomeProduto}
                />
                
                <TextInput style={styles.inputs} keyboardType='numeric' defaultValue={valor} 
                    onChangeText={setValor} placeholder='Valor do produto'
                />

                <SelectDropdown
                    buttonStyle={{ height: 30,
                        width: "92%", 
                        backgroundColor: '#FF5500', 
                        alignSelf: 'center', 
                        marginTop:15 ,
                        marginBottom: 15,
                        borderRadius: 5
                    }}
                    buttonTextStyle={{ color: '#ffff', letterSpacing: 2, fontSize: 20 }}
                    defaultValue={categoria}
                    defaultButtonText="Selecione Categoria 🔽"
                    data={categorias}
                    onSelect={(selectedItem) => {
                        setCategoria(selectedItem.nome)
                    }}
                    buttonTextAfterSelection={(selectedItem) => {
                        return selectedItem.nome
                    }}
                    rowTextForSelection={(item) => {
                        return item.nome
                    }}
                >
                </SelectDropdown>

                <Image source={foto ? {uri: foto} : require('../../../assets/foto-placeholder.png')} 
                    style={styles.foto} 
                />
                
                <TextInput style={styles.inputs} placeholder='Foto URL' defaultValue={foto} onChangeText={setFoto}/>
                
                <TouchableOpacity style={styles.button} title='Cadastrar' onPress={createProduto}>
                    <Text style={{fontSize: 24,letterSpacing: 2, color:'white'}}>Cadastrar</Text>
                </TouchableOpacity>
                </ScrollView>
        </KeyboardAvoidingView>
    )
}

export default CadastroProduto;

const styles = StyleSheet.create({
    container: {
        padding: 10,
        borderColor: 'black', 
        borderWidth: 2,
        height: "100%",
        backgroundColor: "#181818"
    },
    inputs: {
        padding: 10,
        backgroundColor: 'white',
        borderRadius: 10,
        marginTop:15,
        marginLeft:15,
        marginVertical: 8,
        marginHorizontal: 16,
    },
    foto: {
        height: 150, 
        width: 200, 
        marginLeft: 100,
        borderColor: '#FF5500',
        borderWidth: 2,
        borderRadius: 5
    },
    button:{
        borderRadius: 15,
        marginTop: 50,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FF5500',
        height: 50,
        width: "100%",
    }
  });