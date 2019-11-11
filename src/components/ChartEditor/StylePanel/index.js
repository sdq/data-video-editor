import React, { Component } from 'react';
import { ChartStyleConfigure } from '@/charts/Info';

export default class StylePanel extends Component {

    handleConfigureOk = (spec) => {
        this.props.configureStyle(spec.style);
        // Update chart on canvas
        // const newScene = Object.assign({}, this.props.currentScene);
        // let newEle = Object.assign({}, this.props.currentElement);
        // newEle.info().spec = spec;
        // newScene.updateElement(newEle, this.props.elementIndex);
        // this.props.updateScene(this.props.sceneIndex, newScene);
        // const elementName = this.props.sceneIndex + '-' + this.props.elementIndex;
        // this.props.updateElement(newEle, this.props.elementIndex, elementName);
    }

    render() {
        const {currentElement} = this.props;
        const chartInfo = currentElement.info();
        return (
            <ChartStyleConfigure chartCategory={chartInfo.category} chartType={chartInfo.type} spec={chartInfo.spec} handleConfigureOk={this.handleConfigureOk} {...this.props}/>
        )
    }
}
