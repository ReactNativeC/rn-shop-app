import React from 'react';
import { View, Text, StyleSheet, Platform, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Card from '../../components/UI/Card';

const CartItem = props => {
  return (
    <Card style={styles.cartItem}>
      <View style={styles.itemContainer}>
        <Text style={styles.quantity}>{props.quantity}</Text>
        <Text style={styles.mainText}>{props.productTitle}</Text>
      </View>
      <View style={styles.itemContainer}>
        <Text style={styles.mainText}>${props.sum.toFixed(2)}</Text>
        { props.deletable &&
        <TouchableOpacity onPress={props.onDelete}>
          <Ionicons name={Platform.OS === 'android' ? 'md-trash' : 'ios-trash'} size={23} color="red" />
        </TouchableOpacity> 
        }       
      </View>
    </Card>
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