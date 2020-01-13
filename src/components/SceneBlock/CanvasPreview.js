import React, { Component } from 'react';
import { Stage, Layer  } from 'react-konva';
import ImageElement from '@/components/Elements/ImageElement';
import GifElement from '@/components/Elements/GifElement';
import VideoElement from '@/components/Elements/VideoElement';
import TextElement from '@/components/Elements/TextElement';
import ChartElement from '@/components/Elements/ChartElement';
import ShapeElement from '@/components/Elements/ShapeElement';
import ElementType from '@/constants/ElementType';

export default class  extends Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         image: null,
    //     };
    // }
    // componentDidMount() {
    //     this.loadImage();
    // }
    // componentWillUnmount() {
    //     this.image.removeEventListener('load', this.handleLoad);
    // }
    // loadImage() {
    //     // save to "this" to remove "load" handler on unmount
    //     this.image = new window.Image();
    //     this.image.src = scene.backgroundImage();
    //     this.image.addEventListener('load', this.handleLoad);
    // }
    // handleLoad = () => {
    //     this.setState({
    //         image: this.image
    //     });
    // };
    render() {
        const { scene, sceneIndex } = this.props;
        return (
            <div>
                <Stage width={192} height={108} scale={{x: 192/800, y:192/800}} 
                    style={{
                        backgroundColor:scene.backgroundColor(),
                        backgroundImage:`url(${ scene.backgroundImage()})`,
                        backgroundSize:"192px 108px",
                    }}
                        
                >
                    <Layer>
                        {scene.elements().map(function(element, index) {
                            switch (element.type()) {
                                case ElementType.TEXT:
                                    return <TextElement key={sceneIndex+"-"+index} element={element} name={sceneIndex+"-"+index} draggable = {false} {...this.props}/>
                                case ElementType.IMAGE:
                                    return <ImageElement key={sceneIndex+"-"+index} element={element} name={sceneIndex+"-"+index} draggable = {false} {...this.props}/>
                                case ElementType.GIF:
                                    return <GifElement key={sceneIndex+"-"+index} element={element} name={sceneIndex + "-" + index} draggable={false} {...this.props} />
                                case ElementType.CHART:
                                    return <ChartElement key={sceneIndex+"-"+index} element={element} name={sceneIndex+"-"+index}  draggable = {false} {...this.props}/>
                                case ElementType.SHAPE:
                                    return <ShapeElement key={sceneIndex+"-"+index} element={element} name={sceneIndex+"-"+index} draggable = {false} {...this.props}/>
                                    case ElementType.VIDEO:
                                        let elementTag;
                                        //find video by id in scene
                                        if(!scene.videoTags()) return;
                                        scene.videoTags().map(item => {
                                            if (item.id === element.id()) {
                                                elementTag = item.element;
                                            }
                                            return item;
                                        })
                                    //TODO:解析视频元素第一帧，给sceneblock
                                    return <VideoElement key={sceneIndex + "-" + index} element={element} tag={elementTag} name={sceneIndex + "-" + index} draggable={false} {...this.props} showAnimation={false} />
                                case ElementType.AUDIO:
                                    return null;
                                default:
                                    //TODO: remove
                                    console.log("wrong!!!!!!!");
                                    console.log(scene.elements());
                                    console.log(element);
                                    return;
                            }
                        }.bind(this))}
                    </Layer>
                </Stage>
                {/* <Button type="link" icon="delete" ></Button>
                <Button type="link" icon="delete" ></Button> */}
            </div>
        )
    }
}
