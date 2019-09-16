import React, { Component } from 'react';
import {Icon} from 'antd';
import { Rnd } from "react-rnd";

const y = 10;
const width = 12;
const height = 12;

export default class ClipBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isResizing: false
        }
        this.clipBar = this.clipBar.bind(this);
    }
    clipBar() {

    }
    render() {
        return (
            <div>
                <Rnd
                    id={"split-"+this.props.element.id()}
                    style={{backgroundColor: color}}
                    size={{ width: width, height: height }}
                    position={{ x: 0, y: y }}
                    bounds='parent'
                    enableResizing={{
                        right: true
                    }}
                    enableUserSelectHack={false}
                    disableDragging={true}
                    onResizeStart={() => {
                        // TODO: split fragments
                        this.setState({
                            isResizing: true
                        })
                    }}
                    onResize={(e, direction, ref, delta, position) => {
                        // TODO: update UI

                    }}
                    onResizeStop={(e, direction, ref, delta, position) => {
                        // TODO: update splited fragments
                        this.setState({
                            isResizing: false
                        })
                    }}
                >
                    <div style={{position:'absolute',zIndex: 1, width: width, height: height,backgroundColor: 'red', marginLeft: 7+scenePositionWithScale, marginTop: 10}} onClick={this.clipBar}>
                        <Icon style={{fontSize:8, color:'white', position: 'absolute'}} type="scissor" />
                    </div>
                </Rnd>
            </div>
        )
    }
}
