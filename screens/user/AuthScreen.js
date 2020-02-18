import React from 'react';
import { Text, View, StyleSheet, KeyboardAvoidingView, Keyboard, Button } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Card from '../../components/UI/Card';
import Input from '../../components/UI/Input';
import Colors from '../../constants/colors';
import { LinearGradient } from 'expo-linear-gradient';

const AuthScreen = props => {
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
            errorMessage="Please enter valid email address"
            initialValue=''
            onInputChanged={()=>{}}
            keyboardType="email-address"
            textContentType="emailAddress"
            autoCapitalize="none"            
          />
          <Input 
            id="password"
            label="Password"
            required                      
            onInputChanged={()=>{}}  
            minLength={5}
            initialValue=''
            secureTextEntry
            textContentType="password"
            autoCapitalize="none"
            errorMessage="Please enter valid password"
          />      
          <View style={styles.buttonContainer}>
            <Button title="Login" onPress={()=>{}} color={Colors.primaryColor}/>
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