export default class AnimationBase {
    constructor(start, duration, node, pathinfo) {
        this._node = node;
        this._layer = node.getLayer();
        this._start = start;
        this._duration = duration;
        this._isPlaying = false;
        this._isAnimating = false;
        this._animation = null;
        this._pathinfo = pathinfo;
    }

    isPlaying = () => this._isPlaying;
    play = function(current=0) {
        if (this._isPlaying || this._animation === null || current > (this._start + this._duration)) {
            return;
        }
        this._isPlaying = true;
        this._startTimeout = setTimeout(function () {
            this._isAnimating = true;
            this._animation.start();
        }.bind(this), (this._start - current) * 1000)
        this._stopTimeout = setTimeout(function () {
            this._animation.stop();
            this._isAnimating = false;
            this._isPlaying = false;
        }.bind(this), (this._start + this._duration - current) * 1000)
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