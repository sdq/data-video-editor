export default class Fragment {
    constructor(start, duration) {
        this._start = start;
        this._duration = duration;
    }

    start = function(start) {
        if (start == null){
            return this._start;
        } else {
            this._start = start;
            return this;
        }
    }

    duration = function(duration) {
        if (duration == null){
            return this._duration;
        } else {
            this._duration = duration;
            return this;
        }
    }

    end = function() {
        return this._start + this._duration;
    }
}