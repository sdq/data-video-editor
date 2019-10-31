import Konva from "konva";
import AnimationBase from './AnimationBase';

export default class Zoom extends AnimationBase {
    constructor(start, duration, node) {
        super(start, duration, node);
        this._animation = new Konva.Animation(function(frame) {
            let scale = frame.time / (this._duration * 1000);
            this._scale({ x: scale, y: scale });
        }.bind(this), this._layer);
    }

    _scale(scaleX, scaleY) {
        this._node.position({
            x: this._node.width() / 2,
            y: this._node.height() / 2
        });
        this._node.offsetX(this._node.width() / 2);
        this._node.offsetY(this._node.height() / 2);
        this._node.scale(scaleX, scaleY);
    }
}