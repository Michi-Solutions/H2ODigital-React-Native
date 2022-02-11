import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import LoginScreen from './src/screens/Login/LoginScreen';

export default class App extends Component {
  render() {
    return(
      <View>
        <LoginScreen/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  
});