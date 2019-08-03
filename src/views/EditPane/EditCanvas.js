import React, { Component } from 'react';
import './editpane.css';

export default class EditCanvas extends Component {
    render() {
        return (
            <div>
                EditCanvas
                <div id="canvasContainer">
                    <canvas>this is canvas</canvas>
                </div>
            </div>
        )
    }
}
