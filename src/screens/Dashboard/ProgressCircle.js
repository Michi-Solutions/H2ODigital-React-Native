import React from 'react'
import { PieChart } from 'react-native-svg-charts'
import { Text } from 'react-native-svg'

class PieChartWithCenteredLabels extends React.PureComponent {

    render() {

        const data = [
            {
                key: 1,
                amount: 100 - this.props.percentual,
                svg: { fill: '#BBBBBB' },
                arc: { cornerRadius: 10 }
            },
            {
                key: 2,
                amount: this.props.percentual,
                svg: { fill: '#57b5db' },
                arc: { cornerRadius: 10 }
            }
        ]

        const Labels = ({ slices, height, width }) => {
            return slices.map((slice, index) => {
                const { labelCentroid, pieCentroid, data } = slice;
                return (
                    <Text
                        key={index}
                        x={pieCentroid[ 0 ]}
                        y={pieCentroid[ 1 ]}
                        fill={'black'}
                        textAnchor={'middle'}
                        alignmentBaseline={'middle'}
                        fontSize={14}
                        stroke={'black'}
                        strokeWidth={0.2}
                    >
                        {data.amount}
                    </Text>
                )
            })
        }

        return (
            <PieChart
                style={{ height: 100, marginTop: 10 }}
                valueAccessor={({ item }) => item.amount}
                data={data}
                spacing={0}
                outerRadius={'35'}
                innerRadius={50}
            >
                <Labels/>
            </PieChart>
        )
    }

}

export default PieChartWithCenteredLabels