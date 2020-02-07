import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useSelector  } from 'react-redux';
import ProductComponent from '../../components/shop/ProductComponent';

const renderProductItem = itemData => {
  return (<ProductComponent 
            title={itemData.item.title} 
            imageUrl={itemData.item.imageUrl}             
            price={itemData.item.price}
            onDetails={()=>{}}            
            onAddToCart={()=>{}}
         />)
}

const ProductsOverviewScreen = (props) => {
  const PRODUCTS = useSelector(state => state.products.availableProducts)
  
  return (
    <FlatList
      data={PRODUCTS} 
      renderItem = {renderProductItem} 
      showsVerticalScrollIndicator={false}
    />
  );
}

const styles = StyleSheet.create({

})

export default ProductsOverviewScreen;