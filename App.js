import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ProductsOverviewScreen from './screens/shop/ProductsOverviewScreen';
import { createStore, combineReducers} from 'redux';
import { Provider } from 'react-redux';
import productsReducer from './store/reducers/products';
import ShopNavigator from './navigation/ShopNavigator';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';

const rootReducer = combineReducers({
  products: productsReducer
})

const store = createStore(rootReducer);

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