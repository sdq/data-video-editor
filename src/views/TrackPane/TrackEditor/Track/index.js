import React, { Component } from 'react';
import { Draggable } from "react-beautiful-dnd";
import { Layout } from 'antd';
import TrackInfo from './TrackInfo';
import TrackBar from './TrackBar';
import './track.css';

const { Sider, Content } = Layout;

const animations = [];
const rowHeight = 36;
const getItemStyle = (isDragging, draggableStyle) => ({
    background: isDragging ? "lightgreen" : "grey",
    ...draggableStyle
});

export default class Track extends Component {

    constructor(props) {
        super(props);
        this.state= {
            showAnimations: false,
        }
        this.clickTrack = this.clickTrack.bind(this);
        this.clickBar = this.clickBar.bind(this);
        this.unactiveBars = this.unactiveBars.bind(this);
        this.setShowAnimations = this.setShowAnimations.bind(this);
    }

    clickTrack() {
        this.props.selectElement(this.props.index);
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

    render() {
        var height = rowHeight;
        if (this.state.showAnimations) {
            height += rowHeight * ( animations.length + 1 )
        }
        let {element, index, isPerforming} = this.props;
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
                                <Layout style={{ background: '#eee', height: '36px' }}>
                                    <Sider width="200px" {...provided.dragHandleProps} onClick={this.clickTrack}
                                    >
                                        <TrackInfo 
                                            showAnimations={this.state.showAnimations} 
                                            setShowAnimations={this.setShowAnimations}
                                            onOver={this.unactiveBars}
                                            {...this.props}
                                        />
                                    </Sider>
                                    <Content>
                                        <TrackBar 
                                            clickBar={this.clickBar} 
                                            leaveBar={this.unactiveBars}
                                            showAnimations={this.state.showAnimations} 
                                            {...this.props}
                                        />
                                    </Content>
                                </Layout>
                            </div>
                        </div>
                    </div>
                )}
            </Draggable>
        )
    }
}
