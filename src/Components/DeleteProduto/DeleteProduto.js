import * as React from 'react';
import { View, StyleSheet, Modal, Pressable, Text } from 'react-native';
import api from '../../services/api';



const DeleteProduto = (props) => {

    const [produto, setProduto] = React.useState([]);

    //MODAL---
    const [modalVisible, setModalVisible] = React.useState(false);
    //--------

    const deletarProduto = async () => {
        const { data: produtoExcluido } = await api.delete(`/produtos/${props.id}`)
        const produtosFiltrados = produto.filter(prod => prod.id !== produtoExcluido.id)
        setProduto(produtosFiltrados);

        alert("Produto deletado com sucesso!")
        props.navigation.goBack('Home')
    }

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

                        <Text style={{ color: 'white', fontSize: 16, marginBottom: 10 }}>
                            Deseja deletar {props.nome}?
                        </Text>
                        <View>
                            <Text style={{ color: 'white', fontSize: 16, marginBottom: 10 }}>
                                (Essa ação não poderá ser revertida!)
                            </Text>
                        </View>

                        <View style={{ flexDirection: 'row' }}>
                            <Pressable
                                style={[styles.button, styles.buttonDeletar, { flex: 1 }]}
                                onPress={deletarProduto}
                            >
                                <Text style={styles.textStyle}>SIM</Text>
                            </Pressable>
                            <Pressable
                                style={[styles.button, styles.buttonClose, { flex: 1 }]}
                                onPress={() => setModalVisible(!modalVisible)}
                            >
                                <Text style={styles.textStyle}>NÃO</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </Modal>
            <Pressable style={[styles.button, styles.buttonOpen]} onPress={() => setModalVisible(true)}>
                <Text style={styles.textStyle}>Deletar</Text>
            </Pressable>
        </View>
    )
}

export default DeleteProduto;

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 15,
    },
    modalView: {
        margin: 20,
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
        marginBottom: 25
    },
    buttonClose: {
        marginLeft: 5,
        backgroundColor: "#FF0000",
    },
    buttonDeletar: {
        backgroundColor: "#93D346",
    },
    textStyle: {
        padding: 5,
        color: "white",
        fontWeight: "bold",
        alignSelf: 'center'
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    },
});