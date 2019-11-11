import React, { Component } from 'react';
import { List, Divider } from 'antd';
import AnimationStep from './AnimationStep';

export default class AnimationPlan extends Component {
    render() {
        const {displaySpec} = this.props;
        const animationSteps = displaySpec.animation;
        if (!animationSteps || animationSteps.length === 0) {
            return null;
        }
        return (
            <div className={'animation-plan-container'}>
                <Divider>Animation Plan</Divider>
                <List
                    size="small"
                    split = {false}
                    dataSource={animationSteps}
                    renderItem={(animation, index) => <List.Item>
                        <AnimationStep animation={animation} index={index} { ...this.props }/>
                    </List.Item>}
                />
            </div>
        )
    }
}
