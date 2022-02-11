import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import Dashboard from './src/screens/Dashboard/Dashboard';

export default class App extends Component {
  render() {
    return(
      <View>
        <Dashboard/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  
});