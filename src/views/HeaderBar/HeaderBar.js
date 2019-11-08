import React, { Component } from 'react';
import { Button, Modal, Spin } from 'antd';
import Recorder from '@/recorder';
import Player from '@/player';
import './headerbar.css';

const recorder = new Recorder();
const player = new Player();

const prepareTime = 100; //TODO: 100ms for preparation

export default class HeaderBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
        visible: false,
        loading: false,
        remainTime: 0,
        isVideoPerforming: false,
    };
    this.play = this.play.bind(this);
};

    showMedia = () => {
        const {showResourcePane} = this.props;
        this.props.displayResourcePane(!showResourcePane);
    }

    showTool = () => {
        const {showToolPane} = this.props;
        this.props.displayToolPane(!showToolPane);
    }

    showModal = () => {
        this.setState({
            visible: true,
        });
    };

    tick() {
        if (this.state.remainTime === 0) {
            //
        } else {
            this.setState(preState => ({
                remainTime: preState.remainTime - 1
            }));
        }
    }

    play() {
        // this.props.unselectElement();
        // this.props.displayTrackEditor();
        if (this.state.isVideoPerforming === false) {
            this.setState({
                isVideoPerforming : true
            });
            this.props.displayTrackEditor();
            player.playVideo(); 
        } else {
            this.setState({
                isVideoPerforming : false
            });
            this.pause();   
        }
    };

    pause() {
        player.pauseVideo();
    }

    handleOk = () => {
        this.setState({
            visible: false,
            loading: true
        });
        this.setState({
            remainTime: this.props.videoDuration
        });
        this.interval = setInterval(() => this.tick(), 1000); // 一秒一次
        // console.log('duration', this.props.videoDuration);
        player.playVideo();
        // 显示加载动画
        setTimeout(() => {
            recorder.start('animation-layer', // canvas id
                (this.props.videoDuration) * 1000, // duration: ms
                10, // per xxx ms
                () => {
                    //player.playVideo();
                })
                .then((video) => {
                    clearInterval(this.interval);
                    // 取出加载动画
                    this.setState({
                        loading: false,
                        remainTime: 0
                    })
                    var url = URL.createObjectURL(video); //, { type: "video/webm" }
                    const link = document.createElement('a');
                    link.style.display = 'none';
                    link.href = url;
                    link.download = 'media.webm';
                    document.body.appendChild(link);
                    link.click();
                    link.remove();
                }, function (error) {
                    console.log(error);
                })
                .catch(function (error) {
                    console.log(error);
                });
        }, prepareTime); // TODO: show animation layer before record
    };

    handleCancel = () => {
        clearInterval(this.interval);
        if (this.state.loading === true) {
            player.pauseVideo();
            recorder.stop();
        }
        this.setState({
            visible: false,
            loading: false,
            remainTime: 0
        });
    };

    formatSeconds(seconds) {
        var theTime = parseInt(seconds);// 需要转换的时间秒 
        var theTime1 = 0;// 分 
        var theTime2 = 0;// 小时 
        var theTime3 = 0;// 天
        if (theTime > 60) {
            theTime1 = parseInt(theTime / 60);
            theTime = parseInt(theTime % 60);
            if (theTime1 > 60) {
                theTime2 = parseInt(theTime1 / 60);
                theTime1 = parseInt(theTime1 % 60);
                if (theTime2 > 24) {
                    //大于24小时
                    theTime3 = parseInt(theTime2 / 24);
                    theTime2 = parseInt(theTime2 % 24);
                }
            }
        }
        var result = '';
        if (theTime >= 0) {
            result = "" + parseInt(theTime) + " seconds ";
        }
        if (theTime1 > 0) {
            result = "" + parseInt(theTime1) + " minutes " + result;
        }
        if (theTime2 > 0) {
            result = "" + parseInt(theTime2) + " hours " + result;
        }
        if (theTime3 > 0) {
            result = "" + parseInt(theTime3) + " days " + result;
        }
        return result;
    }
    isSafari() {
        var chr = window.navigator.userAgent.toLowerCase().indexOf("chrome") > -1;
        var sfri = window.navigator.userAgent.toLowerCase().indexOf("safari") > -1;
        return !chr && sfri;
    }

    render() {
        return (
            <div className="headerbar">
                <font color="white"><b>Data Video Editor</b></font>
                <Button type="primary" icon="export" shape="round" style={{ float: 'right', marginLeft: 12 }} onClick={this.showModal}>
                    Export
                </Button>
                <Button type="primary" shape="round" icon={this.state.isVideoPerforming?"pause":"caret-right"} onClick={this.play} style={{ float: 'right', marginLeft: 12 } }>
                    Preview
                </Button>
                <Button.Group style={{ float: 'right', marginLeft: 12 }}>
                    <Button type="primary" shape="round" onClick={this.showMedia}>Media</Button>
                    <Button type="primary" shape="round" onClick={this.showTool}>Tool</Button>
                </Button.Group>
                <Modal
                    title="Export Video"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    <p>Do you want to export the video?</p>
                    <p>This might take several minutes.</p>
                    {this.isSafari() &&
                        <p>
                            We have noticed that you are using Safari.<br/>
                            Make sure the <b>allow autoplay option </b>is enabled. (right-click the address bar)
                        </p>
                    }
                </Modal>
                <Modal
                    className='recordConfirm'
                    visible={this.state.loading}
                    onCancel={this.handleCancel}
                    closable={false}
                    maskClosable={false}
                    footer={[<Button key="cancel" type="primary" onClick={this.handleCancel}>Cancel</Button>]}
                >
                    <Spin id='spin' size="large"></Spin>
                    <p>Recording...</p>
                    <p>{this.formatSeconds(this.state.remainTime)} remaining</p>
                    <p>Please don't leave this page!</p>
                </Modal>
            </div>
        )
    }
}
