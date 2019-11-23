import React, { Component } from 'react';
import { List, Divider, Row, Col } from 'antd';
import AnimationCard from './AnimationCard';
import { getAnimations } from '@/charts/Info';

export default class AnimationList extends Component {
    render() {
        const {currentElement} = this.props;
        const chartInfo = currentElement.info();
        const animations = getAnimations(chartInfo.category, chartInfo.type);
        let taskAnimations = []
        for (const task in animations) {
            taskAnimations.push(
                <Row key={task} style={{ height: 50 }}> 
                    <Col span={7}><h4 style={{marginLeft: 12}}>{task}</h4></Col>
                    <Col span={17}>
                        <List
                            grid={{ gutter: 2, column: 4 }}
                            dataSource={animations[task]}
                            renderItem={animation => (
                            <List.Item>
                                <AnimationCard animation={animation} {...this.props}/>
                            </List.Item>
                            )}
                        />
                    </Col>
                </Row>
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
