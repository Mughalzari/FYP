import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './login'; // Import your login screen component
import signUpScreen from './signUp'; // Import your signup screen component
import HomeScreen from './home';

const Stack = createStackNavigator();

const MainNavigator = () => {
  return (
    <Stack.Navigator> 
     
    <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ title: 'Login' }}
      />

    <Stack.Screen
        name="Signup"
        component={signUpScreen}
        options={{ title: 'Sign Up' }}
      />


    <Stack.Screen
        name="Homepage"
        component={HomeScreen}
        options={{ title: 'Homepage' }}
      />
    </Stack.Navigator>
  );
};

export default MainNavigator;
