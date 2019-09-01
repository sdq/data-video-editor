import React, { Component } from 'react';
import { Layout, Slider, Icon } from 'antd';
import { Rnd } from "react-rnd";
import './track.css';

const { Sider, Content } = Layout;

const x = 0
const y = 0;
const height = 36
const offset = 12
const min = 1;
const max = 10;

export default class TrackHeader extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isBarActive: false,
        };
        this.changeDuration = this.changeDuration.bind(this);
        this.clickBar = this.clickBar.bind(this);
        this.handleScaleChange = this.handleScaleChange.bind(this);
    }

    handleScaleChange(value) {
        this.props.setSceneScale(value);
    }

    clickBar() {
        this.setState({
            isBarActive: true,
        })
    }

    changeDuration(value) {
        //TODO: transfer from width to duration
        const duration = value;
        const newScene = Object.assign({},this.props.currentScene);
        newScene.duration(duration);
        this.props.updateScene(this.props.sceneIndex, newScene);
        // TODO: setDuration Action

    }

    render() {
        const {isPerforming, sceneScale} = this.props;
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
                    right: isPerforming?false:true
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
                            {/* <Search
                                placeholder="search"
                                onSearch={value => console.log(value)}
                                style={{ width: 190, float: 'left' }}
                                size="small"
                            /> */}
                            <div className="icon-wrapper">
                                <Icon type="minus" />
                                <Slider onChange={this.handleScaleChange} value={sceneScale} min={min} max={max}/>
                                <Icon type="plus" />
                            </div>
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