import React, { Component, useEffect, useState } from 'react';
import { View, StyleSheet, FlatList, Text } from 'react-native';
import {decode, encode} from 'base-64'
import DashboardComponent from './DashboardComponent'

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
      data: ["No data"],
      nome: ["No data"],
      edificio: ["No data"],
      userId: [null]
    }
  }
  

  componentDidMount() {
    const urlTank = "http://h2odigital.com.br/api/dashboard/136"
    const urlUser = "http://www.h2odigital.com.br/api/estabelecimento/capturar/136"
    const urlId = "http://www.h2odigital.com.br/api/estabelecimento/filtrar/1"

    fetch(urlId, { 
      method: 'get', 
      headers: new Headers({
          'Authorization': 'Basic '+btoa('mauricio.abe@michisolutions.com.br:Senha123'), 
          'Content-Type': 'application/x-www-form-urlencoded'
        }), 
    })
    .then((response) => response.json())
    .then((json) => {
      this.setState({userId: json})
      console.log(this.state.userId.resultados[0].id)
    })
    
    fetch(urlTank, { 
      method: 'get', 
      headers: new Headers({
          'Authorization': 'Basic '+btoa('mauricio.abe@michisolutions.com.br:Senha123'), 
          'Content-Type': 'application/x-www-form-urlencoded'
        }), 
    })
    .then((response) => response.json())
    .then((json) => {
      this.setState({data: Object.values(json), nome: Object.values(json)[0][0].reservatorio.nome})
    })

    fetch(urlUser, { 
      method: 'get', 
      headers: new Headers({
          'Authorization': 'Basic '+btoa('mauricio.abe@michisolutions.com.br:Senha123'), 
          'Content-Type': 'application/x-www-form-urlencoded'
        }), 
    })
    .then((response) => response.json())
    .then((json) => {
      this.setState({edificio: json})
    })
  }

  

    render() {
      return (
          
          <View style={styles.container}>
            <Text style={styles.welcome}>
              {this.state.edificio.nome}
            </Text>
            <DashboardComponent nome={this.state.nome} 
                                volumeTotal={this.state.data[0][0].volumeMaximoFormatado} 
                                percentual={this.state.data[0][0].percentual} 
                                ultimaLeitura={this.state.data[0][0].dataUltimaLeituraFormatada} 
                                percentualGrafico={this.state.data[0][0].percentual}/>
        </View>
      )
    }
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: '#EFEFEF',
    paddingTop: 25
  },
  welcome: {
    fontWeight: 'bold',
      color: '#57B5DB',
      fontSize: 24,
      marginLeft: 20,
      marginTop: 15
  }
});
