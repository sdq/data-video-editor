
export default class TextInfo {
    //default info  高度在TextElement自适应后获取给textEditor
    constructor(text, x, y, rotation, color = 'black', textSize = 20, fontFamily = 'PingFang SC', fontStyle, textDecorationLine, opacity = 1, textAlign = 'left', width = 200, height = 20) {
        this.text = text;
        this.x = x;
        this.y = y;
        this.rotation = rotation;
        this.color = color;
        this.textSize = textSize;
        this.fontFamily = fontFamily;
        this.fontStyle = fontStyle;
        this.textDecorationLine = textDecorationLine;
        this.opacity = opacity;
        this.textAlign = textAlign;
        this.width = width;   
    }
}