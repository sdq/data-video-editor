export default class ImageInfo {

    constructor(name, src, x, y, width, height, rotation, opacity = 1) {
        this.name = name;
        this.src = src;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;       
        this.rotation = rotation;
        this.opacity = opacity;
    }
}