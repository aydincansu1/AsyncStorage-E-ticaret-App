import React from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';
import {Colors} from '../themes/Colors';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Cart({
  data,
  product,
  setProduct,
  getTotal,
  getDataFromDB, // Düzeltildi
}) {
  const navigation = useNavigation();
  //* Gönderilen idli elemanı asyncStorage dan sildik
  const removeItemFromCart = async id => {
    let itemsArray = await AsyncStorage.getItem('cartItems');
    itemsArray = JSON.parse(itemsArray);

    if (itemsArray) {
      let array = itemsArray.filter(item => item !== id);
      await AsyncStorage.setItem('cartItems', JSON.stringify(array));
      getDataFromDB();
    }
  };

  //* Gönderilen typea göre ve gönderilen idli ürünün miktarını arttırma ve azaltma
  const updateQuantity = (id, type) => {
    let updateProducts = product.map(item => {
      if (item.id === id) {
        let newQuantity =
          //* Gönderilen type increase ise arttırma işlemi gerçekleştir değilse azaltma işlemi gerçekleştir
          type === 'increase' ? item.quantity + 1 : item.quantity - 1;
        //* GÜncellenmiş miktar sıfırdan büyük ise güncellenmiş miktarı ata değilse 1 olarak kalsın

        item.quantity = newQuantity > 0 ? newQuantity : removeItemFromCart(id);
      }
      return item;
    });
    setProduct(updateProducts);
    getTotal(updateProducts);
  };
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('ProductInfo', {productID: data.id})}
      style={styles.container}>
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={data.productImage} />
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.productName}>{data.productName}</Text>
        <Text style={styles.productPrice}>{data.productPrice} $</Text>
        <View style={styles.actionsContainer}>
          <View style={styles.quantityContainer}>
            <TouchableOpacity
              onPress={() => updateQuantity(data.id, 'decrease')}>
              <MaterialCommunityIcons style={styles.countBtn} name="minus" />
            </TouchableOpacity>
            <Text style={styles.quantity}>{data.quantity}</Text>
            <TouchableOpacity
              onPress={() => updateQuantity(data.id, 'increase')}>
              <MaterialCommunityIcons style={styles.countBtn} name="plus" />
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            onPress={() => removeItemFromCart(data.id)}
            style={styles.deleteIcon}>
            <MaterialCommunityIcons
              name="delete-outline"
              size={20}
              color={Colors.backgroundDark}
            />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: Colors.backgroundLight,
  },
  imageContainer: {
    width: '30%',
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.backgroundLight,
    borderRadius: 10,
    marginRight: 22,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  infoContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  productName: {
    fontSize: 16,
    fontWeight: '500',
    flexWrap: 'wrap',
  },
  productPrice: {
    fontSize: 16,
    opacity: 0.6,
  },
  actionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  quantity: {
    color: Colors.backgroundDark,
  },
  deleteIcon: {
    padding: 10,
    borderRadius: 20,
    backgroundColor: Colors.backgroundLight,
  },
  countBtn: {
    padding: 10,
    borderWidth: 1,
    borderColor: Colors.backgroundLight,
    borderRadius: 10,
  },
});
