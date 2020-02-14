import React, { Component } from 'react';
import { Table, Input, InputNumber, Form, Button } from 'antd';
import _ from 'lodash';

const EditableContext = React.createContext();

class EditableCell extends Component {
    getInput = () => {
        if (this.props.inputType === 'number') {
            return <InputNumber />;
        }
        return <Input />;
    };

    renderCell = ({ getFieldDecorator }) => {
        const {
            editing,
            dataIndex,
            title,
            inputType,
            record,
            rowIndex,
            index,
            children,
            ...restProps
        } = this.props;

        return (
            <td {...restProps}>
                {editing ? (
                    <Form.Item style={{ margin: 0 }}>
                        {getFieldDecorator(dataIndex, {
                            rules: [
                                {
                                    required: true,
                                    message: `Please Input ${title}!`,
                                },
                            ],
                            initialValue: record[dataIndex],
                        })(this.getInput())}
                    </Form.Item>
                ) : (
                        children
                    )}
            </td>
        );
    };

    render() {
        return <EditableContext.Consumer>{this.renderCell}</EditableContext.Consumer>;
    }
}

class EditableTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: this.props.dataSource,
            editingKey: ''
        };
    }

    isEditing = record => record.key === this.state.editingKey;

    cancel = () => {
        this.setState({ editingKey: '' });
    };

    save(form, key) {
        form.validateFields((error, row) => {
            if (error) {
                return;
            }
            const newData = [...this.props.dataSource];
            const index = key

            if (index > -1) {
                const item = newData[index];
                newData.splice(index, 1, {
                    ...item,
                    ...row,
                });
                this.setState({ data: newData, editingKey: '' });
            } else {
                newData.push(row);
                this.setState({ data: newData, editingKey: '' });
            }
            this.props.handleDataUpdate(newData)
        });
    }

    edit(key) {
        this.setState({ editingKey: key });
    }

    render() {
        const components = {
            body: {
                cell: EditableCell,
            },
        };

        let editableColumns = _.cloneDeep(this.props.columns)
        editableColumns.push(
            {
                title: 'operation',
                dataIndex: 'operation',
                width: 120,
                key: 'operation',
                fixed: 'right',
                render: (text, record, index, dataIndex) => {
                    const { editingKey } = this.state;
                    const editable = this.isEditing(record);
                    return editable ? (
                        <span style={{display:'table'}}>
                            <EditableContext.Consumer>
                                {form => (
                                    <Button 
                                        onClick={() => this.save(form, record.key)}
                                        style={{background: 'none',border:'none',padding:0, marginRight: 8, width: '30px', display: 'table-cell' }}
                                    >
                                        Save
                                    </Button>
                                )}
                            </EditableContext.Consumer>
                            <Button onClick={() => this.cancel(record.key)} style={{background: 'none',border:'none', padding:0,width: '45px', display: 'table-cell'  }} >
                                Cancel
                            </Button>
                        </span>
                    ) : (
                            <Button style={{background: 'none',border:'none',padding:0, width: '26px',display: 'table-cell' }} disabled={editingKey !== ''} onClick={() => this.edit(record.key)}>
                                Edit
                        </Button>
                        );
                }
            }
        )
        const columns = editableColumns
            .map(col => {
                if (!col.editable) {
                    return col;
                }
                return {
                    ...col,
                    onCell: (record, rowIndex) => ({
                        record,
                        rowIndex,
                        dataIndex: col.dataIndex,
                        title: col.title,
                        editing: this.isEditing(record),
                    }),
                };
            });

          //  console.log(columns)
        return (
            <div style={{height:'100%',overflowY: "scroll"}}>
                <EditableContext.Provider value={this.props.form}>
                    <Table
                        components={components}
                        bordered
                        size={'small'}
                        dataSource={this.props.dataSource}
                        columns={columns}
                        scroll={{ x: 1300}}
                        // rowKey={columns[0].title + columns[1].title}
                        rowClassName="editable-row"
                        pagination={{
                            // pageSize: 10,
                            onChange: this.cancel,
                        }}
                    />
                </EditableContext.Provider>
            </div>
        );
    }
}

const EditableFormTable = Form.create()(EditableTable);

export default EditableFormTable;