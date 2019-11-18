import React, { Component } from 'react';
import { List, Divider, Button } from 'antd';
import AnimationStep from './AnimationStep';

export default class AnimationPlan extends Component {

    render() {
        const {displaySpec} = this.props;
        const animationSteps = displaySpec.animation;
        if (!animationSteps || animationSteps.length === 0) {
            return null;
        }
        return (
            <div>
                <Divider>Animation Plan</Divider>
                <div className={'animation-plan-container'}>
                    <List
                        size="small"
                        split = {false}
                        dataSource={animationSteps}
                        renderItem={(animation, index) => <List.Item>
                            <div style={{display: 'inline-block'}}>
                                <div style={{ float: 'left'}} onClick={() => this.props.selectAnimation(index, animation)}>
                                    <AnimationStep animation={animation} index={index} { ...this.props }/>
                                </div>
                                <div style={{ float: 'right', marginTop: 6}}>
                                    <Button shape="circle" type="link" size="small" icon="close" onClick={()=>this.props.removeChartAnimation(index)}/>
                                </div>
                            </div>
                        </List.Item>}
                    />
                </div>
            </div>
        )
    }
}
