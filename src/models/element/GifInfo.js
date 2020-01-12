export default class GifInfo {
    constructor(id, name, src, delay, gifFrames, x, y, width, height, rotation, opacity = 1) {
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
        //id 是为了项目导入时可以根据id调用pimcore后台获取到资源对象，然后转换成本地的url给gif-frame库解析
        this.assetId = id;
    }
}