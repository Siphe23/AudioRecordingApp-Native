import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Import your screens
import Login from './components/Login';
import Signup from './components/Signup';
import Home from './components/Home';
import Profile from './components/Profile';
import ProtectedRoute from './components/ProtectedRoute';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ title: 'Login' }}
        />
        <Stack.Screen
          name="Signup"
          component={Signup}
          options={{ title: 'Sign Up' }}
        />
        <Stack.Screen
          name="Home"
          component={ProtectedRoute(Home)}
          options={{ title: 'Home', headerShown: true }}
        />
        <Stack.Screen
          name="Profile"
          component={ProtectedRoute(Profile)}
          options={{ title: 'Profile', headerShown: true }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
