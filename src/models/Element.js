import uuidv4 from 'uuid/v4';
import ImageInfo from './element/ImageInfo';
import GifInfo from './element/GifInfo';
import ChartInfo from './element/ChartInfo';
import TextInfo from './element/TextInfo';
import AudioInfo from './element/AudioInfo';
import VideoInfo from './element/VideoInfo';
import ShapeInfo from './element/ShapeInfo';
import Fragment from './element/Fragment';

export {ImageInfo, GifInfo, ChartInfo, TextInfo, AudioInfo, VideoInfo,ShapeInfo}

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
        if (animation.duration() === 0) {
            if (this.duration() < 5) {
                animation.duration(this.duration());
            } else {
                animation.duration(5);
            }
        }
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
    // fragments operation
    fragments = function() {
        return this._fragments;
    }
    addFragment = function(fragment) {
        this._fragments.push(fragment);
        return this;
    };
    updateFragment = function(index, fragment) {
        this._fragments[index] = fragment;
        return this;
    }
    split = function(position) {
        let fragmentIndex = this.findFragment(position);
        if (fragmentIndex === -1) {
            return; // not in the fragments 
        }
        //console.log(fragmentIndex);
        // first, move all later fragments delay 1s
        for (let index = 0; index < this._fragments.length; index++) {
            if (this._fragments[index].start() > position) {
                const newStart = this._fragments[index].start() + 1;
                this._fragments[index].start(newStart);
            }
        }
        this.duration(this.duration()+1);
        // then, create a new fragment
        let newFragment = new Fragment(position+1,this._fragments[fragmentIndex].end()-position)
        this._fragments.splice(fragmentIndex+1, 0, newFragment);
        // finally, update the old fragment
        this._fragments[fragmentIndex].duration(position-this._fragments[fragmentIndex].start())
        return this;
    }
    sort = function() {
        this._fragments.sort(function(a, b){ return a.start()-b.start() })
        return this;
    }
    merge = function() {
        if (this._fragments.length < 2) {
            return this;
        }
        this.sort();
        for (let index = 0; index < this._fragments.length - 1; ) {
            const fragmentA = this._fragments[index];
            const fragmentB = this._fragments[index+1];
            if (fragmentB.start() < fragmentA.end()) {
                // merge
                this._fragments[index].duration(Math.max(fragmentA.end(), fragmentB.end()) - fragmentA.start())
                this._fragments.splice(index+1, 1);
            } else {
                index++
            }
        }
        return this;
    }
    findFragment = function(position) {
        for (let index = 0; index < this._fragments.length; index++) {
            const fragment = this._fragments[index];
            if (position > fragment.start() && position < fragment.end()) {
                return index;
            }
        }
        return -1;
    }
}