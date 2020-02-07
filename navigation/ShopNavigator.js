import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import ProductsOverviewScreen from '../screens/shop/ProductsOverviewScreen';
import ProductDetailScreen from '../screens/shop/ProductDetailScreen';
import Colors  from '../constants/colors';
import { Platform } from 'react-native';

const ShopNavigator = createStackNavigator({
  "overview" : ProductsOverviewScreen, 
  "productDetails": ProductDetailScreen
},
{
  defaultNavigationOptions: {
    headerTitle: 'Shop App', 
    headerStyle: {
      backgroundColor: Platform.OS == 'ios' ? 'white' : Colors.primaryColor
    }, 
    headerTintColor: Platform.OS == 'ios' ? Colors.primaryColor : 'white'
  }
});

export default createAppContainer(ShopNavigator);
