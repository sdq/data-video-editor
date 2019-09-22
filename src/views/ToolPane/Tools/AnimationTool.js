import React, { Component } from 'react';
import { Collapse, Input } from 'antd';
import { AnimationList } from '@/animation';
import AnimationCard from '@/components/AnimationCard';

const { Panel } = Collapse;
const { Search } = Input;

const paneHeight = 290;

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
                        <div style={{height: paneHeight}}>
                            {AnimationList.presentation.map((animation, index) =>
                                <AnimationCard key={index} animation={animation} {...this.props}/>
                            )}
                        </div>
                    </Panel>
                    <Panel header="Interpretation" key="Interpretation">
                        <div style={{height: paneHeight}}>
                            {AnimationList.interpretation.map((animation, index) =>
                                <AnimationCard key={index} animation={animation} {...this.props}/>
                            )}
                        </div>
                    </Panel>
                    <Panel header="Reasoning" key="Reasoning">
                        <div style={{height: paneHeight}}>
                            {AnimationList.reasoning.map((animation, index) =>
                                <AnimationCard key={index} animation={animation} {...this.props}/>
                            )}
                        </div>
                    </Panel>
                </Collapse>
            </div>
        )
    }
}
