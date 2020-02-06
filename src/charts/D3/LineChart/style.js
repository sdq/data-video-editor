import React, { Component } from 'react';
import { Checkbox, Divider } from 'antd';

export default class Style extends Component {

    onChangeX = (e) => {
        let {spec} = this.props;
        spec.style.showAxisX = e.target.checked;
        this.props.handleConfigureOk(spec);
    }

    onChangeY = (e) => {
        let {spec} = this.props;
        spec.style.showAxisY = e.target.checked;
        this.props.handleConfigureOk(spec);
    }

    onChangeGrid = (e) => {
        let {spec} = this.props;
        spec.style.showGrid = e.target.checked;
        this.props.handleConfigureOk(spec);
    }

    render() {
        let {spec} = this.props;
        return (
            <div>
                <Divider>Axis Style</Divider>
                <div>
                    <Checkbox defaultChecked={spec.style.showAxisX} onChange={this.onChangeX}>Show Axis X</Checkbox>
                </div>
                <div>
                    <Checkbox defaultChecked={spec.style.showAxisY} onChange={this.onChangeY}>Show Axis Y</Checkbox>
                </div>
                <div>
                    <Checkbox defaultChecked={spec.style.showGrid} onChange={this.onChangeGrid}>Show Gridlines</Checkbox>
                </div>
            </div>
            
        )
    }
}
