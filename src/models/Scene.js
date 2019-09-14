import uuidv4 from 'uuid/v4';

export default class Scene {
    constructor(script, duration) {
        this._id = uuidv4();
        this._script = script;
        this._duration = duration;
        // this._tracks = [];
        // this.dataurl = dataurl;
        this._elements = []; //TODO: move to track
        this._backgroundColor = '#ffffff';
        this._backgroundImage = '';
    }
    id = function() {
        return this._id;
    }
    script = function(script) {
        //set animation duration
        if (script == null){
            return this._script;
        } else {
            this._script = script;
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
    // this.tracks = function(tracks) {
    //     if (tracks == null){
    //         return this._tracks;
    //     } else {
    //         this._tracks = tracks;
    //         return this;
    //     }
    // };
    // this.add = function(track) {
    //     this._tracks.push(track);
    //     return this;
    // };
    // this.remove = function(index) {
    //     this._tracks.splice(index, 1);
    //     return this;
    // };
    // this.clear = function() {
    //     this._tracks = [];
    //     return this;
    // };
    elements = function() {
        return this._elements;
    };
    addElement = function(element) {
        element.start(0);
        if (element.duration() === 0) {
            if (this.duration() > 10) {
                element.duration(10.0);
            } else {
                element.duration(this.duration());
            }
        } else if (element.duration() > this.duration()) {
            element.duration(this.duration());
            this.duration(element.duration()); // update scene duration
        }
        this._elements.push(element);
        return this;
    };
    updateElement = function(element, index) {
        this._elements[index] = element;
        return this;
    };
    backgroundColor = function(backgroundColor) {
        if (backgroundColor == null){
            return this._backgroundColor;
        } else {
            this._backgroundColor = backgroundColor;
            return this;
        }
    };
    backgroundImage = function(backgroundImage) {
        if (backgroundImage == null){
            return this._backgroundImage;
        } else {
            this._backgroundImage = backgroundImage;
            return this;
        }
    };
}