import React from 'react';
import { FlatList } from 'react-native';
import { useSelector, useDispatch  } from 'react-redux';
import ProductComponent from '../../components/shop/ProductComponent';
import * as cartActions from '../../store/actions/cart';

const ProductsOverviewScreen = (props) => {
  const PRODUCTS = useSelector(state => state.products.availableProducts)
  const dispatch = useDispatch(); 

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
              onAddToCart={()=>{ dispatch(cartActions.addToCart(itemData.item)) }}
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