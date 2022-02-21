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
      nome: "No data",
      edificio: "No data",
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
          console.log(Object.keys(this.state.data.leiturasTemporais))
          this.setState({isLoading: false})
          console.log(response.status)
        } else if (response.status === 403) {
          setTimeout(() => {console.log('espera ai')}, 10000);
        } else {
          console.log('error')
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
          {/* <DashboardComponent nome={this.state.data[0][0].reservatorio.nome}/> */}
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
