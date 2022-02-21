import React, { Component, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, StatusBar, TextInput, TouchableOpacity } from 'react-native';
import {decode, encode} from 'base-64'

if (!global.btoa) {
    global.btoa = encode;
}
    
if (!global.atob) {
    global.atob = decode;
}

export default class DashboardScreen extends Component {

  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');
  // const [formError, setFormError] = useState('');
  // const [userId, setUserId] = useState('');

  constructor(props) {
    super(props)
    this.state = {
      email: [],
      password: [],
      formError: [],
      userId: [null]
    }
  }

  login = () => {
    const url = "http://www.h2odigital.com.br/api/estabelecimento/filtrar/1"
    
    fetch(`${url}`, { 
      method: 'get', 
      headers: new Headers({
          'Authorization': 'Basic '+btoa(`${this.state.email}:${this.state.password}`), 
          'Content-Type': 'application/x-www-form-urlencoded',
          'cache-control': 'no-store',
          'pragma': 'no-cache'
      }),
    })
    .then(async(response) => await response.json())
    .then((json) => {
      if (json.resultados[0].id != undefined){
        
        userId = json.resultados[0].id
        userName = json.resultados[0].nome
        userEmail = this.state.email
        userPassword = this.state.password

        this.props.navigation.navigate('Dashboard', {
          id: userId,
          name: userName,
          email: userEmail,
          password: userPassword
        })

        console.log('autorizado a entrar')

      } else {
        setTimeout(() => this.setState({formError: "usuario ou senha incorretos"}), 5000);
        
      }

    })
    .catch((error) => this.setState({formError: "usuario ou senha incorretos"}))
  }
  
  render() {
    return(
      <View style={styles.container}>
        <StatusBar
        translucent
        backgroundColor='transparent'
        />
        
        <Image
        style={styles.city}
        source={require('../../img/header-img.png')}/>

        <Text style={styles.title}>H2O DIGITAL</Text>
        
        <View style={styles.inputSection}>
            <TextInput 
                style={styles.input}
                placeholderTextColor="#EFEFEF" 
                placeholder='Email'
                onChangeText={newEmail => this.setState({email: newEmail})}/>

            <TextInput 
                style={styles.input}
                placeholderTextColor="#EFEFEF" 
                placeholder='Senha'
                onChangeText={newPassword => this.setState({password: newPassword})}
                secureTextEntry={true}/>
              
            <Text>{this.state.formError}</Text>

            <TouchableOpacity
                style={styles.btn}
                onPress={this.login}>
                
                <Text style={styles.btnText}>Entrar</Text>
            </TouchableOpacity>
        </View>
        
      </View>
  )}
}

const styles = StyleSheet.create({
  container : {
      backgroundColor: '#EFEFEF',
      height: '100%',
  },
  city : {
      width: '100%',
      height: 300
  },
  title : {
    color: '#57B5DB',
    fontSize: 42,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  inputSection: {
    margin: 50,
    display: 'flex',
    alignItems:'center',
    justifyContent:'center'
  },
  input : {
    backgroundColor: '#57B5DB',
    borderRadius: 10,
    width: 250,
    height: 50,
    color: '#EFEFEF',
    fontWeight: 'bold',
    fontSize: 18,
    paddingLeft: 20,
    marginBottom: 30
  },
  btn : {
      backgroundColor: '#57B5DB',
      width: 100,
      height: 35,
      borderRadius: 10,
      justifyContent: 'center',
      alignItems: 'center',
  },
  btnText : {
    color: '#EFEFEF',
    fontSize: 18,
    fontWeight: 'bold'
  },
});
