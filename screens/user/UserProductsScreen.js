import React, { useState, useEffect } from 'react';
import { FlatList, Text, View, Platform, Button, Dimensions , StyleSheet, Alert, ActivityIndicator} from 'react-native';
import { useSelector, useDispatch  } from 'react-redux';
import ProductItem from '../../components/shop/ProductItem';
import * as productActions from '../../store/actions/products';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../../components/UI/HeaderButton';
import Colors from '../../constants/colors';
const UserProductsScreen = (props) => {
  const PRODUCTS = useSelector(state => state.products.userProducts)
  const dispatch = useDispatch(); 
  const [error, setError] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const onDetails = (id, title) => {
    props.navigation.navigate('EditProduct', {
      productId: id, 
      title: title
    })
  };

  useEffect(() => {
    if(error)
      Alert.alert('Error',error,[{title: 'OK', style:'cancel'}]);
  }, [error])

  const deleteHandler = (id) => {
    Alert.alert("Are you sure!", 
                "Do you really want to delete this item?",
                [           
                  {text:'Yes', style:'destructive', onPress: async ()=> {
                    try {
                      setIsProcessing(true);
                      setError(null)
                      await dispatch(productActions.deleteProduct(id))
                    } catch(err) {                                      
                      setError(err.message);
                    }
                    setIsProcessing(false);
                  }},   
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
  
  if(isProcessing) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={Colors.primaryColor} />
      </View>
    )
  }
  
  if(PRODUCTS.length === 0) {
    return (
      <View style={styles.noDataFoundTextContainer}>
        <Text style={styles.nodataFoundText}>No products found!</Text>
      </View>
    )
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
          <Item title="Add" iconName={Platform.OS === 'android' ? 'md-create' : 'ios-create'} onPress={() => { navData.navigation.navigate('EditProduct')}} />
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
  }, 
  centered: {
    flex: 1, 
    justifyContent: 'center',
    alignItems: 'center'
  },
  nodataFoundText: {
    fontFamily: 'Roboto',
    fontSize: 20, 
    color: Colors.primaryColor
  },
  noDataFoundTextContainer: {
    flex: 1, 
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10
  }
})

export default UserProductsScreen;