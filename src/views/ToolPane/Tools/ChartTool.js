import React, { Component } from 'react'
import { Upload, Divider, Button, Icon, Select } from 'antd';
import ChartEditor from '@/components/ChartEditor';
// import ChartContainer from '@/charts/ChartContainer';
// import { SketchPicker } from 'react-color';

export default class ChartTool extends Component {

    constructor(props) {
        super(props);
        this.state = {
            chartvisible: false,
            displayColorPicker: false,
        };
        this.handleChartOk = this.handleChartOk.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
    };

    handleClick = () => {
        this.setState({ displayColorPicker: !this.state.displayColorPicker })
    };

    handleClose = () => {
        this.setState({ displayColorPicker: false })
    };

    handleChartEditor = () => {
        console.log("handleChartEditor");
        console.log(this.props.currentVis);
        this.props.openEditor(this.props.currentVis.dataIndex, this.props.currentVis.spec);
        this.setState({
            chartvisible: true,
        });
    }

    handleDataOk = () => {
        // TODO: Update Data

        // Disable editor
        this.setState({
            chartvisible: false,
        });
    }

    handleChartOk = () => {
        // Update chart on canvas
        const newScene = Object.assign({},this.props.currentScene);
        var newEle = Object.assign({},this.props.currentElement);
        newEle.info().spec = this.props.displaySpec;
        console.log("new element");
        console.log(newEle);
        newScene.elements[this.props.elementIndex] = newEle;
        this.props.updateScene(this.props.sceneIndex, newScene);
        this.props.updateElement(newEle, this.props.elementIndex);
        // Disable editor
        this.setState({
            chartvisible: false,
        });
    }

    handleCancel() {
        this.setState({
            chartvisible: false,
        });
    };

    render() {
        return (
            <div style={{padding: '10px 10px 10px 10px', fontSize: '14px'}}>
                <Divider>Data</Divider>

                <Divider>Chart</Divider>

                <Button block style={{marginTop: '8px'}} onClick={this.handleChartEditor} type="primary">Open Chart Editor</Button>

                <ChartEditor 
                    visible={this.state.chartvisible}
                    handleOk={this.handleChartOk}
                    handleCancel={this.handleCancel}
                    {...this.props}
                />
            </div>
        )
    }
}

