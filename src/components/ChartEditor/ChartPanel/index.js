import React, { Component } from 'react';
import ChartContainer from '@/charts/ChartContainer';
import './chartpanel.css';

export default class ChartPanel extends Component {

    render() {
        const chartInfo = this.props.currentElement.info();
        return (
            <div style={{textAlign: 'center'}}>
                <ChartContainer 
                    category={chartInfo.category}
                    type={chartInfo.type}
                    data={this.props.data}
                    spec={this.props.spec}
                    width={530} 
                    height={530}
                    current={this.props.scenePosition}
                />
            </div>
        )
    }
}
