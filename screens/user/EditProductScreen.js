import React, { useState, useEffect, useCa, useCallback } from 'react';
import { View, Text, Button, TextInput, StyleSheet, ScrollView, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Platform} from 'react-native';
import { useDispatch, useSelector  } from 'react-redux';
import * as productActions from '../../store/actions/products';
import * as cartActions from '../../store/actions/cart';
import Colors from '../../constants/colors';
import Product from '../../model/product';
import HeaderButton  from '../../components/UI/HeaderButton';
import { HeaderButtons, Item} from 'react-navigation-header-buttons';

const EditProductScreen = (props) => {
  const dispatch = useDispatch();
  const productId = props.navigation.getParam("productId");
  const editedProduct = useSelector(state=> state.products.availableProducts.find(product => product.id === productId)); 
 
  const [title, setTitle] = useState(editedProduct? editedProduct.title: '');
  const [imageUrl, setImageUrl] =  useState(editedProduct? editedProduct.imageUrl: '');
  const [price, setPrice] = useState(editedProduct? editedProduct.price: '');
  const [description, setDescription] = useState(editedProduct? editedProduct.description: '');

  const submitHandler = useCallback(() => {
    editedProduct ?
      dispatch(productActions.editProduct(new Product(editedProduct.id, editedProduct.ownerId, title, imageUrl, description, parseFloat(parseFloat(price).toFixed(2)))))
      :
      dispatch(productActions.addProduct(new Product(1, "u1", title, imageUrl, description, parseFloat(parseFloat(price).toFixed(2)))))          
      props.navigation.goBack();
  },[dispatch, editedProduct, title, imageUrl, description, price])

  useEffect(() => {
    props.navigation.setParams({submitFunc: submitHandler});
  }, [submitHandler])
  
  return (
    <ScrollView>
      <KeyboardAvoidingView behavior="position" keyboardVerticalOffset={10}>
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <View style={styles.form}>
            <View style={styles.formControl}>
              <Text style={styles.titleText}>Title</Text>
              <TextInput style={styles.input} value={title} onChangeText={input=>setTitle(input)}/>
            </View>

            <View style={styles.formControl}>
              <Text style={styles.titleText}>Image Url</Text>
              <TextInput style={styles.input} value={imageUrl} onChangeText={input=>setImageUrl(input)} />
            </View>

            <View style={styles.formControl}>
              <Text style={styles.titleText}>Price</Text>            
              <TextInput keyboardType="numeric" style={styles.input} value={price.toString()} onChangeText={input=>setPrice(input)} />
            </View>

            <View style={styles.formControl}>
              <Text style={styles.titleText}>Description</Text>
              <TextInput style={styles.input} value={description} onChangeText={input=>setDescription(input)} />
            </View>

            {/* <View Style={styles.formControl}>
              <Button title={editedProduct?"Edit Product":"Add Product"} color={Colors.primaryColor}
                onPress={submitHandler}              
              />
            </View> */}
          </View>          
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  form: {
    margin: 20,
  },
  formControl:{
    marginVertical: 25,
  },
  titleText:{
    fontSize: 18,
    fontFamily: 'Roboto-Bold',
    marginBottom: 20,    
  },
  input: {
    fontSize: 18, 
    fontFamily: 'Roboto',
    borderBottomColor: 'black',
    borderBottomWidth: 0.5,
  }
})


EditProductScreen.navigationOptions = navData => {  
  const title = navData.navigation.getParam("title");
  const submitFunc = navData.navigation.getParam('submitFunc');
  return  {
    headerTitle: title? title : "Add New Product",
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item title='Add' iconSize={30} iconName={Platform.OS === 'android'? 'md-checkmark' : 'ios-checkmark'} onPress={submitFunc} />
      </HeaderButtons>
    )
  }
}

export default EditProductScreen;