import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Text,
  Image,
  Dimensions,
  Animated,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import {Items} from '../database/Database';
import {Colors} from '../themes/Colors';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import AsyncStorage from '@react-native-async-storage/async-storage';
const width = Dimensions.get('window').width;

export default function ProductInfo() {
  const scrollX = useRef(new Animated.Value(0)).current;
  const position = Animated.divide(scrollX, width);
  const navigation = useNavigation();
  const route = useRoute();
  const [product, setProduct] = useState({});
  const {productID} = route.params;

  const clearAsync = async () => {
    try {
      await AsyncStorage.clear();
    } catch (error) {}
  };

  useEffect(() => {
    getDataFromDB();
    // clearAsync();
  }, [navigation]);

  const getDataFromDB = () => {
    const product = Items.find(item => item.id === productID);
    if (product) {
      setProduct(product);
    }
  };

  // * Sepete ekleme fonksiyonus
  const addToCart = async id => {
    // * Sepette onceden bu veri varsa AsyncStorage den veriyi getir
    let itemArray = await AsyncStorage.getItem('cartItems');
    itemArray = JSON.parse(itemArray);
    if (itemArray) {
      let array = itemArray;
      array.push(id);

      try {
        await AsyncStorage.setItem('cartItems', JSON.stringify(array));
        navigation.navigate('Home');
      } catch (error) {
        return error;
      }
    } else {
      let array = [];
      array.push(id);
      try {
        await AsyncStorage.setItem('cartItems', JSON.stringify(array));

        // *  AsyncStorage a veriyi  ekledikten sonra Home sayfasina yonlendir

        navigation.navigate('Home');
      } catch (error) {
        console.log(error);
        return;
      }
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.imageContainer}>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            decelerationRate="fast"
            bounces={false}
            snapToInterval={width}
            data={product.productImageList || []}
            keyExtractor={(item, index) => index.toString()}
            onScroll={Animated.event(
              [{nativeEvent: {contentOffset: {x: scrollX}}}],
              {useNativeDriver: false},
            )}
            renderItem={({item}) => (
              <View style={styles.imageContainer}>
                <Image source={item} style={styles.image} />
              </View>
            )}
          />
          <View style={styles.textContainer}>
            {product.productImageList
              ? product.productImageList.map((_, index) => {
                  let opacity = position.interpolate({
                    inputRange: [index - 1, index, index + 1],
                    outputRange: [0.2, 1, 0.2],
                    extrapolate: 'clamp',
                  });
                  return (
                    <Animated.View
                      key={index}
                      style={[styles.itemContainer, {opacity}]}></Animated.View>
                  );
                })
              : null}
          </View>
        </View>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack('Home')}>
          <Entypo name="chevron-left" style={styles.icon} />
        </TouchableOpacity>
        <View style={styles.productContainer}>
          <View style={styles.productInfo}>
            <Entypo
              name="shopping-cart"
              style={{fontSize: 16, color: Colors.blue}}
            />
            <Text>Shopping</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginVertical: 10,
            }}>
            <Text style={styles.productName}>{product.productName}</Text>

            <TouchableOpacity style={styles.linkButton}>
              <Feather
                name="link-2"
                style={{
                  color: Colors.blue,
                  fontSize: 18,
                }}
              />
            </TouchableOpacity>
          </View>
          <Text style={styles.description}>{product.description}</Text>

          <View
            style={{
              marginVertical: 20,
              justifyContent: 'space-between',
              alignItems: 'center',
              flexDirection: 'row',
            }}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <TouchableOpacity style={styles.locationButton}>
                <Entypo
                  name="location-pin"
                  style={{fontSize: 16, color: Colors.blue}}
                />
              </TouchableOpacity>
              <Text style={{marginLeft: 10}}> Üsküdar Bulgurlu 212 </Text>
            </View>
            <TouchableOpacity>
              <Entypo name="chevron-right" style={styles.icon} />
            </TouchableOpacity>
          </View>

          <Text style={{fontSize: 18, fontWeight: '500', marginVertical: 4}}>
            {product.productPrice} $
          </Text>
          <Text>Tax Rate 2% - $89.95 (1889.95$) $</Text>
        </View>
      </ScrollView>
      <TouchableOpacity
        style={styles.addtoCartBtn}
        onPress={() => (product.isAvailable ? addToCart(product.id) : null)}>
        <Text style={{color: Colors.white, fontSize: 15, fontWeight: '600'}}>
          {product.isAvailable ? 'ADD TO CART' : 'NOT AVAILABLE'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    alignItems: 'center',
  },
  backButton: {
    borderRadius: 10,
    padding: 14,
    top: 20,
    left: 20,
    backgroundColor: Colors.white,
    position: 'absolute',
  },
  icon: {
    fontSize: 18,
    color: Colors.backgroundDark,
  },
  imageContainer: {
    width: width,
    height: 340,
    backgroundColor: Colors.backgroundLight,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    height: '80%',
    width: '80%',
    resizeMode: 'contain',
  },
  textContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 0,
    marginBottom: 16,
  },
  itemContainer: {
    width: '16%',
    height: 2.4,
    backgroundColor: Colors.black,
    marginHorizontal: 4,
  },
  productContainer: {
    padding: 14,
  },
  productInfo: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 20,
  },
  linkButton: {
    borderRadius: 10,
    padding: 14,
    backgroundColor: Colors.backgroundLight,
  },
  productName: {
    fontSize: 20,
    fontWeight: '600',
    maxWidth: '80%',
  },
  description: {
    fontSize: 12,
    opacity: 0.5,
    fontWeight: '400',
    maxWidth: '85%',
    letterSpacing: 1,
    lineHeight: 16,
  },
  locationButton: {
    borderRadius: 30,
    padding: 14,
    backgroundColor: Colors.backgroundLight,
  },
  addtoCartBtn: {
    backgroundColor: Colors.blue,
    padding: 20,
    borderRadius: 25,
    width: '85%',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
});
