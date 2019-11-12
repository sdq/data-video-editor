import React, { Component } from 'react';
import ChartCategory from '@/constants/ChartCategory';
import d3Channels from './D3/channels';
import vegaliteChannels from './VegaLite/channels';
import d3DefaultSpec from './D3/spec';
import vegaliteDefaultSpec from './VegaLite/default';
import D3ConfigureStyle from './D3/style';
import VegaliteConfigure from './VegaLite/configure';
import d3Animations from './D3/animations';

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

export function getAnimations(chartCategory, chartType) {
    switch (chartCategory) {
        case ChartCategory.D3:
            return d3Animations(chartType);
    
        default:
            return [];
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
        <D3ConfigureStyle chartType={chartType} {...this.props}/>:
        <VegaliteConfigure chartType={chartType} {...this.props}/>
        return (
            <div>
                {styleConfigure}
            </div>
        )
    }
}
