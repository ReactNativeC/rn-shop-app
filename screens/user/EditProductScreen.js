import React, { useState, useEffect, useCa, useCallback } from 'react';
import { View, Text, Button, TextInput, StyleSheet, ScrollView, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Platform, Alert} from 'react-native';
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
  
  const [titleIsValid, setTitleIsValid] = useState(false);
  const [priceIsValid, setPriceIsValid] = useState(false);
  
  const titleChangeHandler = text => {
    if(text.length < 2)
      setTitleIsValid(false);
    else
      setTitleIsValid(true)
    
      setTitle(text);    
  }

  const priceChangeHandler = price => {
   
    if(parseFloat(price) < 1.0)
      setPriceIsValid(false);
    else
      setPriceIsValid(true)
    
      setPrice(price);   
  }

  const submitHandler = useCallback(() => {
    if(title.length < 2 || price < 1)
    {
      Alert.alert("Invalid", "Please correct all issues before proceeding!",[{title:"OK"} ])
      return;
    }
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
      <KeyboardAvoidingView behavior="position" keyboardVerticalOffset={60}>
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <View style={styles.form}>
            <View style={styles.formControl}>
              <Text style={styles.titleText}>Title</Text>
              <TextInput 
                style={styles.input} 
                value={title} 
                onChangeText={titleChangeHandler}
                clearButtonMode="while-editing"      
                autoCapitalize="sentences"                    
              />
              {
                !titleIsValid && (
                  <Text style={{ color: 'maroon' }}>Please enter a valid Title</Text>
                )
              }
            </View>

            <View style={styles.formControl}>
              <Text style={styles.titleText}>Image Url</Text>
              <TextInput style={styles.input} 
                value={imageUrl} 
                onChangeText={input=>setImageUrl(input)} 
                clearButtonMode="while-editing" 
                keyboardType=""
                autoCapitalize="none"
              />
            </View>

            <View style={styles.formControl}>
              <Text style={styles.titleText}>Price</Text>            
              <TextInput keyboardType="decimal-pad" 
                style={styles.input} 
                value={price.toString()} 
                onChangeText={priceChangeHandler} 
                clearButtonMode="while-editing"
              />
              {
                !priceIsValid && (
                  <Text style={{ color: 'maroon' }}>Price must be great than $1 USD</Text>
                )
              }
            </View>

            <View style={styles.formControl}>
              <Text style={styles.titleText}>Description</Text>
              <TextInput style={styles.input} 
                value={description} 
                onChangeText={input=>setDescription(input)}                           
                blurOnSubmit
                clearButtonMode="while-editing"     
                returnKeyType="done"                                                                     
              />
            </View>    
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