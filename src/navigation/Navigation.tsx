// In App.js in a new project

import React, {useContext} from 'react';
import {View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {LoginScreen} from '../screens/LoginScreen';
import {RegisterScreen} from '../screens/RegisterScreen';
import {ProtectedScreen} from '../screens/ProtectedScreen';
import {AuthContext} from '../context/AuthContext';
import LoaderScreen from '../screens/LoaderScreen';
import {ProductsNavigation}  from './ProductsNavigation';

const Stack = createNativeStackNavigator();

export const Navigation = () => {
  const {status} = useContext(AuthContext);

  if(status === 'checking') return <LoaderScreen />

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      {status !== 'authenticated' ? (
        <>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
        </>
      ) : (
        <>
         <Stack.Screen name="ProductsNavigation" component={ProductsNavigation} />
         <Stack.Screen name="Protected" component={ProtectedScreen} />
        
        </>
       
      )}
    </Stack.Navigator>
  );
};
