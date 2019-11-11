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
        const {currentVis, displaySpec} = this.props;
        return (
            <ChartStyleConfigure chartCategory={"D3"} chartType={currentVis.type} spec={displaySpec} handleConfigureOk={this.handleConfigureOk} {...this.props}/>
        )
    }
}
