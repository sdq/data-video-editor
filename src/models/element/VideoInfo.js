export default class VideoInfo {
    constructor(id, name, src, duration, x, y, width, height, rotation, opacity = 1) {
        this.name = name;
        this.src = src;
        this.duration = duration;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.rotation = rotation;
        this.opacity = opacity;
        this.assetId = id; //目前assetId 只在项目导入的时候
    }
}