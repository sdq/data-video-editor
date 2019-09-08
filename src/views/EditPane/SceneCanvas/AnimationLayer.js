import React, { Component } from 'react';
import Konva from "konva";
import { Layer } from 'react-konva';
import ImageElement from '@/components/Elements/ImageElement';
import TextElement from '@/components/Elements/TextElement';
import ChartElement from '@/components/Elements/ChartElement';
import ElementType from '@/constants/ElementType';
import _ from 'lodash';

export default class AnimationLayer extends Component {

    constructor(props) {
        super(props);
        this.elementNodes = new Array(props.currentElements.length).fill({});
        this.animations = new Array(props.currentElements.length).fill({});
    }

    componentDidMount() {
        this.animationStart()
    }

    componentWillUnmount() {
        this.animationStop()
    }

    animationStart() {
        // TODO: animation test
        var period = 3000;
        for (let index = 0; index < this.props.currentElements.length; index++) {
            if (_.isEmpty(this.elementNodes[index])) {
                continue;
            }
            // this.animations[index] = new Konva.Animation(frame => {
            //     var angleDiff = (frame.timeDiff * angularSpeed) / 1000;
            //     this.elementNodes[index].rotate(angleDiff);
            // }, this.animationLayer);
            console.log(this.elementNodes);
            this.animations[index] = new Konva.Animation(function(frame) {
                var scale = Math.abs(Math.sin((frame.time * 2 * Math.PI) / period)) + 0.001;
                this.elementNodes[index].scale({ x: scale, y: scale });
            }.bind(this), this.animationLayer);
            this.animations[index].start();
        }
    }

    animationStop() {
        for (let index = 0; index < this.props.currentElements.length; index++) {
            if (_.isEmpty(this.animations[index])) {
                continue;
            }
            this.animations[index].stop();
        }
    }

    render() {
        return (
            <Layer 
                ref={node => (this.animationLayer = node)}
            >
                {this.props.currentScene.elements().map(function(element, index) {
                    switch (element.type()) {
                        case ElementType.TEXT:
                            return <TextElement 
                                // ref={node => (this.elementNodes[index] = node)}
                                key={this.props.sceneIndex+"-"+index} 
                                element={element} 
                                name={this.props.sceneIndex+"-"+index} 
                                draggable = {false} 
                                {...this.props}
                            />
                        case ElementType.IMAGE:
                            return <ImageElement 
                                ref={node => (this.elementNodes[index] = node)}
                                key={this.props.sceneIndex+"-"+index} 
                                element={element} 
                                name={this.props.sceneIndex+"-"+index} 
                                draggable = {false} 
                                {...this.props}
                            />
                        case ElementType.CHART:
                            return <ChartElement
                                // ref={node => (this.elementNodes[index] = node)} 
                                key={this.props.sceneIndex+"-"+index} 
                                element={element} 
                                name={this.props.sceneIndex+"-"+index}  
                                width={200} 
                                height={200} 
                                draggable = {false} {...this.props}/>
                        case ElementType.AUDIO:
                            return null;
                        default:
                            //TODO: remove
                            console.log("wrong!!!!!!!");
                            console.log(this.props.currentScene.elements());
                            console.log(element);
                            return;
                    }
                }.bind(this))}
            </Layer>
        )
    }
}
