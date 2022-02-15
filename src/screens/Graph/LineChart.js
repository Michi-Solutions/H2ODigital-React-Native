import React, { useRef, useState } from 'react';
// import * as React from 'react'
import {
    PanResponder,
    Dimensions,
    View,
} from 'react-native';
import { AreaChart, XAxis, YAxis } from 'react-native-svg-charts';
import {
    G,
    Line,
    Grid
} from 'react-native-svg';
import * as shape from 'd3-shape';

function LineChartExample() {
    const apx = (size = 0) => {
        let width = Dimensions.get('window').width;
        return (width / 830) * size;
    };

    const [dateList, setDateList] = useState([
        '05:00',
        '06:00',
        '07:00',
        '09:00',
        '10:00',
    ]);
    const [priceList, setPriceList] = useState([
        40,
        43,
        50,
        48,
        45,
    ]);
    const size = useRef(dateList.length);

    const [positionX, setPositionX] = useState(-1);// The currently selected X coordinate position

    const panResponder = useRef(
        PanResponder.create({
            // 要求成为响应者：
            onStartShouldSetPanResponder: (evt, gestureState) => true,
            onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
            onMoveShouldSetPanResponder: (evt, gestureState) => true,
            onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
            onPanResponderTerminationRequest: (evt, gestureState) => true,

            onPanResponderGrant: (evt, gestureState) => {
                updatePosition(evt.nativeEvent.locationX);
                return true;
            },
            onPanResponderMove: (evt, gestureState) => {
                updatePosition(evt.nativeEvent.locationX);
                return true;
            },
            onPanResponderRelease: () => {
                setPositionX(-1);
            },
        })
    );

    const updatePosition = (x) => {
        const YAxisWidth = apx(130);
        const x0 = apx(0);// x0 position
        const chartWidth = apx(750) - YAxisWidth - x0;
        const xN = x0 + chartWidth;//xN position
        const xDistance = chartWidth / size.current;// The width of each coordinate point
        if (x <= x0) {
            x = x0;
        }
        if (x >= xN) {
            x = xN;
        }

        // console.log((x - x0) )

        // The selected coordinate x :
        // (x - x0)/ xDistance = value
        let value = ((x - x0) / xDistance).toFixed(0);
        if (value >= size.current - 1) {
            value = size.current - 1; // Out of chart range, automatic correction
        }

        setPositionX(Number(value));
    };

    const CustomGrid = ({ x, y, ticks }) => (
        <G>
            {
                // Horizontal grid
                ticks.map((tick) => (
                    <Line
                        key={tick}
                        x1="0%"
                        x2="100%"
                        y1={y(tick)}
                        y2={y(tick)}
                        stroke="rgba(187, 187, 187, 0.6)"
                    />
                ))
            }
            {
                // Vertical grid
                priceList.map((_, index) => (
                    <Line
                        key={index.toString()}
                        y1="6%"
                        y2="94%"
                        x1={x(index)}
                        x2={x(index)}
                        stroke="rgba(187, 187, 187, 0.6)"
                    />
                ))
            }
        </G>
    );

    const verticalContentInset = { top: apx(40), bottom: apx(40) };

    return (
        <View
            style={{
                backgroundColor: '#EFEFEF',
                alignItems: 'stretch',
            }}>
            <View
                style={{
                    flexDirection: 'row',
                    width: apx(740),
                    height: apx(700),
                    alignSelf: 'stretch',
                }}>
                <View style={{ flex: 1 }} {...panResponder.current.panHandlers}>
                    <AreaChart
                        style={{ flex: 1 }}
                        data={priceList}
                        // curve={shape.curveNatural}
                        curve={shape.curveMonotoneX}
                        contentInset={{ ...verticalContentInset }}
                        svg={{ fill: 'rgba(166, 206, 227, 0.8)' }}
                        gridMin={0}
                        gridMax={70}>
                        <CustomGrid/>
                    </AreaChart>
                </View>

                <YAxis
                    style={{ width: apx(85) }}
                    data={priceList}
                    contentInset={verticalContentInset}
                    svg={{ fontSize: apx(30), fill: '#A3A3A3' }}
                    numberOfTicks={5}
                    min={0}
                    max={70}
                />
            </View>
        
            <XAxis
                style={{
                    alignSelf: 'stretch',
                    width: apx(760),
                    height: apx(60),
                }}
                data={priceList}
                formatLabel={(value, index) => dateList[value]}
                contentInset={{
                    left: apx(35),
                    right: apx(135),
                }}
                svg={{
                    fontSize: apx(30),
                    fill: '#A3A3A3',
                    // originY: 30,
                }}
            />
        </View>
    );
}

export default LineChartExample;