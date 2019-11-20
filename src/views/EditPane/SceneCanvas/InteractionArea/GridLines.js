import React, { Component } from 'react';
let gridlinecolor = '#C0C0C0';

export default class  GridLines extends Component {
    render() {
        const canvasW = 800*(this.props.contentHeight-100)/450;
        const canvasH = this.props.contentHeight-100;
        return (       
            <div style={{position:'absolute', zIndex:1}}>
                <div style={{position:'absolute', zIndex:1, marginLeft: (canvasW/8)*1,  width:1, height:canvasH,borderLeftColor: gridlinecolor, borderLeftWidth: 1, borderLeftStyle: 'dashed',opacity:0.5}} />
                <div style={{position:'absolute', zIndex:1, marginLeft: (canvasW/8)*2,  width:1, height:canvasH,borderLeftColor: gridlinecolor, borderLeftWidth: 1, borderLeftStyle: 'dashed',opacity:0.5}} />
                <div style={{position:'absolute', zIndex:1, marginLeft: (canvasW/8)*3,  width:1, height:canvasH,borderLeftColor: gridlinecolor, borderLeftWidth: 1, borderLeftStyle: 'dashed',opacity:0.5}} />
                <div style={{position:'absolute', zIndex:1, marginLeft: (canvasW/8)*4,  width:1, height:canvasH,borderLeftColor: gridlinecolor, borderLeftWidth: 1, borderLeftStyle: 'dashed',opacity:0.5}} />
                <div style={{position:'absolute', zIndex:1, marginLeft: (canvasW/8)*5,  width:1, height:canvasH,borderLeftColor: gridlinecolor, borderLeftWidth: 1, borderLeftStyle: 'dashed',opacity:0.5}} />
                <div style={{position:'absolute', zIndex:1, marginLeft: (canvasW/8)*6,  width:1, height:canvasH,borderLeftColor: gridlinecolor, borderLeftWidth: 1, borderLeftStyle: 'dashed',opacity:0.5}} />
                <div style={{position:'absolute', zIndex:1, marginLeft: (canvasW/8)*7,  width:1, height:canvasH,borderLeftColor: gridlinecolor, borderLeftWidth: 1, borderLeftStyle: 'dashed',opacity:0.5}} />

                <div style={{position:'absolute', zIndex:2, marginTop: (canvasH/5)*1,  height:1, width:canvasW, borderTopColor: gridlinecolor, borderTopWidth: 1, borderTopStyle: 'dashed',opacity:0.5}} />
                <div style={{position:'absolute', zIndex:2, marginTop: (canvasH/5)*2, height:1, width:canvasW, borderTopColor: gridlinecolor, borderTopWidth: 1, borderTopStyle: 'dashed',opacity:0.5}} />
                <div style={{position:'absolute', zIndex:2, marginTop: (canvasH/5)*3, height:1, width:canvasW, borderTopColor: gridlinecolor, borderTopWidth: 1, borderTopStyle: 'dashed',opacity:0.5}} />
                <div style={{position:'absolute', zIndex:2, marginTop: (canvasH/5)*4, height:1, width:canvasW, borderTopColor: gridlinecolor, borderTopWidth: 1, borderTopStyle: 'dashed',opacity:0.5}} />
            </div>
        )
    }
}
