import Konva from "konva";
import AnimationBase from './AnimationBase';

export default class FadeIn extends AnimationBase {
    constructor(start, duration, node) {
        super(start, duration, node);
        this._animation = new Konva.Animation(function(frame) {
            this._node.x((frame.time / (duration * 1000)) * -600);
        }.bind(this), this._layer);
    }
}