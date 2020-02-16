import React, { useEffect, useCallback, useState } from 'react';
import { FlatList,View, Button, Platform, ActivityIndicator, StyleSheet } from 'react-native';
import { useSelector, useDispatch  } from 'react-redux';
import ProductItem from '../../components/shop/ProductItem';
import * as cartActions from '../../store/actions/cart';
import * as productActions from '../../store/actions/products';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../../components/UI/HeaderButton';
import Colors from '../../constants/colors';

const ProductsOverviewScreen = (props) => {
  const PRODUCTS = useSelector(state => state.products.availableProducts)
  const [isLoadingData, setIsLoadingData] = useState(false);
  const dispatch = useDispatch(); 

 
  useEffect(() => {    
    const loadProducts = async () => {
      setIsLoadingData(true);
      await dispatch(productActions.fetchProducts())
      setIsLoadingData(false)
    }

    loadProducts();
  }, [dispatch])

  const onDetails = (id, title) => {
    props.navigation.navigate('ProductDetails', {
      productId: id, 
      title: title
    })
  }

  if(isLoadingData) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={Colors.primaryColor} />
      </View>
    );
  }


  const renderProductItem = itemData => {
    return (<ProductItem 
              title={itemData.item.title} 
              imageUrl={itemData.item.imageUrl}             
              price={itemData.item.price}     
              onDetails={onDetails.bind(this, itemData.item.id, itemData.item.title)}     
           >
              <Button color={Colors.primaryColor} title="View Details" onPress={onDetails.bind(this, itemData.item.id, itemData.item.title)} />
              <Button color={Colors.primaryColor} title="Add to Cart" onPress={()=>{ dispatch(cartActions.addToCart(itemData.item)) }} />
           </ProductItem>)
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
      ), 
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item title="Menu"  iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'} onPress={() => {navData.navigation.toggleDrawer()}} />
      </HeaderButtons>      
    )
  }
}

const styles = StyleSheet.create({
  centered: {
    flex: 1, 
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default ProductsOverviewScreen;