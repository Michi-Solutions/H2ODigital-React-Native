import React, { Component, useEffect, useState } from 'react';
import { View, StyleSheet, FlatList, Text } from 'react-native';
import {decode, encode} from 'base-64'
import Speedometer from './ProgressCircle';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function DashboardComponent(props) {
    return (
      <View style={styles.container}>
          <View style={styles.card}>
              
            <Text style={styles.title}>{props.nome}</Text>

            <View>
                <Speedometer percentual={props.percentualGrafico}/>
            </View>

            <View style={styles.info}> 
                <View style={styles.infoKey}>
                    <Text style={styles.infoText}>
                        Volume Total:
                    </Text>
                    <Text style={styles.infoText}>
                        Percentual:
                    </Text>
                    <Text style={styles.infoText}>
                        Última Leitura:
                    </Text>
                </View>

                <View style={styles.infoValue}>
                    <Text style={styles.infoText}>
                        {props.volumeTotal}(m³)
                    </Text>
                    <Text style={styles.infoText}>
                        {props.percentual}%
                    </Text>
                    <Text style={styles.infoText}>
                        {props.ultimaLeitura}
                    </Text>
                    <TouchableOpacity style={styles.details}>
                        <Text style={styles.detailsText}>Detalhes</Text>
                        <View style={styles.triangle}></View>
                    </TouchableOpacity>
                </View>
                
            </View>
            
            
          </View>
      </View>
    )
}

const styles = StyleSheet.create({
  container: {
      backgroundColor: '#EFEFEF',
      height: 345,
      display: 'flex',
      alignItems:'center',
  },
  card: {
      backgroundColor: '#fff',
      height: 300,
      width: 335,
      borderRadius: 10,
      marginTop: 20,
  },
  title: {
      fontWeight: 'bold',
      color: '#57B5DB',
      fontSize: 24,
      marginLeft: 20,
      marginTop: 15
  },
  info: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  infoValue: {
    marginRight: 20,
    alignItems: 'flex-end',
  },
  infoKey: {
      marginLeft: 20
  },
  infoText: {
    color: '#57B5DB',
    fontSize: 16,
    marginTop: 5,
    fontWeight: 'bold',
  },
  details: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 20
  },
  triangle: {
    width: 0,
    height: 0,
    backgroundColor: "transparent",
    borderStyle: "solid",
    borderLeftWidth: 12,
    borderRightWidth: 12,
    borderBottomWidth: 20,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderBottomColor: "#57B5DB",
    transform: [{ rotate: "90deg" }],
  },
  detailsText: {
    fontWeight: 'bold',
    color: '#57B5DB',
    fontSize: 16,
  }
});


