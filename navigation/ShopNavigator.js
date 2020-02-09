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

const ShopNavigator = createStackNavigator({
  "Products" : ProductsOverviewScreen, 
  "ProductDetails": ProductDetailScreen, 
  "Cart": CartScreen,
},
{
  defaultNavigationOptions: defaultNavigationConfig
});

const OrdersNavigator = createStackNavigator({
  "Orders" : OrdersScreen
}, {
  defaultNavigationOptions: defaultNavigationConfig
});

const menuNavigator = createDrawerNavigator({
  "Products" : ShopNavigator,
  "Orders" : OrdersNavigator
},
{ 
  defaultNavigationOptions: defaultNavigationConfig  
});

export default createAppContainer(menuNavigator);
