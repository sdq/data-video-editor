import uuidv4 from 'uuid/v4';
import Fragment from './element/Fragment';

export default class Scene {
    constructor(script, duration) {
        this._id = uuidv4();
        this._script = script;
        this._duration = duration;
        // this._tracks = [];
        // this.dataurl = dataurl;
        this._elements = []; //TODO: move to track
        this._audios = [];
        this._videoTags = [];
        this._videos = [];
        this._backgroundColor = '#ffffff';
        this._backgroundImage = '';
        this._backgroundMusic = '';
    }
    // id = function () {
    //     return this._id;
    // }
    id = function (id) {
        //set id
        if (id == null) {
            return this._id;
        } else {
            this._id = id;
            return this;
        }
    };
    script = function (script) {
        //set animation duration
        if (script == null) {
            return this._script;
        } else {
            this._script = script;
            return this;
        }
    };
    play = function () {
        //TODO: play
    };
    pause = function () {
        //TODO: pause
    };
    stop = function () {
        //TODO: stop
    };
    forward = function () {
        //TODO: forward to next frame
    };
    backward = function () {
        //TODO: backward to last frame
    };
    begin = function () {
        //TODO: first frame
    };
    end = function () {
        //TODO: end frame
    };
    duration = function (duration) {
        //set animation duration
        if (duration == null) {
            return this._duration;
        } else {
            this._duration = duration;
            return this;
        }
    };
    elements = function () {
        return this._elements;
    };

    audios = function () {
        return this._audios;
    };
    addAudio = function (audio) {
        this._audios.push(audio);
    };
    videos = function () {
        //console.log("videos", this._videos)
        return this._videos;
    };
    addVideo = function (video) {
        let isInList = false;
        if (this._videos.length !== 0) {
            this._videos.map(item => {
                if (item.id === video.id) {
                    isInList = true;
                }
                return video;
            })
        }
        if (!isInList) {
            //添加到播放列表中
            this._videos.push(video)
        }
    };
    videoTags = function () {
        return this._videoTags;
    };
    addVideoTag = function (tag) {
        this._videoTags.push(tag);
    };
    addElement = function (element) {
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
        let fragment = new Fragment(0, element.duration());
        element.addFragment(fragment);
        this._elements.push(element);
        return this;
    };
    updateElement = function (element, index) {
        this._elements[index] = element;
        return this;
    };
    backgroundColor = function (backgroundColor) {
        if (backgroundColor == null) {
            return this._backgroundColor;
        } else {
            this._backgroundColor = backgroundColor;
            return this;
        }
    };
    backgroundImage = function (backgroundImage) {
        if (backgroundImage == null) {
            return this._backgroundImage;
        } else {
            this._backgroundImage = backgroundImage;
            return this;
        }
    };
    backgroundMusic = function (backgroundMusic) {
        if (backgroundMusic == null) {
            return this._backgroundMusic;
        } else {
            this._backgroundMusic = backgroundMusic;
            return this;
        }
    };
}