import React, { Component } from 'react';
import { Layer, Rect, Image } from 'react-konva';
import Konva from "konva";
import ImageElement from '@/components/Elements/ImageElement';
import GifElement from '@/components/Elements/GifElement';
import TextElement from '@/components/Elements/TextElement';
import ShapeElement from '@/components/Elements/ShapeElement';
import ChartElement from '@/components/Elements/ChartElement';
import VideoElement from '@/components/Elements/VideoElement';
import ChartVideoElement from '@/components/Elements/ChartVideoElement'
import ElementType from '@/constants/ElementType';

export default class AnimationLayer extends Component {

    constructor(props) {
        super(props);
        this.elementNodes = new Array(props.currentElements.length).fill({});
        this.state = {
            image: null,
        };
    }

    componentDidMount() {
        this.loadImage();
        this.animationLayer.canvas._canvas.id = 'animation-layer';

        // Mention: add fake animation to make sure the canvas recorder can capture the static video.
        this.fakeAnimation = new Konva.Animation(function(frame) {
            this.fakeAnimationNode.x(
                10 * Math.sin((frame.time * 2 * Math.PI) / 2000) + 10
            );
        }.bind(this), this.animationLayer);
        this.fakeAnimation.start();
    }
    componentDidUpdate(oldProps) {
        if (oldProps.currentScene.backgroundImage() !== this.props.currentScene.backgroundImage()) {
            this.loadImage();
        }
    }
    componentWillUnmount() {
        this.image.removeEventListener('load', this.handleLoad);
        this.fakeAnimation.stop();
    }
    loadImage() {
        // save to "this" to remove "load" handler on unmount
        this.image = new window.Image();
        this.image.src = this.props.currentScene.backgroundImage();
        this.image.addEventListener('load', this.handleLoad);
    }
    handleLoad = () => {
        this.setState({
            image: this.image
        });
    };

    isElementDisplay(element) {
        let isElementDisplay = false;
        if (this.props.scenePosition >= element.start() && this.props.scenePosition <= element.start()+element.duration()) {
            element.fragments().forEach(fragment => {
                if (this.props.scenePosition >= fragment.start() && this.props.scenePosition <= fragment.end()) {
                    isElementDisplay = true;
                }
            });
        }
        return isElementDisplay;
    }

    render() {
        const { currentScene } = this.props;
        const canvasW = 800*(this.props.contentHeight-100)/450;
        const canvasH = this.props.contentHeight-100;
        const hasBackgroundImage = currentScene.backgroundImage() !== "";
        return (
            <Layer 
                ref={node => (this.animationLayer = node)}
                style={{width:canvasW+"px",height:canvasH+"px"}}
            >
                {/* background */}
                <Rect
                    x={0}
                    y={0}
                    width={800}
                    height={450}
                    fill={currentScene.backgroundColor()}
                />
                {
                    hasBackgroundImage?
                    <Image 
                        ref={node=>this.imageref=node}
                        x={0}
                        y={0}
                        width={800}
                        height={450}
                        name={this.props.name}
                        image={this.state.image} 
                    />
                    :null
                }
                {/* elements */}
                {this.props.currentScene.elements().map(function(element, index) {
                    // TODO: dbclick
                    // if (index !== this.props.dbClickedElementIndex) {
                    //     return null;
                    switch (element.type()) {
                        case ElementType.TEXT:
                            return <TextElement
                                ref={node => (this.elementNodes[index] = node)} 
                                key={this.props.sceneIndex+"-"+index} 
                                element={element} 
                                name={this.props.sceneIndex+"-"+index} 
                                draggable={false} 
                                visible={this.isElementDisplay(element)}
                                showAnimation={true}
                                {...this.props}
                            />
                            
                        case ElementType.IMAGE:
                            return <ImageElement 
                                ref={node => (this.elementNodes[index] = node)}
                                key={this.props.sceneIndex+"-"+index} 
                                element={element} 
                                name={this.props.sceneIndex+"-"+index} 
                                draggable={false} 
                                visible={this.isElementDisplay(element)}
                                showAnimation={true}
                                {...this.props}
                            />
                            
                        case ElementType.GIF:
                            return <GifElement
                                ref={node => (this.elementNodes[index] = node)}
                                key={this.props.sceneIndex + "-" + index}
                                element={element}
                                name={this.props.sceneIndex + "-" + index}
                                draggable={false}
                                visible={this.isElementDisplay(element)}
                                showAnimation={true}
                                {...this.props}
                            />

                        case ElementType.CHART:
                            if (element.info().src) {
                                return <ChartVideoElement
                                    key={this.props.sceneIndex + "-" + index}
                                    element={element}
                                    visible={this.isElementDisplay(element)}
                                    {...this.props}
                                />

                            } else {
                                return <ChartElement
                                    ref={node => (this.elementNodes[index] = node)}
                                    key={this.props.sceneIndex + "-" + index}
                                    element={element}
                                    name={this.props.sceneIndex + "-" + index}
                                    width={200}
                                    height={200}
                                    draggable={false}
                                    visible={this.isElementDisplay(element)}
                                    showAnimation={true}
                                    {...this.props}
                                />
                            }
                        case ElementType.SHAPE:
                                return <ShapeElement
                                    ref={node => (this.elementNodes[index] = node)} 
                                    key={this.props.sceneIndex+"-"+index} 
                                    element={element} 
                                    name={this.props.sceneIndex+"-"+index} 
                                    draggable={false} 
                                    visible={this.isElementDisplay(element)}
                                    showAnimation={true}
                                    {...this.props}
                                />
                        case ElementType.VIDEO:
                            if (this.isElementDisplay(element)) {
                                return <VideoElement
                                    ref={node => (this.elementNodes[index] = node)}
                                    key={this.props.sceneIndex + "-" + index}
                                    element={element}
                                    name={this.props.sceneIndex + "-" + index}
                                    draggable={false}
                                    visible={this.isElementDisplay(element)}
                                    showAnimation={true}
                                    {...this.props}
                                />
                            } else {
                                return null;
                            }
                        case ElementType.AUDIO:
                            return null;
                        default:
                            //TODO: remove
                            console.log("wrong!!!!!!!");
                            console.log(this.props.currentScene.elements());
                            console.log(element);
                            return;
                    }
                }.bind(this))}
                <Rect
                    ref={node=>this.fakeAnimationNode=node}
                    x={0}
                    y={0}
                    width={20}
                    height={20}
                    fill={'red'}
                    opacity={0}
                />
            </Layer>
        )
    }
}
