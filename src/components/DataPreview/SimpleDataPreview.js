import React, { Component } from 'react';
import { Table } from 'antd';
import data from '@/datasets/cars';
import columns from '@/datasets/carsSchema';
import './datapreview.css';

const width = 280;
const height = 160;

export default class SimpleDataPreview extends Component {
    render() {
        const customizedColumns = columns.map((column)=> {
            column.title = column.name;
            column.dataIndex = column.name;
            column.width = 150;
            delete column.sorter;
            return column;
        });
        const dataDemo = data.slice(0,8)
        return (
            <div className="simple-data-preview" style={{width: width, height: height+66}}>
                <Table 
                    columns={customizedColumns} 
                    dataSource={dataDemo} 
                    scroll={{ x: width, y: height}}
                    pagination={false}
                    rowKey={customizedColumns[0].title}
                    size="small"
                />
            </div>
        )
    }
}
