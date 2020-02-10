import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';
import ProductsOverviewScreen from '../screens/shop/ProductsOverviewScreen';
import ProductDetailScreen from '../screens/shop/ProductDetailScreen';
import CartScreen from '../screens/shop/CartScreen';
import Colors  from '../constants/colors';
import { Platform } from 'react-native';
import OrdersScreen from '../screens/shop/OrdersScreen';


const defaultNavigationConfig = {
  headerTitle: 'Shop App',     
  headerStyle: {
    backgroundColor: Platform.OS == 'ios' ? 'white' : Colors.primaryColor,             
  }, 
  headerTintColor: Platform.OS == 'ios' ? Colors.primaryColor : 'white',     
  headerTitleStyle: {
    fontFamily: 'Roboto-Bold',
    fontSize: 20,
  }, 
  headerBackTitleStyle: {
    fontFamily: 'Roboto'
  }
}

const ProductsNavigator = createStackNavigator({
  Products : ProductsOverviewScreen, 
  ProductDetails: ProductDetailScreen, 
  Cart: CartScreen,
},
{
  navigationOptions: {
    drawerIcon: drawerConfig => (
      <Ionicons 
        name={Platform.OS === 'android'? 'md-cart': 'ios-cart'}
        size={23}
        color={drawerConfig.tintColor}
      />
    )
  },
  defaultNavigationOptions: defaultNavigationConfig
});

const OrdersNavigator = createStackNavigator({
  Orders : OrdersScreen
}, 
{
  navigationOptions: {
    drawerIcon: drawerConfig => (
      <Ionicons 
        name={Platform.OS === 'android'? 'md-list': 'ios-list'}
        size={23}
        color={drawerConfig.tintColor}
      />
    )
  },
  defaultNavigationOptions: defaultNavigationConfig
});

const MenuNavigator = createDrawerNavigator({
  Products : ProductsNavigator,
  Orders : OrdersNavigator
},
{ 
  contentOptions:{
    activeTintColor: Colors.primaryColor,
  }
});

export default createAppContainer(MenuNavigator);
