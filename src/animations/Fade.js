import Konva from "konva";

export default class FadeAnimation {
    constructor(start, duration, node, layer) {
        this._node = node;
        this._layer = node.getLayer();
        this._start = start;
        this._duration = duration;
        this._isPlaying = false;
        this._animation = new Konva.Animation(function(frame) {
            this._node.opacity((Math.sin(frame.time * 2 * Math.PI / 3000) + 1) / 2);
        }.bind(this), this._layer);
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