import React, { Component } from 'react';
import { Image, Group } from 'react-konva';
import { AnimationCreator } from '@/animation';
import _ from 'lodash';
var gifFrames = require('gif-frames');

export default class GifElement extends Component {
    constructor(props) {
        super(props);
        this.state = {
            canvas: null,
        };
        this.isToAnimate = false;
        this.data = [];
        this._imageDelay = 1;
        this.dragstart = this.dragstart.bind(this);
        this.dragend = this.dragend.bind(this);
        this.onTransformStart = this.onTransformStart.bind(this);
        this.onTransformEnd = this.onTransformEnd.bind(this);
    }
    async componentDidMount() {
        await this.parseGif();
        if (this.props.showAnimation) {
            this.isToAnimate = true
        }

        const animations = this.props.element.animations();
        if (this.props.showAnimation && animations.length !== 0) {
            let animationCreator = new AnimationCreator(this.imageref);
            let current = this.props.scenePosition;
            for (let index = 0; index < animations.length; index++) {
                const animation = animations[index];
                animationCreator.fromModel(animation).play(current);
            }
        }
    }
    componentDidUpdate(oldProps) {
        //console.log("Update...", this.isToAnimate)
        if (this.isToAnimate) {
            this.play();
        }
    }
    componentWillUnmount() {
        //console.log("Umount...", this.isToAnimate)
        this.pause();
    }
    async parseGif() {
        //console.log("gifUrl", this.props.element._duration)
        let gifUrl = this.props.element.info().src;
        let _this = this;
        await gifFrames(
            { url: gifUrl, frames: 'all', outputType: 'canvas', cumulative: true },
            function (err, frameData) {
                if (err) {
                    throw err;
                }
                _this.data = frameData;
                //console.log("delay", frameData[0].frameInfo.delay)
                //元素默认是10s 对应播放的delay 是元素自身读取的默认delay（1/100ths of a second）。根据bar按照比例计算_this._imageDelay
                _this._imageDelay = frameData[0].frameInfo.delay * _this.props.element._duration;
                //console.log("_imageDelay", _this._imageDelay)
                //默认显示第一张图片
                _this.setState({
                    canvas: frameData[0].getImage()
                })
            }
        );
    }

    play = () => {
        //console.log("play...", this._imageDelay)
        this.isToAnimate = false;
        let that = this;
        for (let i = 0; i < this.data.length; i++) {
            (function (playFrame) {
                // update canvas that we are using for Konva.Image
                that._startTimeout = setTimeout(() => {
                    that.setState({
                        canvas: that.data[playFrame].getImage(),
                    })
                    // console.log("drawImage", playFrame)
                }, that._imageDelay * playFrame);

                //最后一帧，递归播放
                if (playFrame === that.data.length - 1) {
                    that._startTimeoutNext= setTimeout(() => {
                        that.play();
                    }, that._imageDelay * (playFrame + 1));
                }
            })(i);
        };
    };
    pause = () => {
        //console.log("pause...")
        if (this._startTimeout) {
            clearTimeout(this._startTimeout);
        }
        if (this._startTimeoutNext) {
            clearTimeout(this._startTimeoutNext);
        }

    }
        // if (oldProps.element.info().src !== this.props.element.info().src) {
        //     this.loadImage();
        // }

    // Edit
    dragstart() {
        this.props.editStart();
    };

    dragend(x,y) {
        const newEle = _.cloneDeep(this.props.element);
        newEle.info().x = x;
        newEle.info().y = y;
        this.props.edit(newEle);
        //TODO:存在吸附不成功的情况
        if (Math.abs(x - 400) < 40) {
            x = 400;
            //console.log("吸附x")
        }
        if (Math.abs(y - 225) < 40) {
            y = 225;
            //console.log("吸附y")
        }
        //更新右侧ToolPane的值 
        let dragPos = { x, y };
        this.props.dragElement(dragPos);
    };

    onTransformStart() {
        this.props.editStart();
    }

    onTransformEnd(e) {
        const newEle = _.cloneDeep(this.props.element);
        newEle.info().x = e.target.x();
        newEle.info().y = e.target.y();
        newEle.info().width = newEle.info().width*e.target.scaleX(); //*e.target.scaleX()
        newEle.info().height = newEle.info().height*e.target.scaleY(); //*e.target.scaleY()
        newEle.info().rotation = e.target.rotation();
        this.props.edit(newEle);
    }

    render() {
        let { canvas } = this.state;
        return (
            <Group name={this.props.name} 
                draggable = {this.props.draggable}
                x={this.props.element.info().x}
                y={this.props.element.info().y}
                rotation={this.props.element.info().rotation}
                //draggable
                onDragStart={this.dragstart}
                onDragEnd={e => {
                    this.dragend(e.target.x(),e.target.y())
                }}
                onTransformStart={this.onTransformStart}
                onTransformEnd={this.onTransformEnd}
                visible={this.props.visible}
            >
                <Image 
                    ref={node=>this.imageref=node}
                    width={this.props.element.info().width}
                    height={this.props.element.info().height}
                    name={this.props.name}
                    image={canvas}
                    opacity={this.props.element.info().opacity}
                />
            </Group>
        )
    }
}
