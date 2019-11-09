import React, { Component } from 'react';
import { Modal, Layout, Tabs} from 'antd';
import FieldType from '@/constants/FieldType';
import EditableFormTable from '@/components/DataPreview/EditableFormTable';
import ChartPanel from './ChartPanel';
import MappingPanel from './MappingPanel';
import DataPanel from './DataPanel'
import { ChartStyleConfigure } from '@/charts/Info';
import carsSchema from '@/datasets/carsSchema';
import './charteditor.css';

const { Sider, Content } = Layout;
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
        const { currentElement, dataNameList, currentData } = this.props;
        if (!currentData.data) return null;
        const fields = currentData.fields;
        const customizedColumns = fields.map((column, i) => {
            column.title = column.name;
            column.dataIndex = column.name;
            if (column.type === FieldType.QUANTITATIVE) {
                column.sorter = (a, b) => a[column.name] - b[column.name]
            }
            column.key = i;
            column.editable = true
            return column;
        });
        const chartInfo = currentElement.info();
        const datapreview = <EditableFormTable columns={customizedColumns} dataSource={currentData.data} handleDataUpdate={this.handleDataUpdate} />
        const chart = <ChartPanel data={this.props.currentData.data} spec={this.props.displaySpec} showAnimation={showAnimation} {...this.props} />;
        return (
            <Modal
                title="Chart Editor"
                visible={this.props.visible}
                onOk={this.props.handleOk}
                width={1200}
                bodyStyle={{ height: 600, padding: 0 }}
                onCancel={this.props.handleCancel}
            >
                <Layout style={{ height: '600px' }}>
                    <Sider width={420} className="pane">
                        <Tabs defaultActiveKey='Mapping' onChange={this.changeTab}>
                            <TabPane tab="Data" key="Data" style={{ padding: 8 }}>
                                <DataPanel currentData={currentData} dataNameList={dataNameList} {...this.props} />
                            </TabPane>
                            <TabPane tab="Mapping" key="Mapping" style={{ padding: 8 }}>
                                <MappingPanel currentFields={carsSchema} channels={this.props.channels}  {...this.props} />
                            </TabPane>
                            <TabPane tab="Style" key="Style" style={{ padding: 8 }}>
                                <ChartStyleConfigure chartCategory={chartInfo.category} chartType={chartInfo.type} spec={chartInfo.spec} handleConfigureOk={this.handleConfigureOk} {...this.props} />
                            </TabPane>
                            <TabPane tab="Animation" key="Animation" style={{ padding: 8 }}>
                                Animation Setting
                            </TabPane>
                        </Tabs>
                    </Sider>
                    <Layout>
                        <Content className="pane">
                            {showChart ? chart : datapreview}
                        </Content>
                    </Layout>
                </Layout>
            </Modal>
        )
    }
}