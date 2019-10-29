import React, { Component } from 'react';
import ClipButton from './ClipButton';
import { Rnd } from "react-rnd";
import Color from '@/constants/Color';
import ElementType from '@/constants/ElementType';

const y = 0;
const height = 22;

export default class TrackBar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isBarDragging: false,
            isBarResizing: false,
            showClip: false,
            dragOffsetX: [],
            clipBtnWidth: 12,
        };
        this.splitIndex = -1;
        this.updateIdx = 0;
        this.fragLength = 0;
        this.dragMoveX = 0;
        this.dragStartX = 0;
        this.preX = 0;

        this.clickBar = this.clickBar.bind(this);
        this.leaveBar = this.leaveBar.bind(this);
        this.clipBar = this.clipBar.bind(this);
        this.dragBar = this.dragBar.bind(this);
        this.resizeBar = this.resizeBar.bind(this);
        this.dragStartClipBtn = this.dragStartClipBtn.bind(this);
        this.dragClipBtn = this.dragClipBtn.bind(this);
        this.dragEndClipBtn = this.dragEndClipBtn.bind(this);
    }

    clickBar() {
        // this.setState({
        //     showClip: true
        // })
        this.props.clickBar();
    }

    leaveBar() {
        this.setState({
            showClip: false
        })
        if (!this.state.isBarDragging && !this.state.isBarResizing) {
            this.props.leaveBar();
        }
    }

    clipBar() {
        if (this.props.element.findFragment(this.props.scenePosition) === -1) {
            return;
        }
        const newScene = Object.assign({},this.props.currentScene);
        const newElement = Object.assign({},this.props.element);
        newElement.split(this.props.scenePosition);
        newScene.updateElement(newElement, this.props.index);
        newScene.duration(newScene.duration()+1);
        this.props.updateScene(this.props.sceneIndex, newScene);
        const elementName = this.props.sceneIndex + '-' + this.props.index;
        this.props.updateElement(newElement, this.props.index, elementName);
    }

    dragBar(x, fragmentIndex) {
        const newStart = x / this.props.sceneScale;
        this.adjustFragment(newStart, null, fragmentIndex);
        // this.adjustElementDuration(newX, this.props.element.duration(), this.props.currentScene.duration());

        // check other fragments make sure to merge
    }
    //在红的剪刀图标上的切割交互
    //dragStart 进行切割
    //onDragEnd 更新fragment
    dragStartClipBtn(x){
        this.splitIndex = this.props.element.findFragment(this.props.scenePosition);
        this.dragStartX = x;

        const newScene = Object.assign({}, this.props.currentScene);
        const newElement = Object.assign({}, this.props.element);
        newElement.split(this.props.scenePosition);
        newScene.updateElement(newElement, this.props.index);
        newScene.duration(newScene.duration() + 1);
        this.props.updateScene(this.props.sceneIndex, newScene);
        const elementName = this.props.sceneIndex + '-' + this.props.index;
        this.props.updateElement(newElement, this.props.index, elementName);

        //console.log("dragStart",this.dragStartX)
        if (this.splitIndex === -1) return;
        //更新当前切割的元素以后的元素
        this.updateIdx = this.splitIndex + 1;
        this.fragLength = this.props.element.fragments().length;
    }
    dragClipBtn(x) {
        if (this.preX === x) return;
        if (this.splitIndex === -1) return;
        this.preX = x;
        //console.log("x", x)
        this.dragMoveX = x - this.dragStartX;
        for (let k = this.updateIdx; k < this.fragLength; k++) {
            this.state.dragOffsetX.splice(k, 1, this.dragMoveX);
        }
      
        this.setState({
            dragOffsetX: this.state.dragOffsetX,
            clipBtnWidth: this.dragMoveX
        })
        //console.log("setState...",this.state.clipBtnWidth)
    }
    dragEndClipBtn(x) {
        this.dragMoveX = x - this.dragStartX;
        let fragments = this.props.element.fragments();
        if (this.splitIndex === -1) return;
        //更新当前切割的元素以后的元素
        let updateIdx = this.splitIndex + 1;
        for (let k = updateIdx; k < fragments.length; k++) {
            //更新
            //console.log("更新..移动距离..." + this.dragMoveX / this.props.sceneScale);
            this.adjustFragment(fragments[k].start() + this.dragMoveX / this.props.sceneScale, null, k);
            this.state.dragOffsetX.splice(k, 1, 0);
        }
        this.setState({
            dragOffsetX: this.state.dragOffsetX,
            clipBtnWidth: 12
        })
    }
    resizeBar(x, width, fragmentIndex) {
        const newStart = x / this.props.sceneScale;
        const newDuration = width / this.props.sceneScale;
        this.adjustFragment(newStart, newDuration, fragmentIndex);
        // this.adjustElementDuration(newStart, newDuration);
    }

    adjustFragment(start=null, duration=null, fragmentIndex) {
        const newScene = Object.assign({},this.props.currentScene);
        const newElement = Object.assign({},this.props.element);
        const newFragment = Object.assign({},this.props.element.fragments()[fragmentIndex]);
        if (start !== null) {
            newFragment.start(start);
        }
        if (duration !== null) {
            newFragment.duration(duration);
        }
        newElement.updateFragment(fragmentIndex, newFragment);
        newElement.merge();
        let newElementStart = newElement.fragments()[0].start();
        newElement.fragments().forEach(fragment => {
            if (fragment.start() < newElementStart) {
                newElementStart = fragment.start();
            }
        });
        let newElementDuration = newElement.fragments()[0].end() - newElementStart;
        newElement.fragments().forEach(fragment => {
            if (fragment.end() - newElementStart > newElementDuration) {
                newElementDuration = fragment.end() - newElementStart;
            }
        });
        if (newElementStart !== newElement.start() || newElementDuration !== newElement.duration()) {
            this.adjustElementDuration(newElementStart, newElementDuration)
        } else {
            newScene.updateElement(newElement, this.props.index);
            this.props.updateScene(this.props.sceneIndex, newScene);
            const elementName = this.props.sceneIndex + '-' + this.props.index;
            this.props.updateElement(newElement, this.props.index, elementName);
        }
    }

    adjustElementDuration(start, duration) {
        const newScene = Object.assign({},this.props.currentScene);
        let newSceneDuration = 0
        for (let index = 0; index < newScene.elements().length; index++) {
            const element = newScene.elements()[index];
            let elementEnd = element.start() + element.duration();
            if (index === this.props.index) {
                elementEnd = start + duration;
            }
            if (elementEnd > newSceneDuration) {
                newSceneDuration = elementEnd
            }
        }
        newScene.duration(newSceneDuration);
        let newEle = Object.assign({},this.props.element);
        newEle.start(start);
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
        let { element, isBarActive, isPerforming, scenePosition, sceneScale } = this.props;
        let { showClip, dragOffsetX } = this.state;
        const scenePositionWithScale = scenePosition * sceneScale;
        var color = Color.LIGHT_ORANGE;
        switch (element.type()) {
            case ElementType.IMAGE:
            case ElementType.GIF:
                color = Color.ILLUSTRATION_BAR;
                break;
            case ElementType.CHART:
                color = Color.CHART_BAR;
                break;
            case ElementType.AUDIO:
                color = Color.AUDIO_BAR;
                element.isAudioOrVideo=true;
                element.elementMaxFragmentWidth= element._duration * sceneScale;
                break;
            case ElementType.VIDEO:
                color = Color.VIDEO_BAR;
                element.isAudioOrVideo=true;
                element.elementMaxFragmentWidth= element._duration * sceneScale;
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
                if (!dragOffsetX[index]) {
                    dragOffsetX[index] = 0;
                }
                //console.log("render...", index, dragOffsetX[index])
                bars.push(<Rnd
                    id={"bar-"+this.props.element.id()+'-'+index}
                    key={"bar-"+this.props.element.id()+'-'+index}
                    style={{backgroundColor: color}}
                    size={{ width: fragmentWidth, height: height }}
                    position={{ x: fragmentX + dragOffsetX[index], y: y }}
                    bounds='parent'
                    enableResizing={{
                        left: true,
                        right: true
                    }}
                    enableUserSelectHack={false}
                    onDragStart={() => {
                        this.setState({
                            isBarDragging: true
                        })
                    }}
                    onDragStop={(e, d) => {
                        this.dragBar(d.x, index);
                        this.setState({
                            isBarDragging: false
                        })
                    }}
                    onResizeStart={() => {
                        this.setState({
                            isBarResizing: true
                        })
                    }}
                    onResizeStop={(e, direction, ref, delta, position) => {
                        var newDragedWidth=parseFloat(ref.style.width);
                        if(newDragedWidth > element.elementMaxFragmentWidth && element.isAudioOrVideo){
                            newDragedWidth=element.elementMaxFragmentWidth
                        }
                        this.resizeBar(position.x, newDragedWidth, index);
                        this.setState({
                            isBarResizing: false
                        })
                    }}
                    onMouseOver={() => {
                        if(!element.isAudioOrVideo){
                            this.setState({
                                showClip: true
                            })
                        }
                      
                    }}
                />)
            } else {
                bars.push(<div key={"bar-"+this.props.element.id()+'-'+index} style={{float: 'left', position: 'absolute', marginLeft: fragmentX, height: 22, width: fragmentWidth ,backgroundColor: color}} onClick = {this.clickBar} onMouseOver = {this.clickBar}/>);
            }
        }
        // clip
        let clipButton = !isPerforming&&showClip?<ClipButton onClick={this.clipBar} x={7+scenePositionWithScale} clipBtnWidth={this.state.clipBtnWidth} dragStartClipBtn={this.dragStartClipBtn} dragClipBtn={this.dragClipBtn} dragEndClipBtn={this.dragEndClipBtn}/>:null;
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
                {clipButton}
            </div>
        )
    }
}
