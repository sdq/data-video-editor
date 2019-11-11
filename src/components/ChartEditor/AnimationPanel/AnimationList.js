import React, { Component } from 'react';
import { List, Divider } from 'antd';
import AnimationCard from './AnimationCard';
import { getAnimations } from '@/charts/Info';

export default class AnimationList extends Component {
    render() {
        const {currentElement} = this.props;
        const chartInfo = currentElement.info();
        const animations = getAnimations(chartInfo.category, chartInfo.type);
        if (animations.length === 0) {
            return (
                <div className={'animation-list-container'}>
                    <Divider>No Supported Animations</Divider>
                </div>
            )
        }
        return (
            <div className={'animation-list-container'}>
                
                <Divider>Supported Animations</Divider>
                <List
                    grid={{ gutter: 6, column: 3 }}
                    dataSource={animations}
                    renderItem={animation => (
                    <List.Item>
                        <AnimationCard animation={animation} {...this.props}/>
                    </List.Item>
                    )}
                />
            </div>
        )
    }
}
