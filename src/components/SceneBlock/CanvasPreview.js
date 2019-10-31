import React, { Component } from 'react';
import { Stage, Layer } from 'react-konva';
import ImageElement from '@/components/Elements/ImageElement';
import GifElement from '@/components/Elements/GifElement';
import VideoElement from '@/components/Elements/VideoElement';
import TextElement from '@/components/Elements/TextElement';
import ChartElement from '@/components/Elements/ChartElement';
import ElementType from '@/constants/ElementType';

export default class CanvasPreview extends Component {
    render() {
        return (
            <div>
                <Stage width={192} height={108} scale={{x: 192/800, y:192/800}} 
                 style={{
                     backgroundColor:this.props.scene.backgroundColor(),
                     backgroundImage:`url(${ this.props.scene.backgroundImage()})`,
                     }}>
                    <Layer>
                        
                        {this.props.scene.elements().map(function(element, index) {
                            //console.log(element.info());
                            switch (element.type()) {
                                case ElementType.TEXT:
                                    return <TextElement key={this.props.sceneIndex+"-"+index} element={element} name={this.props.sceneIndex+"-"+index} draggable = {false} {...this.props}/>
                                case ElementType.IMAGE:
                                    return <ImageElement key={this.props.sceneIndex+"-"+index} element={element} name={this.props.sceneIndex+"-"+index} draggable = {false} {...this.props}/>
                                case ElementType.GIF:
                                    return <GifElement key={this.props.sceneIndex + "-" + index} element={element} name={this.props.sceneIndex + "-" + index} draggable={false} {...this.props} />
                                case ElementType.CHART:
                                    return <ChartElement key={this.props.sceneIndex+"-"+index} element={element} name={this.props.sceneIndex+"-"+index}  width={200} height={200} draggable = {false} {...this.props}/>
                                case ElementType.VIDEO:
                                    return <VideoElement key={this.props.sceneIndex + "-" + index} element={element} name={this.props.sceneIndex + "-" + index} draggable={false} {...this.props} />
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
                    </Layer>
                </Stage>
            </div>
        )
    }
}
