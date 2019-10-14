export default class GifInfo {
    constructor(name, src, delay, gifFrames, x, y, width, height, rotation, opacity = 1) {
        this.name = name;
        this.src = src;
        this.delay = delay;
        this.gifFrames = gifFrames;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.rotation = rotation;
        this.opacity = opacity;
    }
}