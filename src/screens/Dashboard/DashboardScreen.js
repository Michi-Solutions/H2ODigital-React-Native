import React, { Component, useEffect, useState } from 'react';
import { View, StyleSheet, FlatList, Text, ActivityIndicator, TouchableOpacity, ScrollView } from 'react-native';
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
      ultimasLeituras: [],
      isLoading: true,
    }

    
    
  }
  
  async componentDidMount() {

    const {...user} = this.props.route.params
    this.setState({edificio: user.name})

    while (this.state.isLoading == true) {
      for (let index = 0; index < user.resIds.length; index++){
        console.log('id: ',user.resIds[index])
        await fetch(`http://h2odigital.com.br/api/dashboard/${user.resIds[index]}`,{ 
          method: 'get', 
          headers: new Headers({
            'Authorization': 'Basic '+btoa(`${user.email}:${user.password}`), 
            'Content-Type': 'application/x-www-form-urlencoded'
          })
        })
        .then(async (response) => {
          if (response.status === 200) {
            let json = await response.json()
            await new Promise(resolve => setTimeout(resolve, 500)) // 0.5 sec

            if (this.state.data[0] === "No data" && user.resIds[index] === user.resIds[0]){
              this.setState({data: [json]})
            } else if (this.state.data[0] != "No data") {
              this.state.data.push(json)
            }

            await new Promise(resolve => setTimeout(resolve, 500)) // 0.5 sec
            console.log(this.state.data.length, user.resIds.length)
            if (user.resIds.length === this.state.data.length ){
              this.setState({isLoading: false})
            }
            // console.log(this.state.data)
          } else {
            index = 0
            console.log('status: ',response.status)
          }
        })
      }
    }
    
    console.log('carregou')
    for (let index = 0; index < this.state.data.length; index++){
      for (let res = 0; res < Object.keys(this.state.data[index].leiturasTemporais).length; res++){
        const currentStateCopy = [...this.state.ultimasLeituras]
        currentStateCopy.push(this.state.data[index].leiturasTemporais[Object.keys(this.state.data[index].leiturasTemporais)[res]])
        this.setState({ultimasLeituras: currentStateCopy})
        // console.log(currentStateCopy)
      }      
    }
    // console.log("..", this.state.ultimasLeituras[0])
    console.log(this.state.data)
  }

  render() {
    
    if (this.state.isLoading == false){
      let a = this.state.ultimasLeituras
        return (
        
        <ScrollView>
          <View style={styles.container}>
            <Text style={styles.welcome}>
              
            </Text>
  
            {this.state.ultimasLeituras.map(item =>
            <TouchableOpacity key={item[14].reservatorio.id} onPress={() => this.props.navigation.navigate("Graph", {
              dados: item,
              volumeMaximo : [parseInt(item)],
              nome: item
            })}>
                <DashboardComponent 
                  nome={item[14].reservatorio.nome} 
                  volumeTotal={item[14].volumeMaximoFormatado}
                  percentual={item[14].percentual}
                  ultimaLeitura={item[14].dataUltimaLeituraFormatada}
                  percentualGrafico={item[14].percentual}
                  />
            </TouchableOpacity>
            )}
            
              
          </View>
        </ScrollView>
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