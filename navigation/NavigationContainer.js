import React, { useEffect, useRef } from 'react';
import ShopNavigator from '../navigation/ShopNavigator';
import { useSelector } from 'react-redux';
import { NavigationActions } from 'react-navigation';
const NavigationContainer = () => {
  const isAuthenticated = useSelector(state=> !!state.auth.token);
  const navRef = useRef();

  useEffect(()=>{
    if(!isAuthenticated) {
      navRef.current.dispatch(NavigationActions.navigate({routeName: 'Auth'}))
    }
    
  },[isAuthenticated]);
  
  return (
    <ShopNavigator ref={navRef}/>
  );
}

export default NavigationContainer;
