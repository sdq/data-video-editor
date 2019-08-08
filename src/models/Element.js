export class Element {
    constructor(type, info) {
        this.type = type;
        this.info = info;
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
    constructor(dataurl, spec, x, y, width, height, rotation) {
        this.dataurl = dataurl;
        this.spec = spec;
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