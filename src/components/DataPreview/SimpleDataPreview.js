import React, { Component } from 'react';
import { Table } from 'antd';
import columns from './mockcolumns';
import data from '@/datasets/cars';
import './datapreview.css';

const width = 280;
const height = 200;

export default class SimpleDataPreview extends Component {
    render() {
        const customizedColumns = columns.map((column)=> {
            column.width = 150;
            column.dataIndex = column.title;
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
                />
            </div>
        )
    }
}
