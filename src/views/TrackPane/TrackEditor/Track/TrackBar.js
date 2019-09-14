import React, { Component } from 'react';
import { Rnd } from "react-rnd";
import Color from '@/constants/Color';
import ElementType from '@/constants/ElementType';

const y = 0;
const height = 22;

export default class TrackBar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isDragging: false,
            isResizing: false
        };
        this.clickBar = this.clickBar.bind(this);
        this.leaveBar = this.leaveBar.bind(this);
        this.dragBar = this.dragBar.bind(this);
        this.resizeBar = this.resizeBar.bind(this);
    }

    clickBar() {
        this.props.clickBar();
    }

    leaveBar() {
        if (!this.state.isDragging && !this.state.isResizing) {
            this.props.leaveBar();
        }
    }

    dragBar(x) {
        const newX = x / this.props.sceneScale;
        this.adjustElementDuration(newX, this.props.element.duration(), this.props.currentScene.duration());
    }

    resizeBar(x, width) {
        const newX = x / this.props.sceneScale;
        const duration = width / this.props.sceneScale;
        this.adjustElementDuration(newX, duration, this.props.currentScene.duration());
    }

    adjustElementDuration(x, duration, sceneDuration) {
        const newScene = Object.assign({},this.props.currentScene);
        // let newSceneDuration = sceneDuration;
        // if ((x + duration) > sceneDuration) {
        //     newSceneDuration = x + duration;
        // }
        let newSceneDuration = 0
        for (let index = 0; index < newScene.elements().length; index++) {
            const element = newScene.elements()[index];
            console.log(element);
            let elementEnd = element.start() + element.duration();
            console.log(elementEnd);
            if (index === this.props.index) {
                elementEnd = x + duration;
            }
            if (elementEnd > newSceneDuration) {
                newSceneDuration = elementEnd
            }
        }
        newScene.duration(newSceneDuration);
        var newEle = Object.assign({},this.props.element);
        newEle.start(x);
        newEle.duration(duration);

        // update animations
        const animations = newEle.animations();
        for (let index = 0; index < animations.length; index++) {
            const animation = Object.assign({},animations[index]);
            var newStart = animation.start();
            var newDuration;
            if (duration < animation.start()) {
                newDuration = duration;
                newStart = 0;
                animation.start(newStart);
                animation.duration(newDuration);
                newEle.update(animation, index);
            } else if (duration < animation.start() + animation.duration()) {
                newDuration = duration - newStart;
                animation.duration(newDuration);
                newEle.update(animation, index);
            }
        }

        newScene.updateElement(newEle, this.props.index);
        this.props.updateScene(this.props.sceneIndex, newScene);
        const elementName = this.props.sceneIndex + '-' + this.props.index;
        this.props.updateElement(newEle, this.props.index, elementName);
    }

    render() {
        let {element, isBarActive, isPerforming, scenePosition, sceneScale} = this.props;
        const scenePositionWithScale = scenePosition * sceneScale;
        var color = Color.LIGHT_ORANGE;
        switch (element.type()) {
            case ElementType.IMAGE:
                color = Color.ILLUSTRATION_BAR;
                break;
            case ElementType.CHART:
                color = Color.CHART_BAR;
                break;
            case ElementType.AUDIO:
                color = Color.AUDIO_BAR;
                break;
            case ElementType.TEXT:
                color = Color.TEXT_BAR;
                break;
        
            default:
                break;
        }
        let bar;
        if (isBarActive && !isPerforming) {
            bar = <Rnd
                id={"bar-"+this.props.element.id()}
                style={{backgroundColor: color}}
                size={{ width: this.props.width, height: height }}
                position={{ x: this.props.x, y: y }}
                bounds='parent'
                enableResizing={{
                    left: true,
                    right: true
                }}
                enableUserSelectHack={false}
                onDragStart={() => {
                    this.setState({
                        isDragging: true
                    })
                }}
                onDragStop={(e, d) => {
                    this.dragBar(d.x);
                    this.setState({
                        isDragging: false
                    })
                }}
                onResizeStart={() => {
                    this.setState({
                        isResizing: true
                    })
                }}
                onResizeStop={(e, direction, ref, delta, position) => {
                    this.resizeBar(position.x, parseFloat(ref.style.width));
                    this.setState({
                        isResizing: false
                    })
                }}
            />
        } else {
            bar = <div style={{marginLeft: this.props.x, height: 22, width: this.props.width ,backgroundColor: color}} onClick = {this.clickBar} onMouseOver = {this.clickBar}/>
        }
        let interactiveNeedle = isPerforming?null:<div style={{position:'absolute',zIndex: 1, width: 2, height: 34,backgroundColor: 'red', marginLeft: 4+scenePositionWithScale}}/>;
        return (
            <div 
                style={{position: 'relative', left: -this.props.screenX}}
                onMouseLeave={this.leaveBar}
            >
                <div style={{padding: 6, position:'absolute',zIndex: 0}}>
                    <div id={"bar-container-"+this.props.element.id()} style={{height: 22, width: this.props.scrollWidth, backgroundColor:'#fff'}}  >
                        {bar}
                    </div>
                </div>
                {interactiveNeedle}
            </div>
        )
    }
}
