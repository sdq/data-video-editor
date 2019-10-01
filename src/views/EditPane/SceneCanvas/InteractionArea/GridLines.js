import React, { Component } from 'react';

export default class  GridLines extends Component {
    render() {
        return (       
            <div style={{position:'absolute', zIndex:1}}>
                <div style={{position:'absolute', zIndex:1, marginLeft: 100,  width:1, height:450,borderLeftColor: 'gray', borderLeftWidth: 1, borderLeftStyle: 'dashed'}} />
                <div style={{position:'absolute', zIndex:1, marginLeft: 200,  width:1, height:450,borderLeftColor: 'gray', borderLeftWidth: 1, borderLeftStyle: 'dashed'}} />
                <div style={{position:'absolute', zIndex:1, marginLeft: 300,  width:1, height:450,borderLeftColor: 'gray', borderLeftWidth: 1, borderLeftStyle: 'dashed'}} />
                <div style={{position:'absolute', zIndex:1, marginLeft: 400,  width:1, height:450,borderLeftColor: 'gray', borderLeftWidth: 1, borderLeftStyle: 'dashed'}} />
                <div style={{position:'absolute', zIndex:1, marginLeft: 500,  width:1, height:450,borderLeftColor: 'gray', borderLeftWidth: 1, borderLeftStyle: 'dashed'}} />
                <div style={{position:'absolute', zIndex:1, marginLeft: 600,  width:1, height:450,borderLeftColor: 'gray', borderLeftWidth: 1, borderLeftStyle: 'dashed'}} />
                <div style={{position:'absolute', zIndex:1, marginLeft: 700,  width:1, height:450,borderLeftColor: 'gray', borderLeftWidth: 1, borderLeftStyle: 'dashed'}} />

                <div style={{position:'absolute', zIndex:2, marginTop: 90,  height:1, width:800, borderTopColor: 'gray', borderTopWidth: 1, borderTopStyle: 'dashed'}} />
                <div style={{position:'absolute', zIndex:2, marginTop: 180, height:1, width:800, borderTopColor: 'gray', borderTopWidth: 1, borderTopStyle: 'dashed'}} />
                <div style={{position:'absolute', zIndex:2, marginTop: 270, height:1, width:800, borderTopColor: 'gray', borderTopWidth: 1, borderTopStyle: 'dashed'}} />
                <div style={{position:'absolute', zIndex:2, marginTop: 360, height:1, width:800, borderTopColor: 'gray', borderTopWidth: 1, borderTopStyle: 'dashed'}} />
            </div>
        )
    }
}
