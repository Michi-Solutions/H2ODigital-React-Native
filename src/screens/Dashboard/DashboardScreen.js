import React, { Component, useEffect, useState } from 'react';
import { View, StyleSheet, FlatList, Text, ActivityIndicator, TouchableOpacity } from 'react-native';
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
      nome: "No data",
      edificio: "No data",
      reservatorios: "No data",
      isLoading: true,
    }

    
  }
  
  async componentDidMount() {

    const {...user} = this.props.route.params

    this.setState({edificio: user.name})

    while (this.state.isLoading == true) {
      
      await fetch(`http://h2odigital.com.br/api/dashboard/${user.id}`,{ 
        method: 'get', 
        headers: new Headers({
          'Authorization': 'Basic '+btoa(`${user.email}:${user.password}`), 
          'Content-Type': 'application/x-www-form-urlencoded',
          'cache-control': 'no-store',
          'pragma': 'no-cache'
        }) 
      })
      .then(async (response) => {
        
        if (response.status === 200) {
          this.setState({data: await response.json()})

          this.setState({reservatorios: await Object.keys(this.state.data.leiturasTemporais)}) 
          this.setState({isLoading: false})
        } else if (response.status === 403) {
          await new Promise(resolve => setTimeout(resolve, 10000)); // 10 sec
          console.log(response.status)
        } else {
          console.log(response.status)
        }
      })
    }
  }

  render() {
    
    if (this.state.isLoading == false){
      return (
        
        <View style={styles.container}>
          <Text style={styles.welcome}>
            {this.state.edificio}
          </Text>
          
          <FlatList data={this.state.reservatorios}
                    renderItem={({ item }) => (
                      <TouchableOpacity onPress={() => this.props.navigation.navigate("Graph", {
                        hora: this.state.data.leiturasTemporais[item],
                        dados: this.state.data.leiturasTemporais[item],
                        volumeMaximo : [parseInt(this.state.data.leiturasTemporais[item][14].volumeMaximoFormatado)],
                        nome: this.state.data.leiturasTemporais[item][14].reservatorio.nome
                      })}>
                        <DashboardComponent
                                nome={this.state.data.leiturasTemporais[item][14].reservatorio.nome}
                                volumeTotal={this.state.data.leiturasTemporais[item][14].volumeMaximoFormatado}
                                percentual={this.state.data.leiturasTemporais[item][14].percentual}
                                ultimaLeitura={this.state.data.leiturasTemporais[item][14].dataUltimaLeituraFormatada}
                                percentualGrafico={this.state.data.leiturasTemporais[item][14].percentual}/>
                      </TouchableOpacity>
                    )}>

          </FlatList>
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
