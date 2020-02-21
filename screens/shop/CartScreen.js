import React, { useState, useEffect } from 'react';
import { Text, View, Button, StyleSheet, Platform, FlatList, ActivityIndicator, Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import * as cartActions from '../../store/actions/cart';
import * as orderActions from '../../store/actions/order';
import Colors from '../../constants/colors';
import CartItem from '../../components/shop/CartItem';

const CartScreen = props => {
  const dispath = useDispatch();
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);

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
    return transformedCartItems.sort((a, b) =>
      a.productPrice > b.productPrice ? 1 : -1
    );
  });
  
  const deleteItem = (productId) => {
    dispath(cartActions.deleteCartItem(productId));
  };

  const renderCartItem = (itemData) => {
    return (
      <CartItem 
        quantity={itemData.item.quantity}
        productTitle={itemData.item.productTitle}
        sum={itemData.item.sum}
        onDelete={() =>{deleteItem(itemData.item.productId)}}
        deletable
      />
    )
  };

  useEffect(() => {   
    if(error) {
    Alert.alert("Error", error, [{title:"OK", style:"cancel"}])
    }
  },[error])

  if(isProcessing) {
    return (
      <View style="centered">
        <ActivityIndicator size="large" color={Colors.primaryColor} />
      </View>
    );
  }

      
  if(cartItems.length === 0) {
    return (
      <View style={styles.noDataFoundTextContainer}>
        <Text style={styles.nodataFoundText}>Your cart is empty :( </Text>
      </View>
    )
  }

  return (
    <View style={styles.screen}>
      <View style={styles.summary}>
        <Text style={styles.summaryText}>Total: <Text style={styles.amount}>${Math.round(totalAmount.toFixed(2) * 100) / 100}</Text></Text>
        <Button title="Order Now" color={Colors.accentColor} disabled={cartItems.length ===0} onPress={ async ()=>
          { 
            setIsProcessing(true);
            setError(null);
            try {
              await dispath(orderActions.placeAnOrder(cartItems, totalAmount)) 
            } catch(err) {
              setError(err.message);
            }
            setIsProcessing(false)
          }} />
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

CartScreen.navigationOptions = navData => {
  return  {
    headerTitle: "Your Cart",
  }
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
  },
  centered: {
    flex: 1, 
    justifyContent: 'center',
    alignItems: 'center'
  },
  nodataFoundText: {
    fontFamily: 'Roboto',
    fontSize: 20, 
    color: Colors.primaryColor
  },
  noDataFoundTextContainer: {
    flex: 1, 
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10
  }
})
export default CartScreen;
