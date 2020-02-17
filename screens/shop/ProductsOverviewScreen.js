import React, { useEffect, useCallback, useState } from 'react';
import { FlatList,View, Text, Button, Platform, ActivityIndicator, StyleSheet } from 'react-native';
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
  const [error, setError] = useState('');
  const { navigation } = props;
  const dispatch = useDispatch(); 

  const loadProducts = useCallback(async () => {
    setError(null);
    setIsLoadingData(true);
    try {
      await dispatch(productActions.fetchProducts())
    } catch(err) {
      setError(err.message);
    }
    setIsLoadingData(false);      
  },[dispatch, setIsLoadingData, setError])
  
  // useEffect(() => {         
  //   loadProducts();
  // }, [dispatch, loadProducts])

  useEffect(() => {
    //components in a drawer navigator are created initially and are not recreted/rerendered when moving between diffrent screens. hence 
    //if the data is updated on the server, the data will not be refreshed. that's why we need to add a listener 
    //willFocus event triggers when the transition is started
    const willFocusSubscription = navigation.addListener('willFocus',loadProducts);
    
    //cleanup - unsubscribe. 
    //this runs whenever useEffect is about to re-run or the component is destroyed.
    return () => {
      willFocusSubscription.remove();
    }
  }, [loadProducts])

  const onDetails = (id, title) => {
    props.navigation.navigate('ProductDetails', {
      productId: id, 
      title: title
    })
  }

  if(error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>{error}</Text>
        <Button title="Try Again!" onPress={loadProducts} />
      </View>
    );
  }

  if(isLoadingData) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={Colors.primaryColor} />
      </View>
    );
  }

  if(!isLoadingData && PRODUCTS.length ===0) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>No Products found! Why don't you add some!</Text>        
      </View>
    )
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
      onRefresh={loadProducts}
      refreshing={isLoadingData}
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
  },
  errorText:{
    fontSize: 'Roboto',
    fontSize: 16,
    color: 'red'
  }
});

export default ProductsOverviewScreen;