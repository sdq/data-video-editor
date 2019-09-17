import Konva from "konva";

export default class ScaleAnimation {
    constructor(duration, node, layer) {
        this._node = node;
        this._layer = layer;
        this._duration = duration;
        this._isPlaying = false;
        this._animation = new Konva.Animation(function(frame) {
            var scale = Math.abs(Math.sin((frame.time * 2 * Math.PI) / 3000)) + 0.001;
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

    isPlaying = () => this._isPlaying;
    play = function() {
        if (this._isPlaying) {
            return;
        }
        this._isPlaying = true;
        this._animation.start();
        this._stopTimeout = setTimeout(function () {
            this._animation.stop();
            this._isPlaying = false;
        }.bind(this), this._duration * 1000)
    }
    stop = function() {
        if (!this._isPlaying) {
            return;
        }
        this._animation.stop();
        clearTimeout(this._stopTimeout);
    }
}