import React, { Component } from 'react';
import Color from '@/constants/Color';

export default class AssistLines extends Component {


    render() {
        //获取当前元素信息（不考虑旋转情况）
        const x = this.props.currentElement.info().x;
        const y = this.props.currentElement.info().y;
        const w = this.props.currentElement.info().width;
        const h = this.props.currentElement.info().height;
        //console.log(w,h)
        
        //判定显示辅助线的margin
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


        //TODO:显示动态辅助线，显示全部素材四周辅助线（较为简单的策略） //矩形相交判定周围一定距离素材的四周辅助线（较为复杂的策略）


        //显示固定辅助线，包括：画布四周、中央、当前素材四周和中央，要求素材尺寸正确
        return (
            <div style={{ position: 'absolute', zIndex: 1 }}>
                
                <div style={{ display: marginLeftL < margin ? 'block' : 'none', position: 'absolute', zIndex: 1, marginLeft: 1, height: 450, width: 1, borderLeftColor: Color.ORANGE, borderLeftWidth: 1, borderLeftStyle: 'dashed' }} />
                <div style={{ display: marginTopT < margin ? 'block' : 'none', position: 'absolute', zIndex: 2, marginTop: 1, height: 1, width: 800, borderTopColor: Color.ORANGE, borderTopWidth: 1, borderTopStyle: 'dashed' }} />

                <div style={{ display: marginRightR < margin ? 'block' : 'none', position: 'absolute', zIndex: 1, marginLeft: 799, height: 450, width: 1, borderLeftColor: Color.ORANGE, borderLeftWidth: 1, borderLeftStyle: 'dashed' }} />
                <div style={{ display: marginBottomB < margin ? 'block' : 'none', position: 'absolute', zIndex: 2, marginTop: 449, height: 1, width: 800, borderTopColor: Color.ORANGE, borderTopWidth: 1, borderTopStyle: 'dashed' }} />
              
                <div style={{ display: marginCenterXC < margin ? 'block' : 'none', position: 'absolute', zIndex: 1, marginLeft: 400, height: 450, width: 1, borderLeftColor: Color.ORANGE, borderLeftWidth: 1, borderLeftStyle: 'dashed' }} />
                <div style={{ display: marginCenterYC < margin ? 'block' : 'none', position: 'absolute', zIndex: 2, marginTop: 225, height: 1, width: 800, borderTopColor: Color.ORANGE, borderTopWidth: 1, borderTopStyle: 'dashed' }} />

                <div style={{ display: marginLeftC < margin ? 'block' : 'none', position: 'absolute', zIndex: 1, marginLeft: 400, height: 450, width: 1, borderLeftColor: Color.ORANGE, borderLeftWidth: 1, borderLeftStyle: 'dashed' }} />
                <div style={{ display: marginTopC < margin ? 'block' : 'none', position: 'absolute', zIndex: 2, marginTop: 225, height: 1, width: 800, borderTopColor: Color.ORANGE, borderTopWidth: 1, borderTopStyle: 'dashed' }} />

                <div style={{ display: marginRightC < margin ? 'block' : 'none', position: 'absolute', zIndex: 1, marginLeft: 400, height: 450, width: 1, borderLeftColor: Color.ORANGE, borderLeftWidth: 1, borderLeftStyle: 'dashed' }} />
                <div style={{ display: marginBottomC < margin ? 'block' : 'none', position: 'absolute', zIndex: 2, marginTop: 225, height: 1, width: 800, borderTopColor: Color.ORANGE, borderTopWidth: 1, borderTopStyle: 'dashed' }} />

                <div style={{ position: 'absolute', zIndex: 1, marginLeft: x - 1 || 0, marginTop: y-25 || 0,height: h+50, width: 1, borderLeftColor: Color.ORANGE, borderLeftWidth: 1, borderLeftStyle: 'dashed' }} />
                <div style={{ position: 'absolute', zIndex: 2, marginTop: y - 1 || 0, marginLeft: x-25 || 0,height: 1, width: w+50, borderTopColor: Color.ORANGE, borderTopWidth: 1, borderTopStyle: 'dashed' }} />

                <div style={{ position: 'absolute', zIndex: 1, marginLeft: x+w/2 || 0, marginTop: y-25 || 0,height: h+50, width: 1, borderLeftColor: Color.ORANGE, borderLeftWidth: 1, borderLeftStyle: 'dashed' }} />
                <div style={{ position: 'absolute', zIndex: 2, marginTop: y+h/2 || 0, marginLeft: x-25 || 0,height: 1, width: w+50, borderTopColor: Color.ORANGE, borderTopWidth: 1, borderTopStyle: 'dashed' }} />

                <div style={{ position: 'absolute', zIndex: 1, marginLeft: x+w - 1 || 0, marginTop: y-25 || 0,height: h+50, width: 1, borderLeftColor: Color.ORANGE, borderLeftWidth: 1, borderLeftStyle: 'dashed' }} />
                <div style={{ position: 'absolute', zIndex: 2, marginTop: y+h - 1 || 0, marginLeft: x-25 || 0,height: 1, width: w+50, borderTopColor: Color.ORANGE, borderTopWidth: 1, borderTopStyle: 'dashed' }} />
                
            </div>
        )
    }
}
