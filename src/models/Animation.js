export default class Animation {
    constructor(type, name) {
        this._type = type;
        this._name = name;
        this._start = 0;
        this._duration = 0;

        this.type = function(type) {
            if (type == null){
                return this._type;
            } else {
                this._type = type;
                return this;
            }
        };
        this.name = function(name) {
            if (name == null){
                return this._name;
            } else {
                this._name = name;
                return this;
            }
        };
        this.start = function(start) {
            if (type == null){
                return this._start;
            } else {
                this._start = start;
                return this;
            }
        };
        this.duration = function(duration) {
            if (type == null){
                return this._duration;
            } else {
                this._duration = duration;
                return this;
            }
        };
    }
}