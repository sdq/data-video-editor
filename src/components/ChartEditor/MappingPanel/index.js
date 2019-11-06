import React, { Component } from 'react';
import { Row, Col, Divider } from 'antd';
import FieldList from './FieldList';
import Encoding from './Encoding';
import './mappingpanel.css';

export default class MappingPanel extends Component {
    render() {
        return (
            <Row>
                <Col span={11} className="dataPanel">
                    {/* <h3 style={{color:"#000000"}}>Data</h3> */}
                    <Divider>Fields</Divider>
                    <FieldList  { ...this.props }/>
                </Col>
                <Col span={13} className="encodingPanel">
                    <Divider>Channels</Divider>
                    <Encoding { ...this.props }/>
                </Col>
            </Row>
        )
    }
}
