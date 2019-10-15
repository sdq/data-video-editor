import React, { Component } from 'react';
import ChartContainer from '@/charts/ChartContainer';

export default class ChartInteractionArea extends Component {
    render() {
        const chartInfo = this.props.currentElement.info();
        const data = this.props.dataList[chartInfo.dataIndex];
        console.log(chartInfo);
        return (
            <div style={{position:'absolute', zIndex:1, marginLeft: chartInfo.x, marginTop: chartInfo.y}}>
                <ChartContainer 
                    category={chartInfo.category}
                    type={chartInfo.type}
                    data={data}
                    spec={chartInfo.spec}
                    width={chartInfo.width} 
                    height={chartInfo.height}
                    onCanvas={false}
                    current={this.props.scenePosition}
                />
            </div>
        )
    }
}
