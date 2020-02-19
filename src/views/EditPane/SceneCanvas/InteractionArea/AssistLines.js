import React, { Component } from 'react';


let assistlinecolor = '#DCDCDC';
const originW = 800;
const originH = 450;



export default class AssistLines extends Component {
 

    render() {
        //获取当前元素信息（不考虑旋转情况）
        let x = 0;
        let y = 0;
        let w = 0;
        let h = 0;
        let r = 0;         //旋转要素不显示其辅助线
        let smallW = false;//较小的素材不显示中间辅助线
        let smallH = false;//较小的素材不显示中间辅助线
        let isChartLine = false;//chart暂时不显示中间辅助线

        // const shapeType = (this.props.currentElement.type()==="shape_element");
        // const shapeCircle = (this.props.currentElement.info().shapeType==="circle"||this.props.currentElement.info().shapeType==="ellipse"||this.props.currentElement.info().shapeType==="star");




        if(this.props.currentElement && this.props.currentElement.info()){
            if (this.props.dragPos){
                // x = shapeCircle&&shapeType?this.props.dragPos.x-this.props.currentElement.info().width/2:this.props.dragPos.x;
                // y = shapeCircle&&shapeType?this.props.dragPos.y-this.props.currentElement.info().height/2:this.props.dragPos.y;
                x =this.props.dragPos.x;
                y = this.props.dragPos.y;
            }else{
                x = this.props.currentElement.info().x;
                y = this.props.currentElement.info().y;
            }
            if (this.props.transformInfo){
                w = this.props.transformInfo.w;
                h = this.props.transformInfo.h;
                r = this.props.transformInfo.r;
               // console.log("this.props.transformInfo",this.props.transformInfo.w)
            }else{
                w = this.props.currentElement.info().width;
                h = this.props.currentElement.info().height;
                r = this.props.currentElement.info().rotation;
                //console.log("this.props.currentElement.info()",this.props.currentElement.info())
            }


             if(w<100){smallW=true;}
             if(h<100){smallH=true;}
        }


        //判定显示辅助线的margin（略大于显示margin）
        let margin = 30;

        //判断素材四周和中央是否靠近画布中央和边侧辅助线
        let marginLeftL = Math.abs(x - 0); //素材左-画布左
        let marginTopT = Math.abs(y - 0);  //素材上-画布上
        let marginRightR = Math.abs(x+w - originW);  //素材右-画布右
        let marginBottomB = Math.abs(y+h - originH);  //素材下-画布下

        let marginCenterXC = Math.abs(x+w/2 - originW/2);  //素材中-画布中
        let marginCenterYC = Math.abs(y+h/2 - originH/2);  //素材中-画布中

        let marginLeftC = Math.abs(x - originW/2); //素材左-画布中
        let marginTopC = Math.abs(y - originH/2);  //素材上-画布中
        let marginRightC = Math.abs(x+w - originW/2);  //素材右-画布中
        let marginBottomC = Math.abs(y+h - originH/2);  //素材下-画布中

        //Gridline、Assistline使用的不是konva图层，需要将x y w h 在显示前转换成普通canvas系统

        var canvasW = this.props.contentWidth;
        var canvasH = this.props.contentHeight-100;

        //当宽高同时变化，按照最小的scale缩放
        const scaleX = canvasW/800;
        const scaleY = canvasH/450;
        //获取现在画布的真实大小
        var fakeWidth = 0;
        var fakeHeight = 0;
        if(scaleX>scaleY){
            fakeWidth = 800*canvasH/450;
            fakeHeight = canvasH;
        }else {
            fakeWidth = canvasW;
            fakeHeight = canvasW*450/800;
        }
        


        x = x*(fakeWidth/originW);
        y = y*(fakeHeight/originH);
        w = w*(fakeWidth/originW);
        h = h*(fakeHeight/originH);

        canvasH = fakeHeight;
        canvasW = fakeWidth;

        
        //显示固定辅助线和动态辅助线
        return (
            <div style={{ 
            position: 'absolute', 
            zIndex: 1 ,
           }}>
                
                {/* 四周 */}
                <div style={{ display: marginLeftL < margin ? 'block' : 'none', position: 'absolute', zIndex: 1, marginLeft: 1, height: canvasH, width: 1, borderLeftColor: assistlinecolor, borderLeftWidth: 1, borderLeftStyle: 'dashed' }} />
                <div style={{ display: marginTopT < margin ? 'block' : 'none', position: 'absolute', zIndex: 2, marginTop: 1, height: 1, width: canvasW, borderTopColor: assistlinecolor, borderTopWidth: 1, borderTopStyle: 'dashed' }} />

                <div style={{ display: marginRightR < margin ? 'block' : 'none', position: 'absolute', zIndex: 1, marginLeft: canvasW-1, height: canvasH, width: 1, borderLeftColor: assistlinecolor, borderLeftWidth: 1, borderLeftStyle: 'dashed' }} />
                <div style={{ display: marginBottomB < margin ? 'block' : 'none', position: 'absolute', zIndex: 2, marginTop: canvasH-1, height: 1, width: canvasW, borderTopColor: assistlinecolor, borderTopWidth: 1, borderTopStyle: 'dashed' }} />
                
                {/* 中 */}
                <div style={{ display: marginCenterXC < margin ? 'block' : 'none', position: 'absolute', zIndex: 1, marginLeft: canvasW/2, height: canvasH, width: 1, borderLeftColor: assistlinecolor, borderLeftWidth: 1, borderLeftStyle: 'dashed' }} />
                <div style={{ display: marginCenterYC < margin ? 'block' : 'none', position: 'absolute', zIndex: 2, marginTop: canvasH/2, height: 1, width: canvasW, borderTopColor: assistlinecolor, borderTopWidth: 1, borderTopStyle: 'dashed' }} />

                {/* 中 */}
                <div style={{ display: marginLeftC < margin ? 'block' : 'none', position: 'absolute', zIndex: 1, marginLeft: canvasW/2, height: canvasH, width: 1, borderLeftColor: assistlinecolor, borderLeftWidth: 1, borderLeftStyle: 'dashed' }} />
                <div style={{ display: marginTopC < margin ? 'block' : 'none', position: 'absolute', zIndex: 2, marginTop: canvasH/2, height: 1, width: canvasW, borderTopColor: assistlinecolor, borderTopWidth: 1, borderTopStyle: 'dashed' }} />

                {/* 中 */}
                <div style={{ display: marginRightC < margin ? 'block' : 'none', position: 'absolute', zIndex: 1, marginLeft: canvasW/2, height: canvasH, width: 1, borderLeftColor: assistlinecolor, borderLeftWidth: 1, borderLeftStyle: 'dashed' }} />
                <div style={{ display: marginBottomC < margin ? 'block' : 'none', position: 'absolute', zIndex: 2, marginTop: canvasH/2, height: 1, width: canvasW, borderTopColor: assistlinecolor, borderTopWidth: 1, borderTopStyle: 'dashed' }} />

                {/* 素材 */}
                <div style={{  display:  r===0 ? 'block' : 'none',position: 'absolute', zIndex: 1, marginLeft: x - 1 || 0, marginTop: y-10 || 0,height: h+20, width: 1, borderLeftColor: assistlinecolor, borderLeftWidth: 1, borderLeftStyle: 'dashed' }} />
                <div style={{  display:  r===0 ? 'block' : 'none',position: 'absolute', zIndex: 2, marginTop: y - 1 || 0, marginLeft: x-10 || 0,height: 1, width: w+20, borderTopColor: assistlinecolor, borderTopWidth: 1, borderTopStyle: 'dashed' }} />

                <div style={{ display: !smallW && ! isChartLine && r===0 ? 'block' : 'none',position: 'absolute', zIndex: 1, marginLeft: x+w/2 || 0, marginTop: y-10 || 0,height: h+20, width: 1, borderLeftColor: assistlinecolor, borderLeftWidth: 1, borderLeftStyle: 'dashed' }} />
                <div style={{ display: !smallH && ! isChartLine && r===0 ? 'block' : 'none',position: 'absolute', zIndex: 2, marginTop: y+h/2 || 0, marginLeft: x-10 || 0,height: 1, width: w+20, borderTopColor: assistlinecolor, borderTopWidth: 1, borderTopStyle: 'dashed' }} />

                <div style={{ display: !isChartLine && r===0 ? 'block' : 'none',position: 'absolute', zIndex: 1, marginLeft: x+w - 1 || 0, marginTop: y-10 || 0,height: h+20, width: 1, borderLeftColor: assistlinecolor, borderLeftWidth: 1, borderLeftStyle: 'dashed' }} />
                <div style={{ display: !isChartLine && r===0 ? 'block' : 'none',position: 'absolute', zIndex: 2, marginTop: y+h - 1 || 0, marginLeft: x-10 || 0,height: 1, width: w+20, borderTopColor: assistlinecolor, borderTopWidth: 1, borderTopStyle: 'dashed' }} />
                
                <div>
                    {this.props.dynamicAssistLines && this.props.dynamicAssistLines.map(function(lines, index) {
                    let isRow = lines&&(lines[0]===-1);
                    if(isRow){
                        return <div key={index} index={index} style={{ position: 'absolute', zIndex: 3, marginTop: lines[1] ,width: canvasW, height: 1, borderTopColor: assistlinecolor, borderTopWidth: 1, borderTopStyle: 'dashed' }} />  
                    }else{
                        return <div key={index} index={index} style={{ position: 'absolute', zIndex: 4, marginLeft: lines[0], width: 10, height: canvasH, borderLeftColor: assistlinecolor, borderLeftWidth: 1, borderLeftStyle: 'dashed' }} />  
                    }})}
                    </div>        
                </div>
        )
    }
}

