import React, { useEffect, useCallback, useReducer } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Platform, Alert} from 'react-native';
import { useDispatch, useSelector  } from 'react-redux';
import * as productActions from '../../store/actions/products';
import Product from '../../model/product';
import HeaderButton  from '../../components/UI/HeaderButton';
import { HeaderButtons, Item} from 'react-navigation-header-buttons';

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
  
  const textChangeHandler = (inputIdentifier, text) => {
    let isValid = false;    
    if(text.trim().length > 0) {
      isValid = true;
    }
   
    dispatchFormState({
      type: FORM_INPUT_UPDATE, 
      value: text, 
      isValid: isValid, 
      input: inputIdentifier
    })   
  }

  const submitHandler = useCallback(() => {
    if(!formState.formIsValid)
    {
      Alert.alert("Wrong Input", "Please correct issues on the screen!",[{title:"OK"} ])
      return;
    }

    editedProduct ?
      dispatch(productActions.editProduct(new Product(
        editedProduct.id, 
        editedProduct.ownerId, 
        formState.inputValues.title, 
        formState.inputValues.imageUrl, 
        formState.inputValues.description, 
        parseFloat(parseFloat(formState.inputValues.price).toFixed(2)))))
      :
      dispatch(productActions.addProduct(new Product(
        1, 
        "u1", 
        formState.inputValues.title, 
        formState.inputValues.imageUrl, 
        formState.inputValues.description, 
        parseFloat(parseFloat(formState.inputValues.price).toFixed(2)))))          
      props.navigation.goBack();
  },[dispatch, editedProduct, formState])

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
                value={formState.inputValues.title} 
                onChangeText={textChangeHandler.bind(this, 'title')}
                clearButtonMode="while-editing"      
                autoCapitalize="sentences"                    
              />
              {
                !formState.inputValidities.title && (
                  <Text style={{ color: 'maroon' }}>Please enter a valid Title</Text>
                )
              }
            </View>

            <View style={styles.formControl}>
              <Text style={styles.titleText}>Image Url</Text>
              <TextInput style={styles.input} 
                value={formState.inputValues.imageUrl} 
                onChangeText={textChangeHandler.bind(this, 'imageUrl')} 
                clearButtonMode="while-editing" 
                keyboardType=""
                autoCapitalize="none"
              />
            </View>

            <View style={styles.formControl}>
              <Text style={styles.titleText}>Price</Text>            
              <TextInput keyboardType="decimal-pad" 
                style={styles.input} 
                value={formState.inputValues.price.toString()} 
                onChangeText={textChangeHandler.bind(this, 'price')} 
                clearButtonMode="while-editing"
              />
              {
                !formState.inputValidities.price && (
                  <Text style={{ color: 'maroon' }}>Price must be great than $1 USD</Text>
                )
              }
            </View>

            <View style={styles.formControl}>
              <Text style={styles.titleText}>Description</Text>
              <TextInput style={styles.input} 
                value={formState.inputValues.description} 
                onChangeText={textChangeHandler.bind(this, 'description')}                           
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