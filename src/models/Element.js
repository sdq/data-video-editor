export class Element {
    constructor(type, info) {
        this._type = type;
        this._info = info;
        this._duration = 0;
        this._style = "";
        this._loop = "loop";
        this._index = 0;
        this._sstart = 0;
        this._sduration = 0;
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
        this.sstart = function(sstart) {
            //set scene start time
            if (sstart == null){
                return this._sstart;
            } else {
                this._sstart = sstart;
                return this;
            }
        };
        this.sduration = function(sduration) {
            //set scene duration
            if (sduration == null){
                return this._sduration;
            } else {
                this._sduration = sduration;
                return this;
            }
        };
    }
}

export class ImageInfo {
    constructor(src, x, y, width, height, rotation) {
        this.src = src;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.rotation = rotation;
    }
}

export class ChartInfo {
    constructor(dataurl, type, spec, x, y, width, height, rotation) {
        this.dataurl = dataurl;
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