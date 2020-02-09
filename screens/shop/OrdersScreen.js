import React from 'react';
import { Text, FlatList, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../../components/UI/HeaderButton';

const OrdersScreen = props => {
  const orders = useSelector(state => state.order.orders);
  console.log(orders);
  return (
    <FlatList 
      data={orders}
      keyExtractor={item => item.id}
      renderItem={(itemData) => { return (<Text>{itemData.item.totalAmount}</Text>) }}
    />
  )
}

const styles = StyleSheet.create({

});

OrdersScreen.navigationOptions = navData => {
  return  {
    headerTitle: "All Products",
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