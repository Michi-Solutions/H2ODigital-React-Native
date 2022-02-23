import React, { Component } from 'react';
import { View, Text, StyleSheet, StatusBar, TouchableOpacity, Image } from 'react-native';

export default class DashboardScreen extends Component {
  render() {
    return(
      <View style={styles.component}>
        <StatusBar
            translucent
            backgroundColor='transparent'/>

        <View style={styles.container}>
            <Image
            style={styles.logo}
                source={require('../../img/Logo.png')}/>

            <Text style={styles.message}>Oops!</Text>
            <Text style={styles.paragraf}>Ocorreu um erro durante o carregamento</Text>
            
            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Tentar Novamente</Text>
            </TouchableOpacity>
        </View>
      </View>
  )}
}

const styles = StyleSheet.create({
    component: {
        height: '100%',
        backgroundColor: '#EFEFEF',
        display: 'flex',
        alignItems: 'center'
      },
      container: {
        width: '85%',
        alignItems: 'center'
      },
      message: {
        color: '#57B5DB',
        fontSize: 42,
        fontWeight: 'bold',
        textAlign: 'center',
      },
      paragraf: {
        marginTop: 20,
        color: '#57B5DB',
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center'
      },
      button: {
        alignItems: 'center',
        marginTop: 25,
        marginRight: 'auto',
        marginLeft: 'auto',
        backgroundColor: '#57B5DB',
        padding: 10,
        borderRadius: 10,
        width: 200
      },
      buttonText : {
        color: '#EFEFEF',
        fontSize: 16
      },
      logo: {
          width: 550,
          height: 400
      }
});
