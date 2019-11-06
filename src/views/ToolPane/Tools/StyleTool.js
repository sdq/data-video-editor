import React, { Component } from 'react';
import { ChartStyleConfigure } from '@/charts/Info';

export default class StyleTool extends Component {

    constructor(props) {
        super(props);
        this.state = {
            displayColorPicker: false,
        };
    };

    handleClick = () => {
        this.setState({ displayColorPicker: !this.state.displayColorPicker })
    };

    handleClose = () => {
        this.setState({ displayColorPicker: false })
    };

    handleConfigureOk = (spec) => {
        this.props.configureStyle(spec.style);
        // Update chart on canvas
        const newScene = Object.assign({}, this.props.currentScene);
        let newEle = Object.assign({}, this.props.currentElement);
        newEle.info().spec = spec;
        newScene.updateElement(newEle, this.props.elementIndex);
        this.props.updateScene(this.props.sceneIndex, newScene);
        const elementName = this.props.sceneIndex + '-' + this.props.elementIndex;
        this.props.updateElement(newEle, this.props.elementIndex, elementName);
    }

    render() {
        const {currentElement} = this.props;
        const chartInfo = currentElement.info();
        return (
            <div style={{padding: '5px 10px 10px 10px', fontSize: '14px', backgroundColor: 'white',overflow: 'auto'}}>
                <ChartStyleConfigure chartCategory={chartInfo.category} chartType={chartInfo.type} spec={chartInfo.spec} handleConfigureOk={this.handleConfigureOk} {...this.props}/>
            </div>
        )
    }
}

