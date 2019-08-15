import React, { Component } from 'react';
import { List } from 'antd';
import LazyLoad from 'react-lazyload';
import ChartCard from '@/components/ChartCard';
import './charttab.css';
import data from './data';

export default class ChartTab extends Component {
    render() {
        return (
            <div className="charttab">
                <List
                    grid={{ gutter: 17, column: 3 }}
                    dataSource={data}
                    renderItem={item => (
                    <List.Item>
                        <LazyLoad><ChartCard chartsrc={item.src} charttype={item.chart} {...this.props}/></LazyLoad>
                    </List.Item>
                    )}
                />
            </div>
        )
    }
}
