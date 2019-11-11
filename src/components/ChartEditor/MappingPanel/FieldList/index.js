import React, { Component } from 'react';
import { List } from 'antd';
import './fieldlist.css';
import Field from '../Field';

export default class FieldList extends Component {
    render() {
        return (
            <div className="column-list-container">
                <List
                    size="small"
                    split = {false}
                    dataSource={this.props.currentData.fields}
                    renderItem={item => <List.Item>
                        <Field field={item} { ...this.props }/>
                    </List.Item>}
                />
            </div>
        )
    }
}