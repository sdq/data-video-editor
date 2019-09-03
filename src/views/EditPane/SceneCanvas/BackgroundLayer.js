import React, { Component } from 'react';
import { Layer, Rect, Image } from 'react-konva';

export default class BackgroundLayer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            image: null,
        };
    }
    componentDidMount() {
        this.loadImage();
    }
    componentDidUpdate(oldProps) {
        if (oldProps.currentScene.backgroundImage() !== this.props.currentScene.backgroundImage()) {
            this.loadImage();
        }
    }
    componentWillUnmount() {
        this.image.removeEventListener('load', this.handleLoad);
    }
    loadImage() {
        // save to "this" to remove "load" handler on unmount
        this.image = new window.Image();
        this.image.src = this.props.currentScene.backgroundImage();
        this.image.addEventListener('load', this.handleLoad);
    }
    handleLoad = () => {
        // after setState react-konva will update canvas and redraw the layer
        // because "image" property is changed
        this.setState({
            image: this.image
        });
        // if you keep same image object during source updates
        // you will have to update layer manually:
        // this.imageNode.getLayer().batchDraw();
    };
    render() {
        const { currentScene } = this.props;
        const hasBackgroundImage = currentScene.backgroundImage() !== "";
        return (
            <Layer 
                ref={node => (this.backgroundLayer = node)}
            >
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
                
            </Layer>
        )
    }
}
