import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useSelector  } from 'react-redux';
import ProductComponent from '../../components/shop/ProductComponent';

const ProductsOverviewScreen = (props) => {
  const PRODUCTS = useSelector(state => state.products.availableProducts)

  const renderProductItem = itemData => {
    return (<ProductComponent 
              title={itemData.item.title} 
              imageUrl={itemData.item.imageUrl}             
              price={itemData.item.price}
              onDetails={()=>{
                props.navigation.navigate('productDetails', {
                  productId: itemData.item.id, 
                  title: itemData.item.title
                })
              }}
              onAddToCart={()=>{}}
           />)
  }
  
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