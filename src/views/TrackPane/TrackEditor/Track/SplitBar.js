import React, { Component } from 'react';
import { Rnd } from "react-rnd";

const y = 10;
const width = 10;
const height = 14;

export default class SplitBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isResizing: false
        }
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
                    <div style={{position:'absolute',zIndex: 1, backgroundColor: 'red'}}/>
                </Rnd>
            </div>
        )
    }
}
