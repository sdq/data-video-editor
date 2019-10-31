import React, { Component } from 'react';
let gridlinecolor = '#C0C0C0';

export default class  GridLines extends Component {
    render() {
        return (       
            <div style={{position:'absolute', zIndex:1}}>
                <div style={{position:'absolute', zIndex:1, marginLeft: 100,  width:1, height:450,borderLeftColor: gridlinecolor, borderLeftWidth: 1, borderLeftStyle: 'dashed',opacity:0.5}} />
                <div style={{position:'absolute', zIndex:1, marginLeft: 200,  width:1, height:450,borderLeftColor: gridlinecolor, borderLeftWidth: 1, borderLeftStyle: 'dashed',opacity:0.5}} />
                <div style={{position:'absolute', zIndex:1, marginLeft: 300,  width:1, height:450,borderLeftColor: gridlinecolor, borderLeftWidth: 1, borderLeftStyle: 'dashed',opacity:0.5}} />
                <div style={{position:'absolute', zIndex:1, marginLeft: 400,  width:1, height:450,borderLeftColor: gridlinecolor, borderLeftWidth: 1, borderLeftStyle: 'dashed',opacity:0.5}} />
                <div style={{position:'absolute', zIndex:1, marginLeft: 500,  width:1, height:450,borderLeftColor: gridlinecolor, borderLeftWidth: 1, borderLeftStyle: 'dashed',opacity:0.5}} />
                <div style={{position:'absolute', zIndex:1, marginLeft: 600,  width:1, height:450,borderLeftColor: gridlinecolor, borderLeftWidth: 1, borderLeftStyle: 'dashed',opacity:0.5}} />
                <div style={{position:'absolute', zIndex:1, marginLeft: 700,  width:1, height:450,borderLeftColor: gridlinecolor, borderLeftWidth: 1, borderLeftStyle: 'dashed',opacity:0.5}} />

                <div style={{position:'absolute', zIndex:2, marginTop: 90,  height:1, width:800, borderTopColor: gridlinecolor, borderTopWidth: 1, borderTopStyle: 'dashed',opacity:0.5}} />
                <div style={{position:'absolute', zIndex:2, marginTop: 180, height:1, width:800, borderTopColor: gridlinecolor, borderTopWidth: 1, borderTopStyle: 'dashed',opacity:0.5}} />
                <div style={{position:'absolute', zIndex:2, marginTop: 270, height:1, width:800, borderTopColor: gridlinecolor, borderTopWidth: 1, borderTopStyle: 'dashed',opacity:0.5}} />
                <div style={{position:'absolute', zIndex:2, marginTop: 360, height:1, width:800, borderTopColor: gridlinecolor, borderTopWidth: 1, borderTopStyle: 'dashed',opacity:0.5}} />
            </div>
        )
    }
}
