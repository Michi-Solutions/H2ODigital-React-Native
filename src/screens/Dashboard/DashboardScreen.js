import React, { Component, useEffect, useState } from 'react';
import { View, StyleSheet, FlatList, Text, ActivityIndicator } from 'react-native';
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
      data: "No data",
      nome: ["No data"],
      edificio: ["No data"],
      isLoading: true
    }
  }

  async componentDidMount() {
    while ( this.state.data == "No data" ) {
      try {
        const response = await fetch('http://www.h2odigital.com.br/api/estabelecimento/capturar/136',{ 
        method: 'get', 
        headers: new Headers({
            'Authorization': 'Basic '+btoa('mauricio.abe@michisolutions.com.br:Senha123'), 
            'Content-Type': 'application/x-www-form-urlencoded',
            'cache-control': 'no-store',
            'pragma': 'no-cache'
          }), 
        });
        const userInfo = await response.json();
        this.setState({edificio:userInfo.nome})
        


        const dashboard = await fetch('http://h2odigital.com.br/api/dashboard/136',{ 
        method: 'get', 
        headers: new Headers({
            'Authorization': 'Basic '+btoa('mauricio.abe@michisolutions.com.br:Senha123'), 
            'Content-Type': 'application/x-www-form-urlencoded',
            'cache-control': 'no-store',
            'pragma': 'no-cache'
          }), 
        });
        const dashboardRes = await dashboard.json();
        this.setState({data:Object.values(dashboardRes)})


        this.setState({isLoading: false})


      } catch(err) {
        setTimeout(() => {console.log('.')}, 50000);
      }
    }
}

    render() {
      if (this.state.isLoading == false){
        return (
          
          <View style={styles.container}>
            <Text style={styles.welcome}>
              {this.state.edificio}
            </Text>
            <DashboardComponent nome={this.state.data[0][0].reservatorio.nome} 
                                volumeTotal={this.state.data[0][0].volumeMaximoFormatado} 
                                percentual={this.state.data[0][0].percentual} 
                                ultimaLeitura={this.state.data[0][0].dataUltimaLeituraFormatada} 
                                percentualGrafico={this.state.data[0][0].percentual}/>
          </View>
        )
      } else {
        return (
          <View style={[styles.loader]}>
            <ActivityIndicator size="large" color="#57B5DB" />
          </View>
        )
      }
      
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
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: '#EFEFEF'
  },
});
