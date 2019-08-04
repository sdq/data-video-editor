import React, { Component } from 'react';
import { Input } from 'antd';
const { TextArea } = Input;

export default class TextTab extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <TextArea rows={4} />
            </div>
        )
    }
}
