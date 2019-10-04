import React, { Component } from 'react';
import { Draggable } from "react-beautiful-dnd";
import { Layout } from 'antd';
import TrackInfo from './TrackInfo';
import TrackBar from './TrackBar';
import AnimationTrack from './AnimationTrack';
import './track.css';
const { Sider, Content } = Layout;
const rowHeight = 34;
const getItemStyle = (isDragging, draggableStyle) => ({
    background: isDragging ? "lightgreen" : "grey",
    ...draggableStyle
});

export default class VideoTrack extends Component {

    constructor(props) {
        super(props);
        this.state= {
            showAnimations: false,
            animationBarActiveList:Array(this.props.element.animations().length).fill(false),
        }
        this.clickTrack = this.clickTrack.bind(this);
        this.clickBar = this.clickBar.bind(this);
        this.unactiveBars = this.unactiveBars.bind(this);
        this.setShowAnimations = this.setShowAnimations.bind(this);
        this.setAnimationBarActive = this.setAnimationBarActive.bind(this);
        this.setAnimationBarUnactive = this.setAnimationBarUnactive.bind(this);
    }

    clickTrack() {
        const elementName = this.props.sceneIndex + '-' + this.props.index;
        this.props.selectElement(this.props.index, elementName);
    }

    clickBar() {
        this.props.setBarActive(this.props.index);
    }

    unactiveBars() {
        this.props.setBarUnactive()
    }

    setShowAnimations(showAnimations) {
        this.setState({
            showAnimations: showAnimations
        })
    }

    setAnimationBarActive(index) {
        let animationBarActiveList = new Array(this.props.element.animations().length).fill(false);
        animationBarActiveList[index] = true;
        this.setState({
            animationBarActiveList: animationBarActiveList
        })
    }

    setAnimationBarUnactive() {
        let animationBarActiveList = new Array(this.props.element.animations().length).fill(false);
        this.setState({
            animationBarActiveList: animationBarActiveList
        })
    }

    render() {
        var height = rowHeight;
        let {element, index, isPerforming, sceneScale} = this.props;
        let {animationBarActiveList} = this.state;
        let animations = element.animations();
        var animationTracks = null;
        if (this.state.showAnimations) {
            height += rowHeight * animations.length
            animationTracks = animations.map((animation, index) => <AnimationTrack 
                key={index} 
                animationIndex={index} 
                animation={animation} 
                element={element}
                elementWidth={element.duration()*sceneScale}
                elementX={element.start()*sceneScale}
                width={animation.duration()*sceneScale}
                x={animation.start()*sceneScale}
                isAnimationBarActive={animationBarActiveList[index]} 
                setAnimationBarActive={this.setAnimationBarActive} 
                setAnimationBarUnactive={this.setAnimationBarUnactive} 
                {...this.props}
            />)
        }
        return (
            <Draggable 
                key={element.id()} 
                draggableId={element.id()} 
                index={index}
                isDragDisabled={isPerforming}
            >
                {(provided, snapshot) => (
                    <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    style={getItemStyle(
                        snapshot.isDragging,
                        provided.draggableProps.style
                    )}
                    >
                        <div style={{height: height, backgroundColor: '#fff'}}>
                            <div className="track">
                                <Layout style={{ background: '#eee', height: '34px' }}>
                                    <Sider width="200px" {...provided.dragHandleProps} onClick={this.clickTrack}
                                    >
                                        <TrackInfo
                                            showAnimations={this.state.showAnimations} 
                                            setShowAnimations={this.setShowAnimations}
                                            onOver={this.unactiveBars}
                                            isArrowHidden={true}
                                            {...this.props}
                                        />
                                    </Sider>
                                    <Content>
                                        <TrackBar 
                                            clickBar={this.clickBar} 
                                            leaveBar={this.unactiveBars}
                                            x={element.start() * sceneScale}
                                            width={element.duration() * sceneScale}
                                            {...this.props}
                                        />
                                       
                                    </Content>
                                </Layout>
                            </div>
                            {animationTracks}
                        </div>
                    </div>
                )}
            </Draggable>
        )
    }
}
