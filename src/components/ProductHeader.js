import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';
import {Colors} from '../themes/Colors';

export default function ProductHeader({title, count}) {
  return (
    <View style={styles.product}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <Text style={{fontSize: 18, letterSpacing: 1}}>{title} </Text>
        <Text
          style={{
            color: Colors.black,
            fontSize: 14,
            fontWeight: '400',
            opacity: 0.5,
            marginLeft: 10,
          }}>
          {count}
        </Text>
      </View>
      <TouchableOpacity>
        <Text style={{color: Colors.blue}}>See All</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  product: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  accesory: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
