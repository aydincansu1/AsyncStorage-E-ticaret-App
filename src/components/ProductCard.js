import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import React from 'react';
import {Colors} from '../themes/Colors';
import {useNavigation} from '@react-navigation/native';

export default function ProductCard({data}) {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={{width: '48%', marginVertical: 14}}
      onPress={() => navigation.navigate('ProductInfo', {productID: data.id})}>
      <View style={styles.cart}>
        {data.isOff && (
          <View style={styles.isOff}>
            <Text style={styles.textIsOff}>{data.offPercentage}%</Text>
          </View>
        )}
        <Image source={data.productImage} style={styles.cartImage} />
      </View>

      <Text style={styles.productText}>{data.productName}</Text>
      <Text style={styles.productPrice}> {data.productPrice} $</Text>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  cart: {
    backgroundColor: Colors.backgroundLight,
    position: 'relative',
    width: '100%',
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  isOff: {
    backgroundColor: Colors.green,
    position: 'absolute',
    width: '20%',
    height: '24%',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: 10,
    borderBottomRightRadius: 10,
    top: 0,
    left: 0,
  },
  textIsOff: {
    color: Colors.white,
    fontSixe: 12,
  },
  cartImage: {
    width: '80%',
    height: '80%',
    resizeMode: 'contain',
  },
  productText: {
    fontSize: 12,
    color: Colors.black,
    fontWeight: '600',
    marginVertical: 2,
  },
  productPrice: {
    fontSize: 14,
    opacity: 0.7,
  },
});
