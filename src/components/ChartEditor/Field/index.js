import React, { Component } from 'react';
import './field.css';

export default class Field extends Component {
    render() {
        return (
            <div className="field">
				<div style={{display: "inline-block"}}>{this.props.field.name}</div>
            </div>
        )
    }
}
