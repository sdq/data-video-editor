import uuidv4 from 'uuid/v4';

export class Element {
    constructor(type, info) {
        this._id = uuidv4();
        this._type = type;
        this._info = info;
        this._duration = 0;
        this._style = "";
        this._loop = "loop";
        this._index = 0;
        this._start = 0;
        this._duration = 0;
        this._animations = [];
        this.id = function() {
            return this._id;
        };
        this.type = function(type) {
            //element type
            if (type == null){
                return this._type;
            } else {
                this._type = type;
                return this;
            }
        };
        this.info = function(info) {
            //element info
            if (info == null){
                return this._info;
            } else {
                this._info = info;
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
        this.style = function(style) {
            //set animation style
            if (style == null){
                return this._style;
            } else {
                this._style = style;
                return this;
            }
        };
        this.start = function(start) {
            if (start == null){
                return this._start;
            } else {
                this._start = start;
                return this;
            }
        };
        this.duration = function(duration) {
            if (duration == null){
                return this._duration;
            } else {
                this._duration = duration;
                return this;
            }
        };
        // animation
        this.animations = function() {
            return this._animations;
        };
        this.add = function(animation) {
            animation.start(0);
            animation.duration(this.duration());
            this._animations.push(animation);
            return this;
        };
        this.update = function(animation, index) {
            this._animations[index] = animation;
            return this;
        };
        this.remove = function(index) {
            this._animations.splice(index, 1);
            return this;
        };
    }
}

export class ImageInfo {
    constructor(name, src, x, y, width, height, rotation) {
        this.name = name;
        this.src = src;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.rotation = rotation;
    }
}

export class AudioInfo {
    constructor(name, src) {
        this.name = name;
        this.src = src;
    }
}

export class ChartInfo {
    constructor(dataIndex, type, spec, x, y, width, height, rotation) {
        this.dataIndex = dataIndex;
        this.type = type; // chart type
        this.spec = spec; // chart spec
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.rotation = rotation;
    }
}

export class TextInfo {
    constructor(text, x, y, rotation) {
        this.text = text;
        this.x = x;
        this.y = y;
        this.rotation = rotation;
    }
}