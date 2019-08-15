import React, { Component } from 'react';
import { Modal, Table } from 'antd';
import data from '@/datasets/cars';

const columns = [
    {
      title: 'Name',
      dataIndex: 'Name',
      width: 150,
    },
    {
      title: 'Cylinders',
      dataIndex: 'Cylinders',
      sorter: (a, b) => a.Cylinders - b.Cylinders,
      width: 150,
    },
    {
      title: 'Origin',
      dataIndex: 'Origin',
      width: 150,
    },
    {
        title: 'Acceleration',
        dataIndex: 'Acceleration',
        sorter: (a, b) => a.Acceleration - b.Acceleration,
        width: 150,
    },
    {
        title: 'Miles_per_Gallon',
        dataIndex: 'Miles_per_Gallon',
        sorter: (a, b) => a.Miles_per_Gallon - b.Miles_per_Gallon,
        width: 150,
    },
    {
        title: 'Displacement',
        dataIndex: 'Displacement',
        sorter: (a, b) => a.Cylinders - b.Cylinders,
        width: 150,
    },
    {
        title: 'Horsepower',
        dataIndex: 'Horsepower',
        sorter: (a, b) => a.Horsepower - b.Horsepower,
        width: 150,
    },
    {
        title: 'Weight_in_lbs',
        dataIndex: 'Weight_in_lbs',
        sorter: (a, b) => a.Weight_in_lbs - b.Weight_in_lbs,
        width: 150,
    },
    {
        title: 'Year',
        dataIndex: 'Year',
        sorter: (a, b) => a.Year - b.Year,
        width: 150,
    },
];

export default class DataPreview extends Component {

    constructor(props) {
        super(props);
        this.handleOk = this.handleOk.bind(this);
    }

    handleOk() {
        this.props.handleOk();
    }

    render() {
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
                    columns={columns} 
                    dataSource={data} 
                    scroll={{ x: 1000, y: 450}}
                    pagination={{ pageSize: 8 }}
                />
            </Modal>
        )
    }
}
