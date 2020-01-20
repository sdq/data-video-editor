import React, { Component } from 'react';
import { Row, Col, Radio} from 'antd';

export default class configure extends Component {

    handleExtreme1Change = e => {
        const {index, animation} = this.props;
        animation.spec.extreme1 = e.target.value;    
        if(animation.spec.extreme1 === 'max'){
            animation.spec.extreme2 = 'min';
        }else {
            animation.spec.extreme2 = 'max';
        } 
        this.props.modifyChartAnimation(index, animation);
        animation.description = "Compare the extreme values between " + animation.spec.extreme1 + " and " + animation.spec.extreme2;
    }

    handleExtreme2Change = e => {
        const {index, animation} = this.props;
        animation.spec.extreme2 = e.target.value;
        if(animation.spec.extreme2 === 'max'){
            animation.spec.extreme1 = 'min';
        }else {
            animation.spec.extreme1 = 'max';
        } 
        this.props.modifyChartAnimation(index, animation);
        animation.description = "Compare the extreme values between " + animation.spec.extreme1 + " and " + animation.spec.extreme2;
    }

    handleClick = () => {
        const {index, animation} = this.props;
        this.setState({liked: !this.state.liked});
        animation.spec.effect = this.state.liked ? 'juxtaposition' : 'no-juxtaposition';
        this.props.modifyChartAnimation(index, animation);
    }


    handleDurationChange = e => {
        const {index, animation} = this.props;
        animation.duration = e.target.value;
        this.props.modifyChartAnimation(index, animation);
    }

    render() {
        const {animation} = this.props;
        return (
            <div>
                <Row style={{ height: 50 }}> 
                    <Col span={6}><h3 style={{ marginTop: 6 }}>Extreme 1:</h3></Col>
                    <Col span={18}>
                        <Radio.Group value={animation.spec.extreme1} onChange={this.handleExtreme1Change}>
                            <Radio.Button value="max">Max</Radio.Button>
                            <Radio.Button value="min">Min</Radio.Button>
                        </Radio.Group>
                    </Col>
                </Row>
                <Row style={{ height: 50 }}> 
                    <Col span={6}><h3 style={{ marginTop: 6 }}>Extreme 2:</h3></Col>
                    <Col span={18}>
                        <Radio.Group value={animation.spec.extreme2} onChange={this.handleExtreme2Change}>
                            <Radio.Button value="max">Max</Radio.Button>
                            <Radio.Button value="min">Min</Radio.Button>
                        </Radio.Group>
                    </Col>
                </Row>
                <Row style={{ height: 50 }}> 
                    <Col span={6}><h3 style={{ marginTop: 6 }}>Effect:</h3></Col>
                    <Col span={18}>
                    {/* <Button size={'small'} style={{ marginTop: 8 }} onClick={() => this.props.selectChartElement(true, {type: 'category', key: 'category'})}>Juxtaposition</Button> */}
                        <Radio.Group value={animation.spec.effect} onChange={this.handleEffectChange}>
                            <Radio.Button value="juxtaposition">Juxtaposition</Radio.Button>
                        </Radio.Group>
                        {/* <Button size={'small'} style={{ marginTop: 8 }} onClick={this.handleClick}>Juxtaposition</Button> */}
                    </Col>
                </Row>
                <Row style={{ height: 50 }}> 
                    <Col span={6}><h3 style={{ marginTop: 6 }}>Duration:</h3></Col>
                    <Col span={18}>
                        <Radio.Group value={animation.duration} onChange={this.handleDurationChange}>
                            <Radio.Button value={500}>Short</Radio.Button>
                            <Radio.Button value={1000}>Medium</Radio.Button>
                            <Radio.Button value={2000}>Long</Radio.Button>
                        </Radio.Group>
                    </Col>
                </Row>
            </div>
        )
    }
}
