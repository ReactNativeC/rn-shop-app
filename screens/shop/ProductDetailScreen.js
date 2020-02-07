import React from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import { useSelector } from 'react-redux';
import Colors from '../../constants/colors';

const ProductDetailScreen = props => { 
  const productId = props.navigation.getParam("productId");
  const selectedProduct = useSelector(state=> state.products.availableProducts.find(product => product.id === productId));

  return (
    <View style={styles.screen}>
      <Image source={{uri: selectedProduct.imageUrl}} style={styles.image}/>      
      
      <View style={styles.heading}>
        <Text style={styles.title}>{selectedProduct.title}</Text>
        <Text style={styles.price}>${selectedProduct.price.toFixed(2)}</Text>
      </View>
            
      <Text style={styles.description}>{selectedProduct.description}</Text>      
    </View> 
  );
};

ProductDetailScreen.navigationOptions = navData => {
  return {
    headerTitle: navData.navigation.getParam("title")
  }  
}
  
const styles = StyleSheet.create({
  screen: {    
    alignItems: 'center',    
  },
  image: {
    width: '100%', 
    height: '60%',
  }, 
  heading: {
    alignItems: 'center',    
    marginVertical: 20,
  }, 
  title: {
    fontSize: 22,    
    color: Colors.primaryColor,
  },
  price: {
    fontSize: 18, 
    color: '#888'
  }, 
  description: {
    fontSize: 18,
    marginHorizontal: 20,    
  }
})

export default ProductDetailScreen;