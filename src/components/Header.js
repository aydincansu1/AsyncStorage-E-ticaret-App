import React from 'react';
import Entypo from 'react-native-vector-icons/Entypo';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {Colors} from '../themes/Colors';
import {useNavigation} from '@react-navigation/native';

export default function Header() {
  const navigator = useNavigation();
  return (
    <View>
      <View style={styles.btnContainer}>
        <TouchableOpacity>
          <Entypo
            name="shopping-bag"
            style={[
              styles.icon,
              {borderWidth: 1, borderColor: Colors.backgroundLight},
            ]}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigator.navigate('MyCart')}>
          <Entypo name="shopping-cart" style={styles.icon} />
        </TouchableOpacity>
      </View>
      <View style={styles.textcontainer}>
        <Text style={styles.textHeader}> Hi-Fi Shop & Service</Text>
        <Text style={styles.text}>Audio shop on Rustaveli Ave 57.</Text>
        <Text style={styles.text}>
          This shop offers both products and services
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  icon: {
    fontSize: 18,
    color: Colors.backgroundMedium,
    padding: 12,
    borderRadius: 10,
  },
  textcontainer: {
    marginVertical: 20,
  },
  textHeader: {
    fontSize: 24,
    color: Colors.black,
    fontWeight: '400',
    marginBottom: 10,
  },
  text: {
    fontSize: 14,
    opacity: 0.7,
    fontWeight: '400',
    lineHeight: 24,
  },
});
