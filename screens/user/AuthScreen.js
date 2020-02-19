import React, {useReducer, useCallback} from 'react';
import { Text, View, StyleSheet, KeyboardAvoidingView, Keyboard, Button, Alert } from 'react-native';
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

  const loginHandler = () => {
    if(formState.formIsValid)
      dispatch(authActions.signUp(formState.inputValues.email, formState.inputValues.password))
    else{
      Alert.alert('Error','Please correct errors on the screen', [{title:'Ok'}]);
    }
  }
  return (
    <KeyboardAvoidingView
      behavior="padding"
      keyboardVerticalOffset={50}
      style={styles.screen}
     >    
    <LinearGradient colors={['#ffffff','#6200EE','#ffffff']} style={styles.gradient}> 
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
          <View style={styles.buttonContainer}>
            <Button title="Login" onPress={loginHandler} color={Colors.primaryColor}/>
          </View>
          <View style={styles.buttonContainer}>
            <Button title="Switch to Sign up" onPress={()=>{}} color={Colors.accentColor}/>
          </View> 
        </ScrollView>
      </Card>
    </LinearGradient>
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