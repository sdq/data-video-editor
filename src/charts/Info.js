import React, { Component } from 'react';
import ChartCategory from '@/constants/ChartCategory';
import d3Channels from './D3/channels';
import vegaliteChannels from './VegaLite/channels';
import d3DefaultSpec from './D3/default';
import vegaliteDefaultSpec from './VegaLite/default';
import D3Configure from './D3/configure';
import VegaliteConfigure from './VegaLite/configure';

export function getChannels(chartCategory, chartType) {
    switch (chartCategory) {
        case ChartCategory.D3:
            return d3Channels(chartType);
        
        case ChartCategory.VEGALITE:
            return vegaliteChannels(chartType);
    
        default:
            return {};
    }
}

export function getDefaultSpec(chartCategory, chartType) {
    switch (chartCategory) {
        case ChartCategory.D3:
            return d3DefaultSpec(chartType);
        
        case ChartCategory.VEGALITE:
            return vegaliteDefaultSpec();
    
        default:
            return {};
    }
}

export class ChartStyleConfigure extends Component {
    render() {
        let {chartCategory, chartType} = this.props;
        let styleConfigure = (chartCategory === ChartCategory.D3)?
        <D3Configure chartType={chartType} {...this.props}/>:
        <VegaliteConfigure chartType={chartType} {...this.props}/>
        return (
            <div>
                {styleConfigure}
            </div>
        )
    }
}
