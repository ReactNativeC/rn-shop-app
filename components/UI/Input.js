import React, {useReducer, useEffect} from 'react';
import { StyleSheet, View, TextInput, Text } from 'react-native';

const INPUT_CHANGE = 'INPUT_CHANGE';
const INPUT_BLUR = 'INPUT_BLUR';

const inputReducer = (state, action) => {
  switch(action.type)
  {
    case INPUT_CHANGE:
      return {
        ...state,
        value: action.value, 
        isValid: action.isValid,         
      }
    case INPUT_BLUR:
      return {
        ...state,
        touched: true
      }
    default:
      return state;
  }
}

const Input = props => {
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: props.initialValue ? props.initialValue : '',
    isValid: props.initiallyValid,
    touched: false
  })

  const textChangeHandler = text => {
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let isValid = true;
    if (props.required && text.trim().length === 0) {
      isValid = false;
    }
    if (props.email && !emailRegex.test(text.toLowerCase())) {
      isValid = false;
    }
    if (props.min != null && +text < props.min) {
      isValid = false;
    }
    if (props.max != null && +text > props.max) {
      isValid = false;
    }
    if (props.minLength != null && text.length < props.minLength) {
      isValid = false;
    }

    dispatch({type: INPUT_CHANGE, value: text, isValid: isValid});
  }

  const lostFocusHandler = () => {
    dispatch({type: INPUT_BLUR});
  }

  const { onInputChanged, id } = props;
  
  useEffect(() => {
    onInputChanged(id, inputState.value, inputState.isValid);
  },[inputState, onInputChanged, id])

  return (
    <View style={styles.formControl}>
      <Text style={styles.titleText}>{props.label}</Text>
      <TextInput
        {...props}          
        style={!inputState.isValid && inputState.touched ? styles.inputRed : styles.input}
        value={inputState.value}
        onChangeText={textChangeHandler} 
        onBlur={lostFocusHandler}
        clearButtonMode="while-editing"             
      />
      {
        !inputState.isValid &&  inputState.touched && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{props.errorText}</Text>
          </View>
        )
      }
    </View>
  )
}

const styles = StyleSheet.create({
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
  },
  inputRed: {
    fontSize: 18, 
    fontFamily: 'Roboto',
    borderBottomColor: 'red',
    borderBottomWidth: 0.5,
  }, 
  errorContainer: {
    marginTop: 5    
  },
  errorText: {
    fontFamily:'Roboto',
    fontSize: 13,
    color:'red'
  }
});

export default Input;