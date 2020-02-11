import React from 'react';
import { FlatList, View, Platform, Button, Dimensions , StyleSheet} from 'react-native';
import { useSelector, useDispatch  } from 'react-redux';
import ProductItem from '../../components/shop/ProductItem';
import * as cartActions from '../../store/actions/cart';
import * as productActions from '../../store/actions/products';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../../components/UI/HeaderButton';
import Colors from '../../constants/colors';
const UserProductsScreen = (props) => {
  const PRODUCTS = useSelector(state => state.products.userProducts)
  const dispatch = useDispatch(); 

  const renderProductItem = itemData => {
    return (<ProductItem 
              title={itemData.item.title} 
              imageUrl={itemData.item.imageUrl}             
              price={itemData.item.price}
              onDetails={()=> {}}             
            >              
              <View style={styles.button}><Button  title="Edit" color={Colors.primaryColor} /></View>
              <View style={styles.button}>
                <Button 
                  style={styles.button} title="Delete" color={Colors.primaryColor} 
                  onPress={() => {dispatch(productActions.deleteProduct(itemData.item.id))}}/>
              </View>
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

UserProductsScreen.navigationOptions = navData => {
  return  {
    headerTitle: "Your Products",
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
  button: {
    width: Dimensions.get('window').width / 4,
  }
})

export default UserProductsScreen;