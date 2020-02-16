import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ProductsOverviewScreen from './screens/shop/ProductsOverviewScreen';
import { createStore, combineReducers, applyMiddleware} from 'redux';
import ReduxThunk from 'redux-thunk';
import { Provider } from 'react-redux';
import productsReducer from './store/reducers/products';
import cartReducer from './store/reducers/cart';
import ordersReducer from './store/reducers/orders';
import ShopNavigator from './navigation/ShopNavigator';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';

//TODO - this is for development only remove this when deploying to prod
//import { composeWithDevTools } from 'redux-devtools-extension'

const rootReducer = combineReducers({
  products: productsReducer, 
  cart: cartReducer,  
  order: ordersReducer,
})


const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

//TODO --this is for development debugging only. remove "composeWithDevTools" argument to the creatStore function when deploying to prod.
//const store = createStore(rootReducer, applyMiddleware(ReduxThunk), composeWithDevTools());

const fetchFonts = () => {
  return Font.loadAsync({
    'Roboto' : require('./assets/Fonts/Roboto-Regular.ttf'),
    'Roboto-Bold': require('./assets/Fonts/Roboto-Bold.ttf')
  });
}

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);

  if(!fontLoaded)
    return (<AppLoading startAsync={fetchFonts} onFinish={() => { setFontLoaded(true) }} />);

  return (
    <Provider store={store}>
      <ShopNavigator />
    </Provider>    
  );
}