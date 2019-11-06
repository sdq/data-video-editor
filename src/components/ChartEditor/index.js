import React, { Component } from 'react';
import { Modal, Layout, Tabs } from 'antd';
import ChartPanel from './ChartPanel';
import MappingPanel from './MappingPanel';
import { ChartStyleConfigure } from '@/charts/Info';
import './charteditor.css';
import carsSchema from '@/datasets/carsSchema';

const { Sider, Content } = Layout;
const { TabPane } = Tabs;

export default class ChartEditor extends Component {

    handleConfigureOk = (spec) => {
        this.props.visConfigure(spec.configure);
        // Update chart on canvas
        const newScene = Object.assign({}, this.props.currentScene);
        let newEle = Object.assign({}, this.props.currentElement);
        newEle.info().spec = spec;
        newScene.updateElement(newEle, this.props.elementIndex);
        this.props.updateScene(this.props.sceneIndex, newScene);
        const elementName = this.props.sceneIndex + '-' + this.props.elementIndex;
        this.props.updateElement(newEle, this.props.elementIndex, elementName);
    }

    render() {
        const {currentElement} = this.props;
        const chartInfo = currentElement.info();
        const chart = <ChartPanel data={this.props.currentData.data} spec={this.props.displaySpec} {...this.props}/>;
        return (
            <Modal
                title="Chart Editor"
                visible={this.props.visible}
                onOk={this.props.handleOk}
                width={1200}
                bodyStyle={{height: 600, padding: 0}}
                onCancel={this.props.handleCancel}
            >
                <Layout style={{ height: '600px'}}>
                    <Sider width={420} className="pane">
                        <Tabs>
                            <TabPane tab="Data" key="Data" style={{padding: 8}}>
                                Data Setting
                            </TabPane>
                            <TabPane tab="Mapping" key="Mapping" style={{padding: 8}}>
                                <MappingPanel currentFields={carsSchema} channels={this.props.channels}  {...this.props}/>
                            </TabPane>
                            <TabPane tab="Style" key="Style" style={{padding: 8}}>
                                <ChartStyleConfigure chartCategory={chartInfo.category} chartType={chartInfo.type} spec={chartInfo.spec} handleConfigureOk={this.handleConfigureOk} {...this.props}/>
                            </TabPane>
                            <TabPane tab="Animation" key="Animation" style={{padding: 8}}>
                                Animation Setting
                            </TabPane>
                        </Tabs>
                    </Sider>
                    <Layout>
                    <Content className="pane">
                        {chart}
                    </Content>
                    </Layout>
                </Layout>
                {/* <Tabs>
                    <TabPane tab="Data" key="Data" style={{marginTop: -16}}>
                        Content of Tab Pane 1
                    </TabPane>
                    <TabPane tab="Mapping" key="Mapping" style={{marginTop: -16}}>
                        <Layout style={{ height: '600px'}}>
                            <Sider width={420} className="pane">
                                <MappingPanel currentFields={carsSchema} channels={this.props.channels}  {...this.props}/>
                            </Sider>
                            <Layout>
                            <Content className="pane">
                                {chart}
                            </Content>
                            </Layout>
                        </Layout>
                    </TabPane>
                    <TabPane tab="Style" key="Style" style={{marginTop: -16}}>
                        <Layout style={{ height: '600px'}}>
                            <Sider width={420} className="pane">
                                <ChartStyleConfigure chartCategory={chartInfo.category} chartType={chartInfo.type} spec={chartInfo.spec} handleConfigureOk={this.handleConfigureOk} {...this.props}/>
                            </Sider>
                            <Layout>
                            <Content className="pane">
                                {chart}
                            </Content>
                            </Layout>
                        </Layout>
                    </TabPane>
                </Tabs> */}
            </Modal>
        )
    }
}