import * as React from 'react';
import { TextInput, View, StyleSheet, Modal, Image, Pressable, Text, Alert } from 'react-native';
import api from '../../services/api';
import SelectDropdown from 'react-native-select-dropdown';
import { ApiContext } from '../../context/ApiContext';

const UpdateProduto = (props) => {

    const { categorias, getCategoria } = React.useContext(ApiContext)

    const [categoria, setCategoria] = React.useState('');
    const [nomeProduto, setNomeProduto] = React.useState('');
    const [valor, setValor] = React.useState('');
    const [foto, setFoto] = React.useState('');
    const [id, setId] = React.useState(props.id);
    const [produto, setProduto] = React.useState([]);

    //MODAL---
    const [modalVisible, setModalVisible] = React.useState(false);
    //--------

    const salvarProduto = async () => {
        if (nomeProduto === "" || valor === "" || foto === "" || categoria === "") {
            return Alert.alert('Existem campos inválidos')
        }
        if(isNaN(valor.replace(/,/g,'.'))){
            return Alert.alert('O valor do produto não está em formato válido');
        }

        const produtoData = {
            id: id,
            nome: nomeProduto,
            valorUnitario: valor.replace(/,/g,'.'),
            categoria: categoria,
            foto: foto
        }

        const { data } = await api.put(`/produtos/${props.id}`, produtoData)

        const produtoEditado = produto.map(produto => {
            if (produto.id === data.id) {
                return {
                    id: produto.id, ...produtoData
                }
            }
            return produto
        })

        setProduto(produtoEditado)

        alert("Produto atualizado com sucesso")
        props.navigation.goBack('Home')
    }

    React.useEffect(() => {
        getCategoria()
        setId(props.id);
        setNomeProduto(props.nome);
        setValor(props.valor);
        setFoto(props.foto);
    }, []);


    return (
        <View style={styles.centeredView}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        
                        <Text style={styles.modalText}>
                            Atualizar Produto
                        </Text>
                        
                        <View style={{ height: 250, width: 250, backgroundColor: 'white' }}>
                            <Image 
                                source={foto ? { uri: foto } : require('../../../assets/foto-placeholder.png')} 
                                style={{ height: 250, width: 250 }} 
                            />
                        </View>
                        <TextInput defaultValue={props.nome}
                            onChangeText={setNomeProduto}
                            maxLength={40}
                            style={styles.inputs}
                        >
                        </TextInput>
                        <TextInput
                            style={styles.inputs}
                            defaultValue={valor.toString()}
                            onChangeText={setValor}
                            keyboardType='numeric'
                        >
                        </TextInput>
                        <TextInput defaultValue={props.foto}
                            onChangeText={setFoto}
                            style={styles.inputs}
                        >
                        </TextInput>
                        <SelectDropdown
                            buttonStyle={{ height: 35, width: 300, backgroundColor: '#FF5500', borderRadius: 5 }}
                            buttonTextStyle={{ color: '#ffff' }}
                            defaultValue={categoria}
                            defaultButtonText="Categoria ⏬"
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
                        <View style={{ flex: 1, flexDirection: 'row' }}>
                            <Pressable
                                style={[styles.button, styles.buttonSalvar]}
                                onPress={salvarProduto}
                            >
                                <Text style={styles.textStyle}>Salvar</Text>
                            </Pressable>
                            <Pressable
                                style={[styles.button, styles.buttonCancelar]}
                                onPress={() => setModalVisible(!modalVisible)}
                            >
                                <Text style={styles.textStyle}>Cancelar</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </Modal>
            <Pressable
                style={[styles.button, styles.buttonOpen]}
                onPress={() => setModalVisible(true)}
            >
                <Text style={styles.textStyle}>Atualizar</Text>
            </Pressable>
        </View>
    )
}

export default UpdateProduto;

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 25,
    },
    modalView: {
        marginBottom: 35,
        backgroundColor: "#282828",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    button: {
        borderRadius: 10,
        padding: 10,
        elevation: 2,
    },
    buttonOpen: {
        width: "100%",
        backgroundColor: "#FF5500",
        height: 50,
    },
    buttonSalvar: {
        marginTop: 10,
        width: 150,
        height: 50,
        backgroundColor: "#93D346",
    },
    buttonCancelar: {
        marginLeft: 5,
        marginTop: 10,
        width: 150,
        height: 50,
        backgroundColor: "#FF0000",
    },
    textStyle: {
        padding: 5,
        color: "white",
        fontWeight: "bold",
        alignSelf: 'center'
    },
    modalText: {
        fontSize: 20,
        letterSpacing: 2,
        color: 'white',
        marginBottom: 15,
        textAlign: "center"
    },
    inputs: {
        width: 300,
        padding: 5,
        backgroundColor: 'white',
        borderTopColor: 'black',
        borderTopWidth: 1,
        margin: 3
    },
});