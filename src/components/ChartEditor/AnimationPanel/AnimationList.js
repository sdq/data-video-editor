import React, { Component } from 'react';
import { List, Divider } from 'antd';
import AnimationCard from './AnimationCard';
import { getAnimations } from '@/charts/Info';

export default class AnimationList extends Component {
    render() {
        const {currentElement} = this.props;
        const chartInfo = currentElement.info();
        const animations = getAnimations(chartInfo.category, chartInfo.type);
        // if (animations.length === 0) {
        //     return (
        //         <div className={'animation-list-container'}>
        //             <Divider>No Supported Animations</Divider>
        //         </div>
        //     )
        // }
        let taskAnimations = []
        for (const task in animations) {
            taskAnimations.push(
                <div key={task}>
                    <h4 style={{marginLeft: 12}}>{task}</h4>
                    <List
                        grid={{ gutter: 6, column: 4 }}
                        dataSource={animations[task]}
                        renderItem={animation => (
                        <List.Item>
                            <AnimationCard animation={animation} {...this.props}/>
                        </List.Item>
                        )}
                    />
                </div>
            )
        }
        return (
            <div>
                <Divider>Tasks</Divider>
                <div className={'animation-list-container'}>
                    {taskAnimations}
                </div>
            </div>
        )
    }
}
