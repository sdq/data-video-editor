export default class ChartInfo {
    constructor(dataIndex, type, spec, x, y, width, height, rotation) {
        this.dataIndex = dataIndex;
        this.type = type; // chart type
        this.spec = spec; // chart spec
        this.x = x; // position x
        this.y = y; // position y
        this.width = width;
        this.height = height;
        this.rotation = rotation;
    }
}