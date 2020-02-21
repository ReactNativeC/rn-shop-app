import React, { useEffect } from 'react';
import { View, ActivityIndicator, StyleSheet, AsyncStorage } from 'react-native';
import * as authActions from '../store/actions/auth';
import { useDispatch } from 'react-redux';
import Colors from '../constants/colors';

const StatrupScreen = props => {
  const dispatch = useDispatch();
  useEffect(()=>{
    const tryLogin = async () => {
     const userDataJson = await AsyncStorage.getItem('userData');          
     if(!userDataJson) {
      props.navigation.navigate('Auth');
      return;
     }     
     const userData = JSON.parse(userDataJson)     
     const {token, userId, expiration} = userData;
     const expirationDate = new Date(expiration);
          
     if(expirationDate <= new Date || !token || !userId) {              
      props.navigation.navigate('Auth'); 
      return;     
     }            
          
     //Log the user in.
     props.navigation.navigate('Shop');          
     
     //save token and user id to redux store
     dispatch(authActions.authenticate(token, userId));
    }
    tryLogin() 
  },[dispatch])

  return (
    <View style={styles.screen}>
      <ActivityIndicator size="large" color={Colors.primaryColor} />
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center'
  }
})

export default StatrupScreen;