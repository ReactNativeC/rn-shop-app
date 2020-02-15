import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, FlatList, Platform, TouchableOpacity } from 'react-native';
import CartItem from '../../components/shop/CartItem';
import Colors from '../../constants/colors';

const OrderItem = props => {  
  const [showDetails, setShowDetails]= useState(false);

  const cartItemsArray = []
  for (const key in props.cartItems)
    cartItemsArray.push({
      id: key,
      quanity: props.cartItems[key].quanity,
      productTitle: props.cartItems[key].productTitle,
      productPrice: props.cartItems[key].productPrice,
      sum: props.cartItems[key].sum
    });
    
  const renderCartItem = (itemData) => {    
    return (
      <CartItem 
        quantity={itemData.item.quantity}
        productTitle={itemData.item.productTitle}
        sum={itemData.item.sum}
        onDelete={() =>{ alert("Order is being processed. Cannot delete the item.")}}
      />
    )
  };
      
  return (
    <View style={styles.order}> 
      <View>
        <View style={styles.header}>
          <Text style={styles.headerText}>Order {props.orderId}</Text>
          <Text style={styles.headerText}>Total Amount: ${props.totalAmount.toFixed(2)}</Text>
        </View>
        <View style={styles.orderDateContainer}>
          <Text style={styles.orderDate} numberOfLines={1}> Ordered on {props.orderedDate}</Text>
        </View>
        <View style={{marginBottom: 10}}>
          <Button  title={showDetails? "Hide Details":"Show Details"} color={Colors.accentColor} onPress={() => setShowDetails(state => !state)} />
        </View>
        { showDetails && 
        <View>
          <FlatList 
            data={cartItemsArray}
            keyExtractor={item => item.id}
            renderItem={renderCartItem}
            showsVerticalScrollIndicator={false}
          />
        </View>
        }
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  order: {
    margin: 20,
    padding: 10,
    backgroundColor: 'white',

    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 5,
    borderRadius: 10,
  }, 
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    marginVertical: 10,    
  },  
  headerText: {
    fontFamily: 'Roboto-Bold',
    fontSize: 20, 
    color: Colors.primaryColor
  }, 
  orderDateContainer: { 
    marginHorizontal: 20,
    marginBottom: 20,

  },
  orderDate: {
    fontFamily: 'Roboto',
    fontSize: 16,
    color: '#888'     
  }
})

export default OrderItem;