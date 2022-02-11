import React, { Component, useEffect, useState } from 'react';
import { View, StyleSheet, FlatList, Text } from 'react-native';
import {decode, encode} from 'base-64'

if (!global.btoa) {
    global.btoa = encode;
}
    
if (!global.atob) {
    global.atob = decode;
}

export default function DashboardScreen() {

    const [data, setData] = useState([]);
    const url = "http://h2odigital.com.br/api/dashboard/136"
    console.log(data);

    useEffect(() => {
        fetch(url, { 
            method: 'get', 
            headers: new Headers({
                'Authorization': 'Basic '+btoa('mauricio.abe@michisolutions.com.br:Senha123'), 
                'Content-Type': 'application/x-www-form-urlencoded'
            }), 
        })
          .then((response) => response.json())
          .then((json) => {
            setData(Object.values(json))
          })
          .catch((error) => console.error(error))
    }, []);

    return (
      <View>
        <Text>{data.leiturasAtuais}</Text>
      </View>
    )
}