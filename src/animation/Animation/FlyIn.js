import Konva from "konva";
import AnimationBase from './AnimationBase';

export default class FlyIn extends AnimationBase {
    constructor(start, duration, node) {
        super(start, duration, node);
        this._animation = new Konva.Animation(function(frame) {
            this._node.x(((this._duration * 1000 - frame.time) / (this._duration * 1000)) * -600);
        }.bind(this), this._layer);
    }
}