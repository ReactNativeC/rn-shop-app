import React, {useReducer, useCallback, useState, useEffect} from 'react';
import {View, StyleSheet, KeyboardAvoidingView, Keyboard, Button, Alert, TouchableWithoutFeedback, ActivityIndicator } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Card from '../../components/UI/Card';
import Input from '../../components/UI/Input';
import Colors from '../../constants/colors';
import * as authActions from '../../store/actions/auth';
import { LinearGradient } from 'expo-linear-gradient';
import { useDispatch } from 'react-redux';
import { fetchProducts } from '../../store/actions/products';

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

const AuthScreen = props => {
  const dispatch = useDispatch();
  const [isSignUp,setIsSignUp] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);
  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      email: '',
      password: '',
    },
    inputValidities: {
      email: false,
      password: false,      
    },
    formIsValid: false
  });

  const inputChangeHandler = useCallback((inputIdentifier, inputValue, inputValidity) => {
    dispatchFormState({
      type: FORM_INPUT_UPDATE, 
      value: inputValue, 
      isValid: inputValidity, 
      input: inputIdentifier
    })   
  },[dispatchFormState])

  const authHandler = async () => {
    if (formState.formIsValid) {
      if (isSignUp) {
        setIsProcessing(true); 
        setError(null)
        try {       
          await dispatch(authActions.signUp(formState.inputValues.email, formState.inputValues.password));          
          props.navigation.navigate('Shop');
        } catch(err) {
          setError(err.message);
          setIsProcessing(false);
        }        
      } else {
        setIsProcessing(true);        
        setError(null)
        try {
          await dispatch(authActions.signIn(formState.inputValues.email, formState.inputValues.password));          
          props.navigation.navigate('Shop');
        } catch(err) {
          setError(err.message);
          setIsProcessing(false);  
        }              
      }
    }
    else {
      Alert.alert('Error', 'Please correct errors on the screen', [{ title: 'Ok' }]);
    }
  }

  useEffect(() => {    
    if(error) {
      Alert.alert('Error',error,[{title:"OK"}]);
    }
  },[error])

  // if(isProcessing)
  // {
  //   console.log("isProcessing: " + isProcessing);
  //   return (<ActivityIndicator size="large" color={Colors.primaryColor} />);
  // }

  return (
    <KeyboardAvoidingView
      behavior="padding"
      keyboardVerticalOffset={50}
      style={styles.screen}
    >
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <LinearGradient colors={['#ffffff', '#6200EE', '#ffffff']} style={styles.gradient}>
          <Card style={styles.authContainer}>
            <ScrollView>
              <Input
                id="email"
                label="E-mail"
                required
                email
                errorText="Please enter valid email address"
                initialValue=''
                onInputChanged={inputChangeHandler}
                keyboardType="email-address"
                textContentType="emailAddress"
                autoCapitalize="none"
              />
              <Input
                id="password"
                label="Password"
                required
                onInputChanged={inputChangeHandler}
                minLength={5}
                initialValue=''
                secureTextEntry
                textContentType="password"
                autoCapitalize="none"
                minLength={6}
                errorText="password should be at least six characters"
              />
              {isProcessing && <ActivityIndicator size="large" color={Colors.primaryColor} />} 
              <View style={styles.buttonContainer}>
                <Button title={isSignUp? "Sign up" : "Login"} onPress={authHandler} color={Colors.primaryColor} />
              </View>
              <View style={styles.buttonContainer}>
                <Button title={`Switch to ${isSignUp? 'Login' : 'Sign up'}`} onPress={() => { setIsSignUp(state => !state) }} color={Colors.accentColor} />
              </View>
            </ScrollView>
          </Card>
        </LinearGradient>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

AuthScreen.navigationOptions = navData => {
  return {
    headerTitle: 'Authenticate',
  }
}

const styles = StyleSheet.create({
  screen:{
    flex: 1,   
  }, 
  gradient: {
    flex: 1, 
    justifyContent: 'center', 
    alignItems:'center'
  },
  authContainer:{
    width: '85%',     
    maxWidth: 400,   
    maxHeight: 400,    
    padding:20, 
  },
  buttonContainer:{  
    marginBottom: 10
  }    
})

export default AuthScreen;