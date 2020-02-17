import React, { Component } from 'react';
import { Collapse, List } from 'antd';
import LazyLoad from 'react-lazyload';
import ChartCard from '@/components/ChartCard';
import ChartCategory from '@/constants/ChartCategory';
import './charttab.css';
//import {vegaliteCharts, d3Charts} from './chartList';
import {d3Charts} from './chartList';

const { Panel } = Collapse;

export default class ChartTab extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeKey: ChartCategory.VEGALITE
        }
    }

    callback = (key) => {
        switch (key) {
            case ChartCategory.VEGALITE:
                this.setState({
                    activeKey: ChartCategory.VEGALITE
                })
                break;
            case ChartCategory.D3:
                this.setState({
                    activeKey: ChartCategory.D3
                })
                break;

            default:
                this.setState({
                    activeKey: ""
                })
                break;
        }
    };

    render() {
        return (
            <div className="charttab" style={{ height: this.props.contentHeight}}>
                <Collapse accordion bordered={false} activeKey={ChartCategory.D3} onChange={this.callback} style={{ height: this.props.contentHeight-25 }}>
                    {/* <Panel header={"VegaLite (" + vegaliteCharts.length + ")"} key={ChartCategory.VEGALITE} className="collaspe-panel">
                        <List
                            grid={{ gutter: 17, column: 3 }}
                            dataSource={vegaliteCharts}
                            renderItem={item => (
                            <List.Item>
                                <LazyLoad>
                                    <ChartCard 
                                        chartcategory={ChartCategory.VEGALITE}
                                        chartsrc={item.src} 
                                        charttype={item.chart} 
                                        {...this.props}
                                    />
                                </LazyLoad>
                            </List.Item>
                            )}
                        />
                    </Panel> */}
                    <Panel header={"Visualization (" + d3Charts.length + ")"} key={ChartCategory.D3} activeKey={ChartCategory.D3} className="collaspe-panel">
                        <List
                            grid={{ gutter: 17, column: 3 }}
                            dataSource={d3Charts}
                            renderItem={item => (
                            <List.Item>
                                <LazyLoad>
                                    <ChartCard 
                                        chartcategory={ChartCategory.D3}
                                        chartsrc={item.src} 
                                        charttype={item.chart} 
                                        chartname={item.name}
                                        {...this.props}
                                    />
                                </LazyLoad>
                            </List.Item>
                            )}
                        />
                    </Panel>
                </Collapse>
                
            </div>
        )
    }
}
