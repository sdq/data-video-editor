import React, { Component } from 'react';
import EditableFormTable from '@/components/DataPreview/EditableFormTable';
import FieldType from '@/constants/FieldType';

export default class TablePanel extends Component {

    handleDataUpdate = (data) => {
        this.props.updateData(this.props.currentData.dataIndex, data, this.props.fieldsList[this.props.currentData.dataIndex])
    }
    
    render() {
        const {currentData} = this.props;
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
        return (
            <EditableFormTable columns={customizedColumns} dataSource={currentData.data} handleDataUpdate={this.handleDataUpdate}/>
        )
    }
}
