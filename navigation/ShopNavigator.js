import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import ProductsOverviewScreen from '../screens/shop/ProductsOverviewScreen';
import ProductDetailScreen from '../screens/shop/ProductDetailScreen';
import Colors  from '../constants/colors';
import { Platform } from 'react-native';

const ShopNavigator = createStackNavigator({
  "Products" : ProductsOverviewScreen, 
  "ProductDetails": ProductDetailScreen
},
{
  defaultNavigationOptions: {
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
});

export default createAppContainer(ShopNavigator);
