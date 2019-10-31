let widthTemp = 0;
let reg = /[\u4e00-\u9fa5]/g;

export default class TextInfo {
    constructor(text, x, y, rotation, color='black', textSize=20, fontFamily = 'Helvetica', fontStyle, textDecorationLine,opacity=1,textAlign='left',width=200,height=20) {
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
        //default size when create newtext,区分中英文宽度
        for(let i =0;i<text.length;i++){
            if(i===0){
                widthTemp =0;
            }
            if(reg.test(text[i])){
               widthTemp += textSize;
               reg.test(text[i]); //没整明白为什么还要再判断一次
            }else{
               widthTemp += textSize/2;
            }
        }
        this.width = text ? widthTemp:width; //the number of text*scale
        //this.width = text ? text.length * textSize:width; //the number of text*scale
        //this.height = height;//fake height
        this.height = text ? Math.ceil((text.length * textSize)/widthTemp)*(textSize+5) : height;// 根据字数、字号、宽度，计算当前行高，5为额外行距
    }
}