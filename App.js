import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import LoginScreen from './src/screens/Login/LoginScreen';
import DashboardScreen from './src/screens/Dashboard/DashboardScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default class App extends Component {
  render() {
    return(
      <NavigationContainer>
      <Stack.Navigator
        screenOptions={{headerShown: false}}>
        <Stack.Screen
          name="SLa"
          component={LoginScreen}
        />
        <Stack.Screen 
          name="Dashboard" 
          component={DashboardScreen} />
      </Stack.Navigator>
    </NavigationContainer>
    )
  }
}

const styles = StyleSheet.create({
  
});