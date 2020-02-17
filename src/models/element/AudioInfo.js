export default class AudioInfo {
    constructor(id, name, src, duration, backgroundmusic, volume) {
        this.name = name;
        this.src = src;
        this.duration = duration;
        this.backgroundmusic = backgroundmusic;
        this.volume = volume;
        this.assetId = id; //目前assetId 只在项目导入的时候
    }
}