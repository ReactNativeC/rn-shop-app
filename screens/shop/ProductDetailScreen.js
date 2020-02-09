import React from 'react';
import { Text, View, StyleSheet, Button, Image } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import * as cartActions from '../../store/actions/cart';
import Colors from '../../constants/colors';
import { ScrollView } from 'react-native-gesture-handler';

const ProductDetailScreen = props => { 
  const productId = props.navigation.getParam("productId");
  const selectedProduct = useSelector(state=> state.products.availableProducts.find(product => product.id === productId));
  const dispatch = useDispatch();

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.screen}>
        <Image source={{ uri: selectedProduct.imageUrl }} style={styles.image} />
        <View style={styles.actions}>
          <Button color={Colors.primaryColor} title="Add to Cart" onPress={() => { dispatch(cartActions.addToCart(selectedProduct)) }} />
        </View>
        <Text style={styles.price}>${selectedProduct.price.toFixed(2)}</Text>
        <Text style={styles.description}>{selectedProduct.description}</Text>
      </View>
    </ScrollView>
  );
};

ProductDetailScreen.navigationOptions = navData => {
  return {
    headerTitle: navData.navigation.getParam("title"),         
  }  
}
  
const styles = StyleSheet.create({
  screen: {    
    alignItems: 'center',    
  },  
  image: {
    width: '100%', 
    height: 300,
  },
  actions: {
    marginVertical: 10,
    textAlign: 'center',    
  },
  price: {
    fontFamily: 'Roboto',
    fontSize: 20, 
    color: '#888',
    marginVertical: 10,    
  }, 
  description: {  
    fontFamily: 'Roboto',
    fontSize: 16,    
    marginHorizontal: 20
  }
})

export default ProductDetailScreen;