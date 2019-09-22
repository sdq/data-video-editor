import React, { Component } from 'react';
import { Modal } from 'antd';
import FieldType from '@/constants/FieldType';
import EditableFormTable from './EditableFormTable.js'

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
        console.log(this.props)
        if (!currentData.data) return false;
        let fields = currentData.fields;
        const customizedColumns = fields.map((column, i) => {
            // column.key = i;
            column.title = column.name;
            column.dataIndex = column.name;
            if (column.type === FieldType.QUANTITATIVE) {
                column.sorter = (a, b) => a[column.name] - b[column.name]
            }
            column.width = 150;
            column.editable = true

            return column;
        });
        // console.log(customizedColumns);
        // const data = (currentData.name === "cars.csv" || !currentData.data) ? carsData : currentData.data;
        // console.log(data)
        return (
            <div>

                <Modal
                    title={currentData.name}
                    visible={this.props.visible}
                    onOk={this.handleOk}
                    width={1300}
                    // bodyStyle={{ height: data.length >=8 ? 600 : 600 - (8-data.length) * rowHeight }}
                    bodyStyle={{ height: 650 }}
                    onCancel={this.handleOk}
                >
                    {/* <Table style={{minHeight : 568 }}
                        columns={customizedColumns}
                        dataSource={data}
                        scroll={{ x: 1000, y: 450 }}
                        pagination={{ pageSize: 8 }}
                        rowKey={customizedColumns[0].title}
                    /> */}
                    <EditableFormTable columns={customizedColumns} dataSource={currentData.data} handleDataUpdate={this.handleDataUpdate}/>
                    {/* // TODO: button 位置因为显示不足8条数据而改变 */}
                    {/* <Button style={{ position: 'relative', top: 17, visibility: this.props.visible }} shape="circle" icon="edit" /> */}
                </Modal>
            </div>

        )
    }
}
