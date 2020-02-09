import React from 'react';
import { FlatList, Platform } from 'react-native';
import { useSelector, useDispatch  } from 'react-redux';
import ProductComponent from '../../components/shop/ProductComponent';
import * as cartActions from '../../store/actions/cart';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../../components/UI/HeaderButton';

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

ProductsOverviewScreen.navigationOptions = navData => {
  return  {
    headerTitle: "All Products",
    headerRight: () => (
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
          <Item title="Cart" iconName={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'} onPress={() => { navData.navigation.navigate('Cart')}} />
        </HeaderButtons>
      )
  }
}

export default ProductsOverviewScreen;