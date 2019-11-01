import React, { Component } from 'react';
import { Table } from 'antd';
import './datapreview.css';

const width = 280;
const height = 80;

export default class SimpleDataPreview extends Component {
    render() {
        let {currentData} = this.props;
        if(!currentData.data) return false;
        let fields = currentData.fields;
        const customizedColumns = fields.map((column,i)=> {
            column.title = column.name;
            column.dataIndex = column.name;
            // column.width = 100/(fields.length+1)+'%';
            column.key = i;
            delete column.sorter;
            return column;
        });

        const dataset = currentData.data;
        const data = dataset.length >= 8 ? dataset.slice(0,8) : dataset;
        return (
            <div className="simple-data-preview" style={{width: width, height: height+66}}>
                <Table 
                    columns={customizedColumns} 
                    dataSource={data} 
                    scroll={{ x: width, y: height}}
                    pagination={false}
                    rowKey={customizedColumns[0].title}
                    size="small"
                />
            </div>
        )
    }
}
