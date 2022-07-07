import React from "react";
import { View, StyleSheet, Linking, Image } from 'react-native';
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import ImagedCarouselCard from "react-native-imaged-carousel-card";

const Integrantes = () => {

    return (
        <View style={styles.container}>
            <View>
                <Image
                    style={styles.scanner}
                    source={require('../../../assets/logoCarrotech.png')}
                />
            </View>
            <View style={{ padding: 10 }}>
                <TouchableOpacity onPress={() => { Linking.openURL('https://github.com/brunofranklin') }}>
                    <ImagedCarouselCard style={{ padding: 10 }}
                        text={'BRUNO FRANKLIN'}
                        width={160}
                        height={160}
                        shadowColor="#051934"
                        source={require('../../../assets/bruno.png')} />
                </TouchableOpacity>
            </View>
            <View style={{ padding: 10 }}>
                <TouchableOpacity onPress={() => { Linking.openURL('https://github.com/BrenoCharles') }}>
                    <ImagedCarouselCard
                        text={'BRENO CHARLES'}
                        width={160}
                        height={160}
                        shadowColor="#051934"
                        source={require('../../../assets/breno.png')} />
                </TouchableOpacity>
            </View>
            <View style={{ padding: 10 }}>
                <TouchableOpacity onPress={() => { Linking.openURL('https://github.com/viniciusofc') }}>
                    <ImagedCarouselCard
                        text={'CARLOS EDUARDO'}
                        width={160}
                        height={160}
                        shadowColor="#051934"
                        source={require('../../../assets/carlos.png')} />
                </TouchableOpacity>
            </View>
            <View style={{ padding: 10 }}>
                <TouchableOpacity onPress={() => { Linking.openURL('https://github.com/diogopp04') }}>
                    <ImagedCarouselCard
                        text={'DIOGO PEREIRA'}
                        width={160}
                        height={160}
                        shadowColor="#051934"
                        source={require('../../../assets/diogo.png')} />
                </TouchableOpacity>
            </View>
            <View style={{ padding: 10 }}>
                <TouchableOpacity onPress={() => { Linking.openURL('https://github.com/Thiago-Marquet') }}>
                    <ImagedCarouselCard
                        text={'THIAGO MARQUET'}
                        width={160}
                        height={160}
                        shadowColor="#051934"
                        source={require('../../../assets/thiago.png')} />
                </TouchableOpacity>
            </View>
            <View style={{ padding: 10 }}>
                <TouchableOpacity onPress={() => { Linking.openURL('https://github.com/viniciusofc') }}>
                    <ImagedCarouselCard
                        text={'VINICIUS REIS'}
                        width={160}
                        height={160}
                        shadowColor="#051934"
                        source={require('../../../assets/vinicius.png')} />
                </TouchableOpacity>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        backgroundColor: "#181818",
        justifyContent: 'center'
    },
    container2: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        backgroundColor: "#ffff",
        justifyContent: 'center'
    },
    scanner: {
        width: 330,
        height: 55,
        resizeMode: 'center',
    },

});

export default Integrantes;