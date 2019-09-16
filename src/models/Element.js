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
    updateFragment = function(index, fragment) {
        this._fragments[index] = fragment;
        return this;
    }
    split = function(position) {
        let fragmentIndex = this._findFragment(position);
        if (fragmentIndex === -1) {
            return; // not in the fragments 
        }
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
    merge = function(fragment) {
        // after merge, delete covered old fragments, and update one old fragment (start or duration).
        const newFragment = fragment;
        this._fragments.forEach(function(item, index, fragments){
            if (item.start() < newFragment.start() && item.end() > newFragment.start()) {
                newFragment.start(item.start())
                console.log('merge1')
                fragments.splice(index, 1);
            } else if (item.start() < newFragment.end() && item.end() > newFragment.end()) {
                newFragment.duration(item.end()-newFragment.end())
                console.log('merge2')
                fragments.splice(index, 1);
            } else if (item.start() < newFragment.start() && item.end() > newFragment.end()) {
                newFragment.start(item.start());
                newFragment.duration(item.duration());
                console.log('merge3')
                fragments.splice(index, 1);
            } else if (item.start() > newFragment.start() && item.end() < newFragment.end()) {
                console.log('merge4')
                fragments.splice(index, 1);
            }
        });
        this._fragments.push(newFragment);
        return this;
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