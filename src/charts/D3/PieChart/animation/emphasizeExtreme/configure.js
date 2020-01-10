import React, { Component } from 'react';
import { Row, Col, Radio} from 'antd';

export default class configure extends Component {

    handleCategoriesChange = (value) => {
        const {index, animation} = this.props;
        animation.spec.categories = value;
        animation.description = "Emphasize the " + animation.spec.extreme + " in the " + animation.spec.category + " category";
        this.props.modifyChartAnimation(index, animation);
    }

    handleExtremeChange = e => {
        const {index, animation} = this.props;
        animation.spec.extreme = e.target.value;
        animation.description = "Emphasize the " + animation.spec.extreme + " value " ;
        this.props.modifyChartAnimation(index, animation);
    }

    handleEffectChange = e => {
        const {index, animation} = this.props;
        animation.spec.effect = e.target.value;
        this.props.modifyChartAnimation(index, animation);
    }

    handleDurationChange = e => {
        const {index, animation} = this.props;
        animation.duration = e.target.value;
        this.props.modifyChartAnimation(index, animation);
    }

    render() {
        const {animation} = this.props;
        // let selectedSeries = animation.spec.series?animation.spec.series:""; // for all series
        //let selectedCategories = animation.spec.categories?animation.spec.categories:categories[0];
        return (
            <div>
                <Row style={{ height: 50 }}> 
                    <Col span={6}><h3 style={{ marginTop: 6 }}>Extreme:</h3></Col>
                    <Col span={18}>
                        <Radio.Group value={animation.spec.extreme} onChange={this.handleExtremeChange}>
                            <Radio.Button value="max">Max</Radio.Button>
                            <Radio.Button value="min">Min</Radio.Button>
                        </Radio.Group>
                    </Col>
                </Row>
                <Row style={{ height: 50 }}> 
                    <Col span={6}><h3 style={{ marginTop: 6 }}>Effect:</h3></Col>
                    <Col span={18}>
                        <Radio.Group value={animation.spec.effect} onChange={this.handleEffectChange}>
                            <Radio.Button value="filter">Filter</Radio.Button>
                            <Radio.Button value="flicker">Flicker</Radio.Button>
                            <Radio.Button value="popup">Pop up</Radio.Button>
                        </Radio.Group>
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
