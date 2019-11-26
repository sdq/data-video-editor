import React, { Component } from 'react';
// import { Collapse } from 'antd';
import { AnimationList } from '@/animation';
import AnimationCard from '@/components/AnimationCard';


export default class AnimationTool extends Component {


    render() {
        return (
            <div style={{padding: '0px 10px 10px 10px', fontSize: '14px', backgroundColor: 'white',height:this.props.contentHeight-140+'px',overflow: 'auto'}}>
                <div style={{ width: 300, backgroundColor: '#d8d8d8'}}/>
                <div>
                    {AnimationList.all.map((animation, index) =>
                        <AnimationCard key={index} animation={animation} {...this.props}/>
                    )}
                </div>
                {/* <Collapse defaultActiveKey={['Presentation']} bordered={false} accordion>
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
                </Collapse> */}
            </div>
        )
    }
}
