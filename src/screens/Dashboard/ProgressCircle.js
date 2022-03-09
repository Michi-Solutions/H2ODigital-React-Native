import React from 'react'
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-svg'
import { ProgressCircle } from 'react-native-svg-charts'

export const Speedometer = (props) => {
  
    const maxSpeed = 100
    const speed = props.percentual
    
    const calculateSpeedForProgress = (speed, maxSpeed) => {
      return speed / maxSpeed
    }

    const colorChanging = () => {
        if (speed <= 49) {
            return "orange"
        } else if (speed <= 25) {
            return "red"
        } else {
            return "#57b5db"
        }
    }
  
    const calculatedProgress = calculateSpeedForProgress(speed, maxSpeed)
  
    return (
        
            <ProgressCircle
                    style={{ height: 120, paddingTop: 25 }}
                    progress={calculatedProgress}
                    progressColor={colorChanging()}
                    backgroundColor={'#BBBBBB'}
                    strokeWidth={7}
                    startAngle={-Math.PI / 2}
                    endAngle={Math.PI / 2}>
                <Text
                   x={1}
                   y={-12}
                   fill={'black'}
                   textAnchor={'middle'}
                   alignmentBaseline={'middle'}
                   fontSize={27}
                   fontWeight={'bolder'}
                   stroke={'white'}
                   opacity={'1'}
                   strokeWidth={0.4}>
                  {`${speed}%`}
                </Text>
              </ProgressCircle>
            )
  }

const styles = StyleSheet.create({

})

  export default Speedometer;