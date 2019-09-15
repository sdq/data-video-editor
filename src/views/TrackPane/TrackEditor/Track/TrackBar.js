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
            isResizing: false,
            showSplitBar: false,
        };
        this.clickBar = this.clickBar.bind(this);
        this.leaveBar = this.leaveBar.bind(this);
        this.clipBar = this.clipBar.bind(this);
        this.dragBar = this.dragBar.bind(this);
        this.resizeBar = this.resizeBar.bind(this);
    }

    clickBar() {
        this.setState({
            showSplitBar: true
        })
        this.props.clickBar();
    }

    leaveBar() {
        this.setState({
            showSplitBar: false
        })
        if (!this.state.isDragging && !this.state.isResizing) {
            this.props.leaveBar();
        }
    }

    clipBar() {
        const newScene = Object.assign({},this.props.currentScene);
        const newEle = Object.assign({},this.props.element);
        newEle.split(this.props.scenePosition);
        newScene.updateElement(newEle, this.props.index);
        this.props.updateScene(this.props.sceneIndex, newScene);
        const elementName = this.props.sceneIndex + '-' + this.props.index;
        this.props.updateElement(newEle, this.props.index, elementName);
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
        let {showSplitBar} = this.state;
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
        let bars = [];
        let fragments = element.fragments();
        for (let index = 0; index < fragments.length; index++) {
            const fragment = fragments[index];
            let fragmentX = fragment.start() * sceneScale;
            let fragmentWidth = fragment.duration() * sceneScale;
            if (isBarActive && !isPerforming) {
                bars.push(<Rnd
                    id={"bar-"+this.props.element.id()+'-'+index}
                    style={{backgroundColor: color}}
                    size={{ width: fragmentWidth, height: height }}
                    position={{ x: fragmentX, y: y }}
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
                />)
            } else {
                bars.push(<div style={{float: 'left', position: 'absolute', marginLeft: fragmentX, height: 22, width: fragmentWidth ,backgroundColor: color}} onClick = {this.clickBar} onMouseOver = {this.clickBar}/>);
            }
        }
        // Needle for Interaction
        let interactiveNeedle = !isPerforming?<div style={{position:'absolute',zIndex: 1, width: 2, height: 34,backgroundColor: 'red', marginLeft: 5+scenePositionWithScale}}/>:null;
        let splitBar = !isPerforming&&showSplitBar ?<div style={{position:'absolute',zIndex: 1, width: 10, height: 14,backgroundColor: 'red', marginLeft: 7+scenePositionWithScale, marginTop: 10}} onClick={this.clipBar}/>:null;
        return (
            <div 
                style={{position: 'relative', left: -this.props.screenX}}
                onMouseLeave={this.leaveBar}
            >
                <div style={{padding: 6, position:'absolute',zIndex: 0}}>
                    <div id={"bar-container-"+this.props.element.id()} style={{height: 22, width: this.props.scrollWidth, backgroundColor:'#fff'}}  >
                        {bars.map(x=>x)}
                    </div>
                </div>
                {interactiveNeedle}
                {splitBar}
            </div>
        )
    }
}
