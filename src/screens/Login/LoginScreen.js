import React, { Component, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, StatusBar, TextInput, TouchableOpacity } from 'react-native';
import {decode, encode} from 'base-64'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

if (!global.btoa) {
    global.btoa = encode;
}
    
if (!global.atob) {
    global.atob = decode;
}

export default class DashboardScreen extends Component {

  constructor(props) {
    super(props)
    this.state = {
      formError: [],
      estabelecimentoIds: [],
      estabelecimentoNames: [],
      userData: '',
      email: '',
      password: '',
      tentativas: 0
    }
  }

  Login = () => {
    this.setState({userData: undefined})
    fetch(`http://www.h2odigital.com.br/api/estabelecimento/filtrar/1`,{
        method: 'get', 
        headers: new Headers({
          'Authorization': 'Basic '+btoa(`${this.state.email}:${this.state.password}`), 
          'Content-Type': 'application/x-www-form-urlencoded',
          'cache-control': 'no-store',
          'pragma': 'no-cache'
        }) 
      })
      .then(async (response) => {
        if (response.status === 200) {

          this.setState({userData: await response.json()})
          if (this.state.userData.resultados != undefined) {
            for(let index = 0; index < this.state.userData.resultados.length; index++){
              this.state.estabelecimentoIds.push(this.state.userData.resultados[index].id)
              this.state.estabelecimentoNames.push(this.state.userData.resultados[index].nome)
            }
            // unique key
            let uniqueEstabelecimentoIds = [...new Set(this.state.estabelecimentoIds)]
            let uniqueEstabelecimentoNames = [...new Set(this.state.estabelecimentoNames)]

            this.props.navigation.navigate('Dashboard', {
              estabelIds: uniqueEstabelecimentoIds,
              resNames: uniqueEstabelecimentoNames,
              email: this.state.email,
              password: this.state.password
            })
          }

        } else if (response.status === 403) {
          this.setState({formError: "Tente novamente mais tarde"})
        } else {
          
          while (this.state.tentativas <= 5) {
            this.Login()
            this.setState({tentativas: this.state.tentativas + 1 })
          }
          if (this.state.tentativas > 4) {
            
            this.setState({formError: "Usuário ou senha incorretos"})
          }
        }
      })
    }
    
  render() {
    return(
      <KeyboardAwareScrollView style={styles.container}>
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
                onPress={this.Login}>
                
                <Text style={styles.btnText}>Entrar</Text>
            </TouchableOpacity>
        </View>
        
      </KeyboardAwareScrollView>
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
