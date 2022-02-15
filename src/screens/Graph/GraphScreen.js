import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import LineChartExample from './LineChart'

export default function GraphScreen() {
    return (
        <View style={styles.component}>
            <View style={styles.container}>
                <TouchableOpacity style={styles.goBack}>
                    <View style={styles.triangle}/>
                    <Text style={styles.goBackText}>Voltar</Text>
                </TouchableOpacity>

                <Text style={styles.title}>Reservatório 1</Text>
                <Text style={styles.graphTitle}>Últimas Horas</Text>
                <LineChartExample/>
            </View>
            
        </View>
      )
  }
  
  const styles = StyleSheet.create({
        component: {
          height: '100%',
          backgroundColor: '#EFEFEF',
          paddingTop: 25,
          display: 'flex',
          alignItems: 'center'
        },
        container: {
          width: '85%',
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
          transform: [{ rotate: "270deg" }],
        },
        goBack: {
          display: 'flex',
          flexDirection: 'row',
        },
        goBackText: {
          fontWeight: 'bold',
          color: '#57B5DB',
          fontSize: 18,
          marginLeft: 10
        },
        title: {
            fontSize: 24,
            color: '#57B5DB',
            fontWeight: 'bold',
            marginTop: 20,
        },
        graphTitle: {
          fontSize: 18,
          color: '#57B5DB',
          fontWeight: 'bold',
          marginTop: 30,
        }
  });

