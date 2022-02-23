import React, {Component} from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import LineChartExample from './LineChart'

export default class GraphScreen extends Component {

    constructor(props){
      super(props);
      this.state = {
        dados: "",
        hora: "",
        valorMax: 0,
        nome: ""
      }
    }

    componentDidMount() {
      const {...data} = this.props.route.params

      const formatedHour = [
        data.dados[10].horaUltimaLeituraFormatada,
        data.dados[11].horaUltimaLeituraFormatada,
        data.dados[12].horaUltimaLeituraFormatada,
        data.dados[13].horaUltimaLeituraFormatada,
        data.dados[14].horaUltimaLeituraFormatada
      ]

      const formatedData = [
        parseInt(data.dados[10].valorAtual/1000),
        parseInt(data.dados[11].valorAtual/1000),
        parseInt(data.dados[12].valorAtual/1000),
        parseInt(data.dados[13].valorAtual/1000),
        parseInt(data.dados[14].valorAtual/1000)
      ]

      this.setState({dados: formatedData})
      this.setState({hora: formatedHour})
      this.setState({valorMax: data.volumeMaximo})
      this.setState({nome: data.nome})
    }

    render() {
      
      return (
            <View style={styles.component}>
                <View style={styles.container}>
                    <TouchableOpacity style={styles.goBack} onPress={() => this.props.navigation.navigate("Dashboard")}>
                        <View style={styles.triangle}/>
                        <Text style={styles.goBackText}>Voltar</Text>
                    </TouchableOpacity>

                    <Text style={styles.title}>{this.state.nome}</Text>
                    <Text style={styles.graphTitle}>Últimas Horas</Text>
                    <LineChartExample horaGrafico={this.state.hora} numerosGrafico={this.state.dados} volumeMaximo={this.state.valorMax}/>
                </View>
            </View>
        )
    }
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
          paddingTop: 30
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