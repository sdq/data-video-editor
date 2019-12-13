import Path from './Animation/Path';

export {Path}

export default class AnimationModel {
    constructor(type, name, pathinfo) {
        this._type = type;
        this._name = name;
        this._start = 0;
        this._duration = 0;
        this._style = "";
        this._loop = "loop";
        this._pathinfo = pathinfo;
    }
    type = function(type) {
        if (type == null){
            return this._type;
        } else {
            this._type = type;
            return this;
        }
    };
    name = function(name) {
        if (name == null){
            return this._name;
        } else {
            this._name = name;
            return this;
        }
    };
    start = function(start) {
        if (start == null){
            return this._start;
        } else {
            this._start = start;
            return this;
        }
    };
    duration = function(duration) {
        if (duration == null){
            return this._duration;
        } else {
            this._duration = duration;
            return this;
        }
    };
    loop = function(loop) {
        //set animation loop
        if (loop == null){
            return this._loop;
        } else {
            this._loop = loop;
            return this;
        }
    };
    //可扩展的动画属性信息
    pathinfo = function(pathinfo) {
        //set animation pathinfo
        if (pathinfo == null){
            return this._pathinfo;
        } else {
            this._pathinfo = pathinfo;
            return this;
        }
    };
}