import React, { Component } from 'react';
import { Divider, Row, Col ,Tag,Tooltip} from 'antd';
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
                <Row key={task} style={{ height: 35 }}> 
                    <Col span={8}><h4 style={{marginLeft: 12}}>{task}</h4></Col>
                    <Col span={16}>
                     {animations[task].map((animation, index) => {
                     const isLongTag = animation.title.length > 20;
                        const tagElem = (
                         <Tag key={animation.title} style={{border:"none",marginLeft:"0px",marginRight:"0px",marginBottom:"6px"}}>
                        <AnimationCard animation={animation} {...this.props}/>
                         </Tag>
                    );
                 return isLongTag ? (
                     <Tooltip title={animation.title} key={animation.title}>
                     </Tooltip>
                     ) : (
                      tagElem
                     );
                     })}      
                    </Col>
                </Row>
            )
        }
        return (
            <div>
                <Divider>Tasks</Divider>
                <div className={'animation-list-container'} >
                    {taskAnimations}
                </div>
            </div>
        )
    }
}
