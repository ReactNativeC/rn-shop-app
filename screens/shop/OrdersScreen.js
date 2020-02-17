import React, { useEffect, useCallback, useState } from 'react';
import { Text, View,Button, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../../components/UI/HeaderButton';
import OrderItem from '../../components/shop/OrderItem';
import * as OrderActions from '../../store/actions/order';
import Colors from '../../constants/colors';

const OrdersScreen = props => {
  const dispatch = useDispatch();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading]= useState(false);
  
  const orders = useSelector(state => {
    return state.order.orders.sort((a,b) => a.date < b.date ? 1: -1);
  });
  
  const renderOrderItem  = (itemData) => {    
    return (<OrderItem 
      cartItems = {itemData.item.cartItems}
      totalAmount = {itemData.item.totalAmount}
      orderedDate= {itemData.item.date}
      orderId={itemData.item.orderId}
    />
    )
  }

  const loadOrders = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      await dispatch(OrderActions.fetchOrders()); 
    } catch(err) {
      setError(err.message);
    }
    
    setIsLoading(false);
  },[dispatch, OrderActions.fetchOrders])

  useEffect(() => {
    const loadSubscription = props.navigation.addListener('willFocus', loadOrders);
    
    //cleanup. unsubscribe willFocus event when component is unmounted or destored
    return () => {
      loadSubscription.remove();
    }
  }, [loadOrders])

  if(isLoading) {
    return ( 
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={Colors.primaryColor} />
      </View>
    );
  }

  if(error) {
    return ( 
      <View style={styles.centered}>
        <Text style={styles.errorText}>{error}</Text>
        <Button title="Try again!" onPress={loadOrders} />
      </View>
    );
  }

  return (
    <FlatList 
      onRefresh={loadOrders}
      refreshing={isLoading}
      data={orders}
      keyExtractor={item => item.orderId}
      renderItem={renderOrderItem}
      style={styles.flatList}
      showsVerticalScrollIndicator={false}
    />
  )
}

const styles = StyleSheet.create({
  flatList: {
    height: '100%',
  }, 
  centered: {
    flex: 1, 
    justifyContent: 'center',
    alignItems: 'center'
  },
  errorText:{
    fontSize: 'Roboto',
    fontSize: 16,
    color: 'red'
  }
});

OrdersScreen.navigationOptions = navData => {
  return  {
    headerTitle: "Your Orders",
    headerRight: () => (
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
          <Item title="Cart" iconName={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'} onPress={() => { navData.navigation.navigate('Cart')}} />
        </HeaderButtons>
      ), 
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item title="Menu"  iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'} onPress={() => {navData.navigation.toggleDrawer()}} />
      </HeaderButtons>      
    )
  }
}

export default OrdersScreen;