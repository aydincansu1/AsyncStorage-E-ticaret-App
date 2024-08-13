import React, {useEffect, useState} from 'react';
import {View, ScrollView, StyleSheet, StatusBar} from 'react-native';
import {Colors} from '../themes/Colors';
import Header from '../components/Header';
import ProductCard from '../components/ProductCard';
import {Items} from '../database/Database';
import ProductHeader from '../components/ProductHeader';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [accesory, setAccesory] = useState([]);

  useEffect(() => {
    getDataFormDB();
  }, []);

  const getDataFormDB = () => {
    let productList = [];
    let accesoryList = [];

    for (let index = 0; index < Items.length; index++) {
      if (Items[index].category === 'product') {
        productList.push(Items[index]);
      } else {
        accesoryList.push(Items[index]);
      }
    }

    setProducts(productList);
    setAccesory(accesoryList);
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={Colors.white} barStyle={'dark-content'} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Header />
        <ProductHeader title={'Product'} count={20} />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            flexWrap: 'wrap',
            gap: 5,
          }}>
          {products.map(data => (
            <ProductCard key={data.id} data={data} />
          ))}
        </View>
        <ProductHeader title={'Accessories'} count={35} />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            flexWrap: 'wrap',
            gap: 5,
          }}>
          {accesory.map(data => (
            <ProductCard data={data} key={data.id} />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    width: '100%',
    height: '100%',
    padding: 16,
  },
});
