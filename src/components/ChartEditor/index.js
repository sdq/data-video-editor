import React, { Component } from 'react';
import { Modal, Layout } from 'antd';
import ChartPanel from './ChartPanel';
import MappingPanel from './MappingPanel';
import './charteditor.css';
import carsSchema from '@/datasets/carsSchema';

const { Sider, Content } = Layout;

export default class ChartEditor extends Component {

    render() {
        return (
            <Modal
                title="Chart Editor"
                visible={this.props.visible}
                onOk={this.props.handleOk}
                width={1200}
                bodyStyle={{height: 600, padding: 0}}
                onCancel={this.props.handleCancel}
            >
                <Layout style={{ height: '600px' }}>
                    <Sider width={420} className="pane">
                        <MappingPanel currentFields={carsSchema} slots={this.props.slots}  {...this.props}/>
                    </Sider>
                    <Layout>
                    <Content className="pane">
                        <ChartPanel data={this.props.currentData.data} spec={this.props.displaySpec} {...this.props}/>
                    </Content>
                    </Layout>
                </Layout>
            </Modal>
        )
    }
}