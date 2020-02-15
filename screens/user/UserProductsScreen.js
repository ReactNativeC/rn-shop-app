import React from 'react';
import { FlatList, View, Platform, Button, Dimensions , StyleSheet, Alert} from 'react-native';
import { useSelector, useDispatch  } from 'react-redux';
import ProductItem from '../../components/shop/ProductItem';
import * as productActions from '../../store/actions/products';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../../components/UI/HeaderButton';
import Colors from '../../constants/colors';
const UserProductsScreen = (props) => {
  const PRODUCTS = useSelector(state => state.products.userProducts)
  const dispatch = useDispatch(); 

  const onDetails = (id, title) => {
    props.navigation.navigate('EditProduct', {
      productId: id, 
      title: title
    })
  };

  const deleteHandler = (id) => {
    Alert.alert("Are you sure!", 
                "Do you really want to delete this item?",
                [           
                  {text:'Yes', style:'destructive', onPress:()=>dispatch(productActions.deleteProduct(id))},   
                  {text:'No', style:'cancel'}               
                ]);
    }

  const renderProductItem = itemData => {
    return (<ProductItem 
              title={itemData.item.title} 
              imageUrl={itemData.item.imageUrl}             
              price={itemData.item.price}
              onDetails={onDetails.bind(this, itemData.item.id, itemData.item.title)}             
            >              
              <View style={styles.button}>
                <Button  title="Edit" color={Colors.primaryColor} 
                  onPress={onDetails.bind(this, itemData.item.id, itemData.item.title)}  />
              </View>
              <View style={styles.button}>
                <Button 
                  title="Delete" color={Colors.primaryColor} 
                  onPress={deleteHandler.bind(this, itemData.item.id)}/>
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
          <Item title="Add" iconName={Platform.OS === 'android' ? 'md-add' : 'ios-add'} onPress={() => { navData.navigation.navigate('EditProduct')}} />
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