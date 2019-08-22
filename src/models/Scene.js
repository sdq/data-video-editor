import uuidv4 from 'uuid/v4';

export default class Scene {
    constructor(script, elements, duration) {
        this._id = uuidv4();
        this._script = script;
        this._duration = duration;
        this._tracks = [];
        // this.dataurl = dataurl;
        this.elements = elements; //TODO: move to track
        this.id = function() {
            return this._id;
        }
        this.script = function(script) {
            //set animation duration
            if (script == null){
                return this._script;
            } else {
                this._script = script;
                return this;
            }
        };
        this.play = function() {
            //TODO: play
        };
        this.pause = function() {
            //TODO: pause
        };
        this.stop = function() {
            //TODO: stop
        };
        this.forward = function() {
            //TODO: forward to next frame
        };
        this.backward = function() {
            //TODO: backward to last frame
        };
        this.begin = function() {
            //TODO: first frame
        };
        this.end = function() {
            //TODO: end frame
        };
        this.duration = function(duration) {
            //set animation duration
            if (duration == null){
                return this._duration;
            } else {
                this._duration = duration;
                return this;
            }
        };
        this.loop = function(loop) {
            //set animation loop
            if (loop == null){
                return this._loop;
            } else {
                this._loop = loop;
                return this;
            }
        };
        this.tracks = function(tracks) {
            if (tracks == null){
                return this._tracks;
            } else {
                this._tracks = tracks;
                return this;
            }
        };
        this.add = function(track) {
            this._tracks.push(track);
            return this;
        }
        this.remove = function(index) {
            this._tracks.splice(index, 1);
            return this;
        }
        this.clear = function() {
            this._tracks = [];
            return this;
        }
    }
}