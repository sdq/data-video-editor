import React, { Component } from 'react'

export default class Needle extends Component {
    render() {
        return (
            <div>
                <div style={{width: 12, height: 18}}/>
                <div style={{width: 12, height: 10,backgroundColor: 'red'}}/>
                <div id='triangle-down'/>
                <div style={{width: 2, height: 216,backgroundColor: 'red', marginLeft: 5}}/>
            </div>
        )
    }
}
