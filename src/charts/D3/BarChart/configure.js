import React, { Component } from 'react';
import { Checkbox } from 'antd';

export default class configure extends Component {

    onChangeX = (e) => {
        let {spec} = this.props;
        spec.configure.showAxisX = e.target.checked;
        this.props.handleConfigureOk(spec);
    }

    onChangeY = (e) => {
        let {spec} = this.props;
        spec.configure.showAxisY = e.target.checked;
        this.props.handleConfigureOk(spec);
    }

    render() {
        let {spec} = this.props;
        return (
            <div>
                D3 BarChart Configure
                <br/>
                <Checkbox defaultChecked={spec.configure.showAxisX} onChange={this.onChangeX}>Show Axis X</Checkbox>
                <br/>
                <Checkbox defaultChecked={spec.configure.showAxisY} onChange={this.onChangeY}>Show Axis Y</Checkbox>
            </div>
        )
    }
}
