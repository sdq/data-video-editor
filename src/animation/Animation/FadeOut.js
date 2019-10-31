import Konva from "konva";
import AnimationBase from './AnimationBase';

export default class Fade extends AnimationBase {
    constructor(start, duration, node) {
        super(start, duration, node);
        this._animation = new Konva.Animation(function(frame) {
            this._node.opacity((this._duration * 1000 - frame.time) / (this._duration * 1000));
        }.bind(this), this._layer);
    }
}