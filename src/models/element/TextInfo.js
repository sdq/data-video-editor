export default class TextInfo {
    constructor(text, x, y, rotation, color='black', textSize=20, fontFamily = 'Helvetica', fontStyle, textDecorationLine,opacity=1,textAlign='left',width,height) {
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
        this.height = height;
    }
}