import React, { Component } from 'react';
import {Layout, Tabs } from 'antd';
import DataPanel from './DataPanel';
import MappingPanel from './MappingPanel';
import StylePanel from './StylePanel';
import AnimationPanel from './AnimationPanel';
import ChartPanel from './ChartPanel';
import TablePanel from './TablePanel';
import carsSchema from '@/datasets/carsSchema';
import './charteditor.css';

const { Sider, Content, Footer, Header } = Layout;
const { TabPane } = Tabs;

export default class ChartEditor extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showChart: true,
            showAnimation: false,
        }
    }

    changeTab = (key) => {
        if (key === 'Data') {
            this.setState({
                showChart: false,
                showAnimation: false,
            })
        } else if (key === 'Animation') {
            this.setState({
                showChart: true,
                showAnimation: true,
            })
        } else {
            this.setState({
                showChart: true,
                showAnimation: false,
            })
        }
    }

    render() {
        const { showChart, showAnimation } = this.state;
        const { currentData, displaySpec } = this.props;
        if (!currentData.data) return null;
        const datapreview = <TablePanel {...this.props} />
        const chart = <ChartPanel data={currentData.data} spec={displaySpec} showAnimation={showAnimation} {...this.props} />;
        return (
            <div>
                <Header><div style={{width: 200, height: 31, float: 'left', color: 'white'}}>Animated Chart Development</div></Header>
                <Layout style={{ height: '600px' }}>
                    <Sider width={420} className="pane">
                        <Tabs defaultActiveKey='Mapping' onChange={this.changeTab}>
                            <TabPane tab="Data" key="Data" style={{ padding: 8 }}>
                                <DataPanel {...this.props} />
                            </TabPane>
                            <TabPane tab="Mapping" key="Mapping" style={{ padding: 8 }}>
                                <MappingPanel currentFields={carsSchema} channels={this.props.channels}  {...this.props} />
                            </TabPane>
                            <TabPane tab="Style" key="Style" style={{ padding: 8 }}>
                                <StylePanel {...this.props} />
                            </TabPane>
                            <TabPane tab="Animation" key="Animation" style={{ padding: 8 }}>
                                <AnimationPanel {...this.props} />
                            </TabPane>
                        </Tabs>
                    </Sider>
                    <Layout>
                        <Content className="pane">
                                {showChart ? chart : datapreview}
                            </Content>
                    </Layout>
                </Layout>
                <Footer style={{ textAlign: 'center' }}>Animated Chart Development. iDVX Lab, Tongji University</Footer>
            </div>
        )
    }
}