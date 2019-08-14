export default class Video {
    constructor(id) {
        this._id = id;
        this._loop = "None";
        this._scenes = [];
        this.id = function(id) {
            if (id == null){
                return this._id;
            } else {
                this._id = id;
                return this;
            }
        };
        this.play = function() {
            //TODO: play
            return this;
        };
        this.pause = function() {
            //TODO: pause
            return this;
        };
        this.stop = function() {
            //TODO: stop
            return this;
        };
        this.forward = function() {
            //TODO: forward next frame
            return this;
        };
        this.backward = function() {
            //TODO: backward last frame
            return this;
        };
        this.begin = function() {
            //TODO: to the first frame
            return this;
        };
        this.end = function() {
            //TODO: to the last frame
            return this;
        };
        this.duration = function() {
            //TODO: return duration
            // return 10;
        };
        this.loop = function(loop) {
            this._loop = loop;
        };
        this.scenes = function() {
            return this._scenes;
        };
        this.add = function(scene) {
            this._scenes.push(scene);
            return this;
        }
        this.remove = function(index) {
            this._scenes.splice(index, 1);
            return this;
        }
        this.update = function(index,scene) {
            this._scenes[index] = scene;
            return this;
        }
        this.clear = function() {
            this._scenes = [];
            return this;
        }
    }
}