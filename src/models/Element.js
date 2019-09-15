import uuidv4 from 'uuid/v4';
import ImageInfo from './element/ImageInfo';
import ChartInfo from './element/ChartInfo';
import TextInfo from './element/TextInfo';
import AudioInfo from './element/AudioInfo';
import Fragment from './element/Fragment';

export {ImageInfo, ChartInfo, TextInfo, AudioInfo}

export class Element {
    constructor(type, info) {
        this._id = uuidv4();
        this._type = type;
        this._info = info;
        this._start = 0;
        this._duration = 0;
        this._fragments = [];
        this._animations = [];
    }
    id = function() {
        return this._id;
    };
    type = function(type) {
        //element type
        if (type == null){
            return this._type;
        } else {
            this._type = type;
            return this;
        }
    };
    info = function(info) {
        //element info
        if (info == null){
            return this._info;
        } else {
            this._info = info;
            return this;
        }
    };
    play = function() {
        //TODO: play
    };
    pause = function() {
        //TODO: pause
    };
    stop = function() {
        //TODO: stop
    };
    forward = function() {
        //TODO: forward to next frame
    };
    backward = function() {
        //TODO: backward to last frame
    };
    begin = function() {
        //TODO: first frame
    };
    end = function() {
        //TODO: end frame
    };
    duration = function(duration) {
        //set animation duration
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
    style = function(style) {
        //set animation style
        if (style == null){
            return this._style;
        } else {
            this._style = style;
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
    // animation
    animations = function() {
        return this._animations;
    };
    add = function(animation) {
        animation.start(0);
        animation.duration(this.duration());
        console.log(animation)
        this._animations.push(animation);
        return this;
    };
    update = function(animation, index) {
        this._animations[index] = animation;
        return this;
    };
    remove = function(index) {
        this._animations.splice(index, 1);
        return this;
    };
    // fragments operation
    fragments = function() {
        return this._fragments;
    }
    addFragment = function(fragment) {
        this._fragments.push(fragment);
        return this;
    };
    split = function(position) {
        let fragmentIndex = this._findFragment(position);
        if (fragmentIndex === -1) {
            return; // not in the fragments
        }
        // first, create a new fragment
        let newFragment = new Fragment(position,this._fragments[fragmentIndex].end()-position)
        this._fragments.splice(fragmentIndex+1, 0, newFragment);
        // first, update the old fragment
        this._fragments[fragmentIndex].duration(position-this._fragments[fragmentIndex].start())
    }
    merge = function() {
        // after merge, delete one old fragment, and update one old fragment (start or duration).
    }
    _findFragment = function(position) {
        for (let index = 0; index < this._fragments.length; index++) {
            const fragment = this._fragments[index];
            if (position > fragment.start() && position < fragment.end()) {
                return index;
            }
        }
        return -1;
    }
}