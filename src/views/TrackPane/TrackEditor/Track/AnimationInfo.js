import React, { Component } from 'react';
import {Icon} from 'antd'; 
import ConfigureBase from '@/animation/Configure/ConfigureBase';
import './track.css';

export default class AnimationInfo extends Component {

    constructor(props) {
        super(props);
        this.state = {
            configVisible: false
        }
        this.configAnimation = this.configAnimation.bind(this);
        this.deleteAnimation = this.deleteAnimation.bind(this);
    }

    deleteAnimation() {
        const newScene = Object.assign({},this.props.currentScene);
        const newElement = Object.assign({},this.props.element);
        newElement.remove(this.props.animationIndex);
        newScene.updateElement(newElement, this.props.elementIndex);
        this.props.updateScene(this.props.sceneIndex, newScene);
        const elementName = this.props.sceneIndex + '-' + this.props.elementIndex;
        this.props.updateElement(newElement, this.props.elementIndex, elementName);
    }

    configAnimation() {
        // TODO: config animation
        this.setState({configVisible: true})
    }

    handleOk = () => {
        this.setState({configVisible: false})
    }

    handleCancel = () => {
        this.setState({configVisible: false})
    }

    render() {
        let {animation} = this.props;
        return (
            <div className="trackinfo" style={{backgroundColor: '#ffffff'}}>
                <p style={{float: 'left', marginLeft: 42, width: 100, whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis'}}>
                    {animation.name()}
                </p>
                <div style={{float: 'right', marginLeft: 8}} onClick={this.deleteAnimation}>
                    <Icon type="delete" />
                </div>
                <div style={{float: 'right', marginLeft: 8}} onClick={this.configAnimation}>
                    <Icon type="setting" />
                </div>
                <ConfigureBase 
                    visible={this.state.configVisible}
                    animation={animation}
                    handleOk={this.handleOk}
                    handleCancel={this.handleCancel}
                />
            </div>
        )
    }
}
