import React, { Component } from 'react';
import { Modal, Table } from 'antd';
import FieldType from '@/constants/FieldType';
import data from '@/datasets/cars';
import columns from '@/datasets/carsSchema';

export default class DataPreview extends Component {

    constructor(props) {
        super(props);
        this.handleOk = this.handleOk.bind(this);
    }

    handleOk() {
        this.props.handleOk();
    }

    render() {
        const customizedColumns = columns.map((column)=> {
            column.title = column.name;
            column.dataIndex = column.name;
            if (column.type === FieldType.QUANTITATIVE) {
                column.sorter = (a, b) => a[column.name] - b[column.name]
            }
            column.width = 150;
            return column;
        });
        return (
            <Modal
                title="cars.csv"
                visible={this.props.visible}
                onOk={this.handleOk}
                width={1200}
                bodyStyle={{height: 600}}
                onCancel={this.handleOk}
            >
                <Table 
                    columns={customizedColumns} 
                    dataSource={data} 
                    scroll={{ x: 1000, y: 450}}
                    pagination={{ pageSize: 8 }}
                    rowKey={customizedColumns[0].title}
                />
            </Modal>
        )
    }
}
