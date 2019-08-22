import React, { Component } from 'react';
import { Collapse, Input, List } from 'antd';

const { Panel } = Collapse;
const { Search } = Input;

const animations = {
    "Presentation": ["Appear", "Fly in", "Fade in", "Zoom", "Fly out", "Disappear", "Fade out", "Shrink"],
    "Interpretation" : ["Flicker", "Zoom in"],
    "Reasoning" : ["Emphasis", "Annotation", "Relocation"],
}

export default class AnimationTool extends Component {

    constructor(props) {
        super(props);
        this.searchAnimation = this.searchAnimation.bind(this);
    }

    searchAnimation(value) {
        console.log(value)
    }

    render() {
        return (
            <div>
                <Search
                    placeholder="input search text"
                    onSearch={this.searchAnimation}
                    style={{ width: 284, margin: 8 }}
                />
                <div style={{height:1, width: 300, backgroundColor: '#d8d8d8'}}/>
                <Collapse defaultActiveKey={['Presentation']} bordered={false} accordion>
                    <Panel header="Presentation" key="Presentation">
                        <div style={{height: 300}}>
                            {animations['Presentation'].map((animation, index) =>
                                <div key={index}>{animation}</div>
                            )}
                        </div>
                    </Panel>
                    <Panel header="Interpretation" key="Interpretation">
                        <div style={{height: 300}}>
                            {animations['Interpretation'].map((animation, index) =>
                                <div key={index}>{animation}</div>
                            )}
                        </div>
                    </Panel>
                    <Panel header="Reasoning" key="Reasoning">
                        <div style={{height: 300}}>
                            {animations['Reasoning'].map((animation, index) =>
                                <div key={index}>{animation}</div>
                            )}
                        </div>
                    </Panel>
                </Collapse>
            </div>
        )
    }
}
