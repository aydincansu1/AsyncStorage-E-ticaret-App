import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Items} from '../database/Database';
import {useNavigation} from '@react-navigation/native';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {Colors} from '../themes/Colors';
import Cart from '../components/Cart';

export default function MyCart() {
  const [product, setProduct] = useState([]);
  const [total, setTotal] = useState(0);
  const navigation = useNavigation();

  useEffect(() => {
    getDataFromDB();
  }, []);

  useEffect(() => {
    getTotal(product);
  }, [product]);

  const getDataFromDB = async () => {
    try {
      const items = JSON.parse(await AsyncStorage.getItem('cartItems')) || [];
      const productData = Items.filter(data => items.includes(data.id)).map(
        data => ({...data, quantity: 1}),
      );
      setProduct(productData);
    } catch (error) {
      console.error(error);
    }
  };

  const getTotal = productData => {
    const total = productData.reduce(
      (acc, item) => acc + item.productPrice * item.quantity,
      0,
    );
    setTotal(total);
  };

  const shippingTax = total / 20;
  const grandTotal = total + shippingTax;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}>
          <Entypo name="chevron-left" style={styles.icon} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Order Details</Text>
      </View>

      <Text style={styles.title}>My Cart</Text>

      <ScrollView style={styles.scrollView}>
        {product.map(data => (
          <Cart
            key={data.id}
            data={data}
            product={product}
            setProduct={setProduct}
            getDataFromDB={getDataFromDB}
            getTotal={getTotal}
          />
        ))}

        <View style={styles.deliverySection}>
          <Text style={styles.subtitle}>Delivery Location</Text>
          <View style={styles.infoRow}>
            <View style={styles.infoContainer}>
              <View style={styles.neuter}>
                <FontAwesome5 name="neuter" size={18} color={Colors.blue} />
              </View>

              <View style={styles.infoText}>
                <Text>Üsküdar Bulgurlu 212</Text>
                <Text>0162 Bulgirlu</Text>
              </View>
            </View>
            <Entypo name="chevron-right" style={styles.icon} />
          </View>
        </View>

        <View style={styles.paymentSection}>
          <Text style={styles.subtitle}>Payment Method</Text>
          <View style={styles.infoRow}>
            <View style={styles.infoContainer}>
              <Text style={styles.paymentMethod}>VISA</Text>
              <View style={styles.infoText}>
                <Text>VISA Classic</Text>
                <Text style={styles.cardDetails}>****-2121</Text>
              </View>
            </View>
            <Entypo name="chevron-right" style={styles.icon} />
          </View>
        </View>

        <View style={styles.orderInfo}>
          <Text style={styles.subtitle}>Order Info</Text>
          <View style={styles.infoList}>
            <InfoRow label="Subtotal" value={`${total} ₺`} />
            <InfoRow label="Shipping Tax" value={`${shippingTax} ₺`} />
            <InfoRow label="Total" value={`${grandTotal} ₺`} />
          </View>
        </View>
      </ScrollView>

      <TouchableOpacity style={styles.checkoutButton}>
        <Text style={styles.checkoutText}>CHECKOUT</Text>
      </TouchableOpacity>
    </View>
  );
}

const InfoRow = ({label, value}) => (
  <View style={styles.infoRow}>
    <Text style={styles.infoLabel}>{label}</Text>
    <Text style={styles.infoValue}>{value}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30,
  },
  backButton: {
    position: 'absolute',
    left: 0,
    borderRadius: 10,
    padding: 14,
    backgroundColor: Colors.backgroundLight,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginVertical: 20,
  },
  scrollView: {
    flex: 1,
  },
  deliverySection: {
    marginVertical: 20,
  },
  paymentSection: {
    marginVertical: 20,
  },
  orderInfo: {
    marginTop: 10,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '600',
    marginVertical: 20,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 5,
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  infoText: {
    marginLeft: 10,
  },
  paymentMethod: {
    borderRadius: 10,
    paddingVertical: 14,
    paddingHorizontal: 14,
    backgroundColor: Colors.backgroundLight,
    color: Colors.blue,
  },
  cardDetails: {
    opacity: 0.6,
    marginLeft: 10,
  },
  checkoutButton: {
    backgroundColor: Colors.blue,
    padding: 20,
    borderRadius: 25,
    width: '90%',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 20,
  },
  checkoutText: {
    color: Colors.white,
    fontSize: 15,
    fontWeight: '600',
  },
  icon: {
    fontSize: 18,
    color: Colors.backgroundDark,
  },
  infoLabel: {
    opacity: 0.5,
    fontSize: 14,
    fontWeight: '400',
  },
  infoValue: {
    color: Colors.black,
    fontSize: 14,
    fontWeight: '400',
  },
  infoList: {
    marginVertical: 10,
    gap: 10,
  },
  neuter: {
    backgroundColor: Colors.backgroundLight,
    padding: 14,
    borderRadius: 10,
  },
});
