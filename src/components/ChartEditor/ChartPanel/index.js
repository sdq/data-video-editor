import React, { Component } from 'react';
import ChartContainer from '@/charts/ChartContainer';
import './chartpanel.css';

export default class ChartPanel extends Component {

    render() {
        return (
            <div style={{textAlign: 'center'}}>
                <ChartContainer element={this.props.currentElement} width={530} height={530} data={this.props.data} spec={this.props.spec}/>
            </div>
        )
    }
}
