import React, { useEffect, useCallback, useReducer, useState } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, ScrollView, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Platform, Alert} from 'react-native';
import { useDispatch, useSelector  } from 'react-redux';
import * as productActions from '../../store/actions/products';
import Product from '../../model/product';
import HeaderButton  from '../../components/UI/HeaderButton';
import { HeaderButtons, Item} from 'react-navigation-header-buttons';
import Input from '..//../components/UI/Input';
import Colors from '../../constants/colors';

const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE';

const formReducer = (state, action) => {
  switch(action.type){
    case FORM_INPUT_UPDATE:      
      const updatedValues = {
        ...state.inputValues,
        [action.input]: action.value
      };

      const updatedValidities = {
        ...state.inputValidities, 
        [action.input]: action.isValid
      };

      let updatedFormIsValid = true; 
      for(const key in updatedValidities)
        updatedFormIsValid = updatedFormIsValid && updatedValidities[key];

      return {
        inputValues: updatedValues, 
        inputValidities: updatedValidities, 
        formIsValid: updatedFormIsValid
      };
  }
  
  return state;
};

const EditProductScreen = (props) => {
  const dispatch = useDispatch();
  const productId = props.navigation.getParam("productId");
  const editedProduct = useSelector(state=> state.products.availableProducts.find(product => product.id === productId)); 
  const [error, setError] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
 
  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      title: editedProduct ? editedProduct.title : '',
      imageUrl: editedProduct ? editedProduct.imageUrl : '',
      price: editedProduct ? editedProduct.price : '',
      description: editedProduct ? editedProduct.description : ''
    },
    inputValidities: {
      title: editedProduct ? true : false,
      imageUrl: editedProduct ? true : false,
      price: editedProduct ? true : false,
      description: editedProduct ? true : false,
    },
    formIsValid: editedProduct ? true : false
  })
  
  const inputChangeHandler = useCallback((inputIdentifier, inputValue, inputValidity) => {
    dispatchFormState({
      type: FORM_INPUT_UPDATE, 
      value: inputValue, 
      isValid: inputValidity, 
      input: inputIdentifier
    })   
  },[dispatchFormState])

  const submitHandler = useCallback( async () => {        
    if(!formState.formIsValid)
    {
      Alert.alert("Wrong Input", "Please correct issues on the screen!",[{title:"OK"} ])
      return;
    }
    try {
      setIsProcessing(true);
      setError(null);

      editedProduct ?        
        await dispatch(productActions.editProduct(new Product(
          editedProduct.id,
          editedProduct.ownerId,
          formState.inputValues.title,
          formState.inputValues.imageUrl,
          formState.inputValues.description,
          +formState.inputValues.price)))
        :
        await dispatch(productActions.addProduct(new Product(
          1,
          "u1",
          formState.inputValues.title,
          formState.inputValues.imageUrl,
          formState.inputValues.description,
          +formState.inputValues.price)))              
        
        props.navigation.goBack();    
    } catch (err) {       
      setError(err.message);
    }
    setIsProcessing(false); 
  },[dispatch, editedProduct, formState])

  useEffect(() => {
    props.navigation.setParams({submitFunc: submitHandler});
  }, [submitHandler])  
  
  useEffect(() => {
    if(error) {
      Alert.alert("Error", error, [{title:"OK", style:"cancel"}])
    }
  }, [error])

  
  if(isProcessing) {
    return (
    <View style={styles.centered}>
      <ActivityIndicator size="large" color={Colors.primaryColor} />  
    </View>
    )
  }

  return (
    <KeyboardAvoidingView  behavior="position" keyboardVerticalOffset={50}>
      <ScrollView>
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <View style={styles.form}>
            <Input
              id="title"
              label='Title'
              errorText='Please enter valid Title'
              returnKeyType="next"
              onInputChanged={inputChangeHandler}
              initialValue={editedProduct ? editedProduct.title : ''}
              initiallyValid={!!editedProduct}
              required
            />
            <Input
              id="imageUrl"
              label='Image Url'
              errorText='Please enter valid Image Url'
              autoCapitalize="none"
              returnKeyType="next"
              onInputChanged={inputChangeHandler}
              initialValue={editedProduct ? editedProduct.imageUrl : ''}
              initiallyValid={!!editedProduct}
            />
            { !editedProduct &&
            <Input
              id="price"
              label='Price'
              errorText=' Please enter valid Price'
              autoCapitalize="none"
              keyboardVerticalOffset="decimal-pad"
              returnKeyType="next"
              onInputChanged={inputChangeHandler}
              initialValue={editedProduct ? editedProduct.price.toString() : ''}
              initiallyValid={!!editedProduct}
              required
              min={1}
            /> 
            }
            <Input
              id="description"
              label='Description'
              errorText='Please enter valid Description'
              returnKeyType="done"
              autoCapitalize="sentences"
              autoCorrect
              multiline
              numberOfLines={3}
              onInputChanged={inputChangeHandler}
              initialValue={editedProduct ? editedProduct.description : ''}
              initiallyValid={!!editedProduct}
              required
              minLength={5}
            />
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  form: {
    margin: 20,
  },
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
})


EditProductScreen.navigationOptions = navData => {  
  const title = navData.navigation.getParam("title");
  const submitFunc = navData.navigation.getParam('submitFunc');
  return  {
    headerTitle: title? title : "Add Product",
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item title='Add' iconSize={30} iconName={Platform.OS === 'android'? 'md-checkmark' : 'ios-checkmark'} onPress={submitFunc} />
      </HeaderButtons>
    )
  }
}

export default EditProductScreen;