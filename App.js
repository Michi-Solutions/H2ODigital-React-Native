import React, { Component } from 'react';
import { View, StyleSheet, LogBox } from 'react-native';
import LoginScreen from './src/screens/Login/LoginScreen';
import DashboardScreen from './src/screens/Dashboard/DashboardScreen';
import GraphScreen from './src/screens/Graph/GraphScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

LogBox.ignoreLogs(['Warning: ...']);

const Stack = createNativeStackNavigator();

export default class App extends Component {
  render() {
    return(
      <NavigationContainer>
      <Stack.Navigator
        screenOptions={{headerShown: false}}>
        <Stack.Screen
          name="Login"
          component={LoginScreen}
        />
        <Stack.Screen 
          name="Dashboard" 
          component={DashboardScreen} />

        <Stack.Screen 
          name="Graph" 
          component={GraphScreen}
          navigation={this.props.navigation}/>
      </Stack.Navigator>
      
    </NavigationContainer>
    
    )
  }
}

const styles = StyleSheet.create({
  
});