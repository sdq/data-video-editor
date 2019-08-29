import React, { Component } from 'react';
import { Layout, Input } from 'antd';
import { Rnd } from "react-rnd";
import './track.css';

const { Sider, Content } = Layout;
const { Search } = Input;

const x = 0
const y = 0;
const height = 36
const offset = 12

export default class TrackHeader extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isBarActive: false,
        };
        this.changeDuration = this.changeDuration.bind(this);
        this.clickBar = this.clickBar.bind(this);
    }

    changeDuration(value) {
        //TODO: transfer from width to duration
        const duration = value;
        const newScene = Object.assign({},this.props.currentScene);
        newScene.duration(duration);
        this.props.updateScene(this.props.sceneIndex, newScene);
        // TODO: setDuration Action

    }

    clickBar() {
        this.setState({
            isBarActive: true,
        })
    }

    render() {
        const width = this.props.currentScene.duration();
        var bar;
        if (this.state.isBarActive) {
            bar = <Rnd
                id={"track-bar"}
                style={{backgroundColor: 'white'}}
                size={{ width: width + offset, height: height }}
                position={{ x: x, y: y }}
                bounds='parent'
                disableDragging={true}
                enableResizing={{
                    right: true
                }}
                enableUserSelectHack={false}
                onResizeStop={(e, direction, ref, delta, position) => {
                    const newWidth = parseInt(ref.style.width)-offset
                    this.changeDuration(parseInt(newWidth))
                }}
            >
                <div style={{backgroundColor: 'black', width: 6, height: 36, marginLeft: 0, marginTop: 0, float: 'left'}}/>
                <div style={{backgroundColor: 'black', width: 6, height: 36, marginRight: 0, marginTop: 0, float: 'right'}}/>
            </Rnd>
        } else {
            bar = <div style={{marginLeft: 0, height: height, width: width + offset ,backgroundColor: 'white'}} onClick = {this.clickBar} onMouseOver = {this.clickBar}>
                <div style={{backgroundColor: 'black', width: 6, height: 36, marginLeft: 0, marginTop: 0, float: 'left'}}/>
                <div style={{backgroundColor: 'black', width: 6, height: 36, marginRight: 0, marginTop: 0, float: 'right'}}/>
            </div>
        }
        return (
            <div className="track-header">
                <Layout>
                    <Sider width="200px">
                        <div className="track-header-info">
                            <Search
                                placeholder="search"
                                onSearch={value => console.log(value)}
                                style={{ width: 190, float: 'left' }}
                                size="small"
                            />
                        </div>
                    </Sider>
                    <Content>
                        {bar}
                    </Content>
                </Layout>
            </div>
        )
    }
}