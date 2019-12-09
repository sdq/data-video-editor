import Color from '@/constants/Color';

export default class ShapeInfo {
    //default info for 6 features
    constructor(shapeType, x, y, rotation, color=Color.ORANGE,opacity=1,width=50,height=50,stroke='black',strokeWidth=3,shadowColor=Color.GRAY,shadowBlur=0,cornerRadius=0,numPoints=5,pointerLength=5,pointerWidth=5,isPosTool=false) {
        this.name = shapeType;
        this.shapeType =shapeType;
        // if circle  //this.x= (shapeType==="cicle"?x+100:x);
        this.x = x;
        this.y = y;
        this.rotation = rotation;
        this.color = color;
        this.opacity = opacity;
        this.width = width;   // need init 
        this.height = shapeType==="line"||shapeType==="arrow"?(strokeWidth?strokeWidth:3):height; // need init  //if line
        //this.height = height;
        this.stroke = stroke;
        this.strokeWidth = strokeWidth;
        this.shadowColor = shadowColor;
        this.shadowBlur = shadowBlur;
        this.cornerRadius = cornerRadius; //for rect
        this.numPoints = numPoints;//for star
        this.pointerLength =pointerLength;//for arrow
        this.pointerWidth =pointerWidth;//for arrow
        this.isPosTool =isPosTool;//判断是否为postool传递信息
    }   
}


//shapeType : rect line circle ellipse star arrow