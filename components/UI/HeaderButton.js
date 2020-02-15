import React from 'react'; 
import { Platform } from 'react-native';
import { HeaderButton, HeaderButtons } from 'react-navigation-header-buttons';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../../constants/colors';

const CustomHeaderButton = props => {
  return (
    <HeaderButton           
      IconComponent={Ionicons} 
      iconSize={25}       
      color={ Platform.OS === 'android'? 'white' : Colors.primaryColor }
      {...props} 
    />  
  );
}

export default CustomHeaderButton;