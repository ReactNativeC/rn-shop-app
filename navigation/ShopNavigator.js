import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator, DrawerNavigatorItems } from 'react-navigation-drawer';
import ProductsOverviewScreen from '../screens/shop/ProductsOverviewScreen';
import ProductDetailScreen from '../screens/shop/ProductDetailScreen';
import CartScreen from '../screens/shop/CartScreen';
import * as authActions from '../store/actions/auth';
import Colors  from '../constants/colors';
import { View, Platform, Button, SafeAreaView } from 'react-native';
import OrdersScreen from '../screens/shop/OrdersScreen';
import UserProductsScreen from '../screens/user/UserProductsScreen';
import EditProductScreen from '../screens/user/EditProductScreen';
import AuthScreen from '../screens/user/AuthScreen';
import StatrupScreen from '../screens/StartupScreen';
import { useDispatch } from 'react-redux';


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

const UserProductsNavigator = createStackNavigator({
  UserProducts : UserProductsScreen,
  EditProduct: EditProductScreen
}, 
{
  navigationOptions: {
    drawerIcon: drawerConfig => (
      <Ionicons 
        name={Platform.OS === 'android'? 'md-create': 'ios-create'}
        size={23}
        color={drawerConfig.tintColor}
      />
    )
  },
  defaultNavigationOptions: defaultNavigationConfig
});

const MenuNavigator = createDrawerNavigator({
  Products : ProductsNavigator,
  Orders : OrdersNavigator, 
  UserProducts: UserProductsNavigator,
},
{ 
  contentOptions:{
    activeTintColor: Colors.primaryColor,
  }, 
  contentComponent: props => {
    const dispatch = useDispatch();
    return (
      <View style={{flex:1, padding: 20}}>
        <SafeAreaView forceInset={{ top: 'always', horizontal: 'never' }}>
        <DrawerNavigatorItems {...props} />
        <Button title="Logout" color={Colors.primaryColor} onPress={()=>{dispatch(authActions.logout()); props.navigation.navigate('Auth')}} />
        </SafeAreaView>
      </View>
    )
  }
});

const AuthNavigator = createStackNavigator({
  Auth: AuthScreen
}, 
{  
  defaultNavigationOptions: defaultNavigationConfig
})

const MainNavigator = createSwitchNavigator({
  Start: StatrupScreen,
  Auth: AuthNavigator,
  Shop: MenuNavigator
});

export default createAppContainer(MainNavigator);
