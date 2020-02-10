import React from 'react';
import { Text, FlatList, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../../components/UI/HeaderButton';
import OrderItem from '../../components/shop/OrderItem';

const OrdersScreen = props => {
  const orders = useSelector(state => {
    const transformedOrders = []; 
    for(const key in state.order.orders)
    {
      transformedOrders.push({
        orderId: key, 
        cartItems: state.order.orders[key].cartItems, 
        totalAmount: state.order.orders[key].totalAmount,
        date: state.order.orders[key].date
      });
    }
    return transformedOrders.sort((a,b) => a.key < b.key ? 1 : -1);
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

  return (
    <FlatList 
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