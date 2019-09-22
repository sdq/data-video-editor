import React, { Component } from 'react';
import { Table, Input, InputNumber, Form } from 'antd';
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

    isEditing = rowIndex => rowIndex === this.state.editingKey;

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
                render: (text, record, rowIndex) => {
                    const { editingKey } = this.state;
                    const editable = this.isEditing(rowIndex);
                    return editable ? (
                    <span>
                        <EditableContext.Consumer>
                            {form => (
                            <button
                                onClick={() => this.save(form, rowIndex)}
                                style={{ marginRight: 8, width:'70px' }}
                            >
                                Save
                            </button>
                            )}
                        </EditableContext.Consumer>
                        <button style={{width:'70px'}} onClick={() => this.cancel(rowIndex)}>
                            Cancel
                        </button>
                    </span>
                    ) : (
                        <button style={{width:'70px'}} disabled={editingKey !== ''} onClick={() => this.edit(rowIndex)}>
                            Edit
                        </button>
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
                    editing: this.isEditing(rowIndex),
                }),
            };
        });

        return (
            <div>
                <EditableContext.Provider value={this.props.form}>
                    <Table
                        components={components}
                        bordered
                        dataSource={this.props.dataSource}
                        columns={columns}
                        // rowKey={rowIndex}
                        rowClassName="editable-row"
                        pagination={{
                            // TODO:
                            pageSize: 6,
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