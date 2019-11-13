import React, { Component } from 'react';
import ElementType from '@/constants/ElementType';


let assistlinecolor = '#DCDCDC';

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
        //console.log(w,h)
        if(this.props.currentElement && this.props.currentElement.info()){
            if (this.props.dragPos){
                x = this.props.dragPos.x;
                y = this.props.dragPos.y;
            }

            if (this.props.transformInfo){
                w = this.props.transformInfo.w;
                h = this.props.transformInfo.h;
                r = this.props.transformInfo.r;
            }
            
            if(!this.props.dragPos){
                x = this.props.currentElement.info().x;
                y = this.props.currentElement.info().y;
            }
            if(!this.props.transformInfo){
                w = this.props.currentElement.info().width;
                h = this.props.currentElement.info().height;
                r = this.props.currentElement.info().rotation;
               }

             if(w<100){smallW=true;}
             if(h<100){smallH=true;}
        }


        //TODO:优化图表高宽度，才可以正确使用辅助线
        if(this.props.currentElement.type()=== ElementType.CHART){
            isChartLine = true;
        }


        //判定显示辅助线的margin（略大于显示margin）
        let margin = 40;

        //判断素材四周和中央是否靠近画布中央和边侧辅助线
        let marginLeftL = Math.abs(x - 0); //素材左-画布左
        let marginTopT = Math.abs(y - 0);  //素材上-画布上
        let marginRightR = Math.abs(x+w - 800);  //素材右-画布右
        let marginBottomB = Math.abs(y+h - 450);  //素材下-画布下

        let marginCenterXC = Math.abs(x+w/2 - 400);  //素材中-画布中
        let marginCenterYC = Math.abs(y+h/2 - 225);  //素材中-画布中

        let marginLeftC = Math.abs(x - 400); //素材左-画布中
        let marginTopC = Math.abs(y - 225);  //素材上-画布中
        let marginRightC = Math.abs(x+w - 400);  //素材右-画布中
        let marginBottomC = Math.abs(y+h - 225);  //素材下-画布中



        //显示固定辅助线和动态辅助线
        return (
            <div style={{ position: 'absolute', zIndex: 1 }}>
                
                <div style={{ display: marginLeftL < margin ? 'block' : 'none', position: 'absolute', zIndex: 1, marginLeft: 1, height: 450, width: 1, borderLeftColor: assistlinecolor, borderLeftWidth: 1, borderLeftStyle: 'dashed' }} />
                <div style={{ display: marginTopT < margin ? 'block' : 'none', position: 'absolute', zIndex: 2, marginTop: 1, height: 1, width: 800, borderTopColor: assistlinecolor, borderTopWidth: 1, borderTopStyle: 'dashed' }} />

                <div style={{ display: marginRightR < margin ? 'block' : 'none', position: 'absolute', zIndex: 1, marginLeft: 799, height: 450, width: 1, borderLeftColor: assistlinecolor, borderLeftWidth: 1, borderLeftStyle: 'dashed' }} />
                <div style={{ display: marginBottomB < margin ? 'block' : 'none', position: 'absolute', zIndex: 2, marginTop: 449, height: 1, width: 800, borderTopColor: assistlinecolor, borderTopWidth: 1, borderTopStyle: 'dashed' }} />
              
                <div style={{ display: marginCenterXC < margin ? 'block' : 'none', position: 'absolute', zIndex: 1, marginLeft: 400, height: 450, width: 1, borderLeftColor: assistlinecolor, borderLeftWidth: 1, borderLeftStyle: 'dashed' }} />
                <div style={{ display: marginCenterYC < margin ? 'block' : 'none', position: 'absolute', zIndex: 2, marginTop: 225, height: 1, width: 800, borderTopColor: assistlinecolor, borderTopWidth: 1, borderTopStyle: 'dashed' }} />

                <div style={{ display: marginLeftC < margin ? 'block' : 'none', position: 'absolute', zIndex: 1, marginLeft: 400, height: 450, width: 1, borderLeftColor: assistlinecolor, borderLeftWidth: 1, borderLeftStyle: 'dashed' }} />
                <div style={{ display: marginTopC < margin ? 'block' : 'none', position: 'absolute', zIndex: 2, marginTop: 225, height: 1, width: 800, borderTopColor: assistlinecolor, borderTopWidth: 1, borderTopStyle: 'dashed' }} />

                <div style={{ display: marginRightC < margin ? 'block' : 'none', position: 'absolute', zIndex: 1, marginLeft: 400, height: 450, width: 1, borderLeftColor: assistlinecolor, borderLeftWidth: 1, borderLeftStyle: 'dashed' }} />
                <div style={{ display: marginBottomC < margin ? 'block' : 'none', position: 'absolute', zIndex: 2, marginTop: 225, height: 1, width: 800, borderTopColor: assistlinecolor, borderTopWidth: 1, borderTopStyle: 'dashed' }} />

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
                        return <div key={index} index={index} style={{ position: 'absolute', zIndex: 3, marginTop: lines[1] ,width: 800, height: 1, borderTopColor: assistlinecolor, borderTopWidth: 1, borderTopStyle: 'dashed' }} />  
                    }else{
                        return <div key={index} index={index} style={{ position: 'absolute', zIndex: 4, marginLeft: lines[0], width: 10, height: 450, borderLeftColor: assistlinecolor, borderLeftWidth: 1, borderLeftStyle: 'dashed' }} />  
                    }})}
                    </div>        
                </div>
        )
    }
}
