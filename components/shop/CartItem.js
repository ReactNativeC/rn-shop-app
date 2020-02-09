import React from 'react';
import { View, Text, StyleSheet, Platform, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
const CartItem = props => {
  return (
    <View style={styles.cartItem}>
      <View style={styles.itemContainer}>
        <Text style={styles.quantity}>{props.quantity}</Text>
        <Text style={styles.mainText}>{props.productTitle}</Text>
      </View>
      <View style={styles.itemContainer}>
        <Text style={styles.mainText}>{props.sum.toFixed(2)}</Text>
        <TouchableOpacity onPress={()=> {}} style={styles.deleteButton}>
          <Ionicons name={Platform.OS === 'android' ? 'md-trash' : 'ios-trash'} size={23} color="red" />
        </TouchableOpacity>        
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  cartItem: {    
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    marginVertical: 5,
    padding: 10,
    backgroundColor: 'white',

    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 5,
    borderRadius: 10,
  }, 
  itemContainer:{
    flexDirection: 'row',  
    alignItems: 'center'  
  },
  quantity: {
    fontFamily: 'Roboto',
    fontSize: 16,
    color: '#888',
  },
  mainText: {
    fontFamily: 'Roboto-Bold',
    fontSize: 16,
    marginHorizontal: 8,  
  },
  


})

export default CartItem;