import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, FlatList, Platform, TouchableOpacity } from 'react-native';
import CartItem from '../../components/shop/CartItem';
import Colors from '../../constants/colors';
import Card from '../../components/UI/Card';

const OrderItem = props => {  
  const [showDetails, setShowDetails]= useState(false);
  const uuidv4 = require('uuid/v4');
  
  const cartItemsArray = []
  for (const key in props.cartItems)
    cartItemsArray.push({
      id: key,
      quantity: props.cartItems[key].quantity,
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
    <Card style={styles.order}> 
      <View>
        <View style={styles.header}>
          <Text style={styles.headerText}>Total Amount: ${(+props.totalAmount).toFixed(2)}</Text>
        </View>
        <View style={styles.orderDateContainer}>
          <Text style={styles.orderDate} numberOfLines={1}> Ordered on {props.orderedDate}</Text>
          {/* <Text style={styles.orderDate}>(Order# {props.orderId})</Text> */}
        </View>
        <View style={{marginBottom: 10}}>
          <Button  title={showDetails? "Hide Details":"Show Details"} color={Colors.accentColor} onPress={() => setShowDetails(state => !state)} />
        </View>
        { showDetails && 
        <View>
          <FlatList 
            listKey={uuidv4()}
            keyExtractor={item => item.id}
            data={cartItemsArray}            
            renderItem={renderCartItem}
            showsVerticalScrollIndicator={false}
          />
        </View>
        }
      </View>
    </Card>
  )
}

const styles = StyleSheet.create({
  order: {
    margin: 20,
    padding: 10,
    backgroundColor: 'white',

 
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