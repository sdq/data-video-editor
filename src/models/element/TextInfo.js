export default class TextInfo {
    constructor(text, x, y, rotation, color='black', textSize=20, fontFamily = 'Helvetica', fontStyle, textDecorationLine,opacity=1,textAlign='left',width=400,height=60) {
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
        //default size when create newtext
        this.width = text ? text.length * textSize:width; //the number of text*scale
        //this.height = height;//fake height
        this.height = text ? Math.ceil((text.length * textSize)/width)*(textSize+5) : height;// 根据字数、字号、宽度，计算当前行高，10为额外行距
    }
}