export class Element {
    constructor(type, info) {
        this.type = type;
        this.info = info;
    }
}

export class ImageInfo {
    constructor(src, x, y, width, height, rotation, zIndex) {
        this.src = src;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.rotation = rotation;
    }
}

export class TextInfo {
    constructor(text, x, y, width, height, rotation, zIndex) {
        this.text = text;
        this.x = x;
        this.y = y;
    }
}