import React, { Component, useState } from 'react';
import { View, Text, StyleSheet, Image, StatusBar, TextInput, TouchableOpacity } from 'react-native';
import {decode, encode} from 'base-64'

if (!global.btoa) {
    global.btoa = encode;
}
    
if (!global.atob) {
    global.atob = decode;
}

export default function LoginScreen({ navigation }) {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [formError, setFormError] = useState('');

  const url = "http://h2odigital.com.br/api/dashboard/136"

  function login() {
    fetch(url, { 
      method: 'get', 
      headers: new Headers({
          'Authorization': 'Basic '+btoa(`${email}:${password}`), 
          'Content-Type': 'application/x-www-form-urlencoded'
      }),
    }).then(response => {
      if(response.status === 200) {
        console.log(response.status)
        console.log('autorizado a entrar')
        navigation.navigate('Dashboard')
      } else {
        setFormError('Usuário ou senha incorretos')
      }
    })
  }

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
              onChangeText={newEmail => setEmail(newEmail)}
              defaultValue={email}/>

          <TextInput 
              style={styles.input}
              placeholderTextColor="#EFEFEF" 
              placeholder='Senha'
              onChangeText={newPassword => setPassword(newPassword)}
              defaultValue={password}/>
            
          <Text>{formError}</Text>

          <TouchableOpacity
              style={styles.btn}
              onPress={login}>
               
              <Text style={styles.btnText}>Entrar</Text>
          </TouchableOpacity>
      </View>
      
    </View>
  )
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