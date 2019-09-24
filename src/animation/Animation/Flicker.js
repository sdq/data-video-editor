import Konva from "konva";
import AnimationBase from './AnimationBase';

export default class Flicker extends AnimationBase {
    constructor(start, duration, node) {
        super(start, duration, node);
        this._animation = new Konva.Animation(function(frame) {
            this._node.opacity((Math.sin(frame.time * 2 * Math.PI / 1500) + 1) / 2);
        }.bind(this), this._layer);
    }
}