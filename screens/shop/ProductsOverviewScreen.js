import React from 'react';
import { FlatList } from 'react-native';
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
                props.navigation.navigate('ProductDetails', {
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
      keyExtractor={item => item.id}
      renderItem = {renderProductItem} 
      showsVerticalScrollIndicator={false}
    />
  );
}

ProductsOverviewScreen.navigationOptions = {
  headerTitle: "All Products"
}

export default ProductsOverviewScreen;