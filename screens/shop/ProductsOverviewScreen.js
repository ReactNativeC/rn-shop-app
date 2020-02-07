import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useSelector  } from 'react-redux';
import ProductComponent from '../../components/ProductComponent';

const renderProductItem = itemData => {
  return (<ProductComponent 
            title={itemData.item.title} 
            image={itemData.item.imageUrl} 
            description={itemData.item.description} 
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