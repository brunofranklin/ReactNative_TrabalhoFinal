import { useIsFocused } from '@react-navigation/native';
import * as React from 'react';
import { SafeAreaView, FlatList, StyleSheet, TouchableOpacity, View, ActivityIndicator } from 'react-native';
import { ApiContext } from '../../context/ApiContext';
import ImagedCarouselCard from "react-native-imaged-carousel-card";

const Home = ({ navigation }) => {

  const { produto, getProduto } = React.useContext(ApiContext);
  const isFocused = useIsFocused();

  React.useEffect(() => {
    getProduto();
  }, [isFocused]);

  const Item = ({ nome, img, produto }) => (
    <View style={styles.item}>
      <TouchableOpacity onPress={() => navigation.navigate("PagProduto", {
        produto: produto
      })}>
        <ImagedCarouselCard
          text={nome}
          width={350}
          height={350}
          textStyle={{ color: 'white', fontSize: 20, marginLeft: 10, fontWeight: '900', letterSpacing: 2 }}
          overlayBackgroundColor='#FF5500'
          source={img ? { uri: img } : require('../../../assets/foto-placeholder.png')} />
      </TouchableOpacity>
    </View>
  );

  const renderItem = ({ item }) => (
    <>
      <Item produto={item} nome={item.nome} img={item.foto} categoria={item.categoria} valor={item.valorUnitario} />
    </>
  );

  return (
    <>
      <SafeAreaView style={styles.container}>
        {produto ?
          <FlatList
            data={produto}
            renderItem={renderItem}
          /> :
          <ActivityIndicator size={'large'} />
        }
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#181818',
  },
  item: {
    marginTop: 12.5,
    marginBottom: 12.5,
    marginLeft: 30,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});

export default Home;