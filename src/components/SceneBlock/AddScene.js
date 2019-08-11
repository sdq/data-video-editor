import React, { Component } from 'react';
import { Icon } from 'antd';
import './addscene.css';

export default class AddScene extends Component {
    constructor(props) {
        super(props);
        this.clickAddScene = this.clickAddScene.bind(this);
    }

    clickAddScene() {
        this.props.clickAddScene();
    }

    render() {
        return (
            <div id="addscene" onClick={this.clickAddScene}>
                <Icon type="plus" style={{fontSize: 80}}/>
            </div>
        )
    }
}
