import Konva from "konva";

export default class ZoomAnimation {
    constructor(start, duration, node, layer) {
        this._node = node;
        this._layer = node.getLayer();
        this._start = start;
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
        this._startTimeout = setTimeout(function () {
            this._isAnimating = true;
            this._animation.start();
        }.bind(this), this._start * 1000)
        this._stopTimeout = setTimeout(function () {
            this._animation.stop();
            this._isAnimating = false;
            this._isPlaying = false;
        }.bind(this), (this._start + this._duration) * 1000)
    }
    stop = function() {
        if (!this._isPlaying) {
            return;
        }
        if (this._isAnimating) {
            this._animation.stop();
        }
        clearTimeout(this._startTimeout);
        clearTimeout(this._stopTimeout);
    }
}