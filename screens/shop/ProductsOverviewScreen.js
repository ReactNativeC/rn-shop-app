import React from 'react';
import { FlatList, Button, Platform } from 'react-native';
import { useSelector, useDispatch  } from 'react-redux';
import ProductItem from '../../components/shop/ProductItem';
import * as cartActions from '../../store/actions/cart';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../../components/UI/HeaderButton';
import Colors from '../../constants/colors';

const ProductsOverviewScreen = (props) => {
  const PRODUCTS = useSelector(state => state.products.availableProducts)
  const dispatch = useDispatch(); 
  const onDetails = (id, title) => {
    props.navigation.navigate('ProductDetails', {
      productId: id, 
      title: title
    })
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

export default ProductsOverviewScreen;