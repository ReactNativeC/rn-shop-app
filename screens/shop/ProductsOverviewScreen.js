import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useSelector  } from 'react-redux';

const ProductsOverviewScreen = (props) => {
  const PRODUCTS = useSelector(state => state.products.availableProducts)
  console.log(PRODUCTS);
  return (
    <FlatList
      data={PRODUCTS} 
      renderItem={(itemData) => {return (<Text>{itemData.item.title}</Text>)}} 
      showsVerticalScrollIndicator={false}
    />
  );
}

const styles = StyleSheet.create({

})

export default ProductsOverviewScreen;
