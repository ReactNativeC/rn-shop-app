import React from 'react';
import { Text, View, Button, StyleSheet, Platform, FlatList } from 'react-native';
import { useSelector } from 'react-redux';
import Colors from '../../constants/colors';
import CartItem from '../../components/shop/CartItem';

const CartScreen = props => {
  const totalAmount = useSelector(state => state.cart.totalAmount);
  const cartItems = useSelector(state => {
    const transformedCartItems = [];
    for(const key in state.cart.cartItems) {
      transformedCartItems.push({
        productId: key, 
        productTitle: state.cart.cartItems[key].productTitle, 
        productPrice: state.cart.cartItems[key].productPrice,
        quantity: state.cart.cartItems[key].quantity,
        sum: state.cart.cartItems[key].sum 
      });
    }
    return transformedCartItems;
  });
  const renderCartItem = (itemData) => {
    return (
      <CartItem 
        quantity={itemData.item.quantity}
        productTitle={itemData.item.productTitle}
        sum={itemData.item.sum}
      />
    )
  }
  return (
    <View style={styles.screen}>
      <View style={styles.summary}>
        <Text style={styles.summaryText}>Total: <Text style={styles.amount}>${totalAmount}</Text></Text>
        <Button title="Order Now" color={Colors.accentColor} disabled={cartItems.length ===0}/>
      </View>
      <View style={styles.cartItems}>
        <FlatList 
          data={cartItems}
          keyExtractor={item => item.productId}
          renderItem={renderCartItem}
          style={styles.flatList}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    margin: 20,
  }, 
  summary: {
    flexDirection: 'row',
    justifyContent: 'space-between', 
    alignItems: 'center', 
    backgroundColor: 'white',
    padding: 10,
    marginBottom: 20,
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
  }, 
  summaryText: {
    fontFamily: 'Roboto-Bold', 
    fontSize: 18,
  }, 
  amount: {
    color: Colors.primaryColor
  }, 
  flatList: {
    height: '100%'
  }
})
export default CartScreen;
