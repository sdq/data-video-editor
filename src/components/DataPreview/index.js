import React, { Component } from 'react';
import { Modal } from 'antd';
import FieldType from '@/constants/FieldType';
import EditableFormTable from './EditableFormTable';

export default class DataPreview extends Component {

    constructor(props) {
        super(props);
        this.handleOk = this.handleOk.bind(this);
    }

    handleOk() {
        this.props.handleOk();
    }

    handleDataUpdate = (data) => {
        this.props.handleDataUpdate(data)
    }

    render() {
        let { currentData } = this.props;
        if (!currentData.data) return false;
        let fields = currentData.fields;
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

        let tableData = []
        currentData.data.forEach((d,i) => {
            let dataItem = d
            d.key = i
            tableData.push(dataItem)
        });

        return (
            <div>

                <Modal
                    title={currentData.name}
                    visible={this.props.visible}
                    onOk={this.handleOk}
                    width={1300}
                    bodyStyle={{ height: 650 }}
                    onCancel={this.handleOk}
                >
                    <EditableFormTable columns={customizedColumns} dataSource={tableData} handleDataUpdate={this.handleDataUpdate}/>
                </Modal>
            </div>

        )
    }
}
