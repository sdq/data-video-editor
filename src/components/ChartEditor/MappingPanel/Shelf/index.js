import React, { Component } from 'react';
import { Row, Col, Button } from 'antd';
import { DropTarget } from 'react-dnd';
import DNDType from '@/constants/DNDType';
import Color from '@/constants/Color';
import './shelf.css';

const boxTarget = {
	drop: (props) => ({ 
        name: props.channel.name,
        isEncoded: props.channel.isEncoded,
    })
}

class Shelf extends Component {

    constructor(props) {
        super(props);
        this.removeEncoding = this.removeEncoding.bind(this);
    }

    removeEncoding() {
        this.props.removeEncoding(this.props.channel.name, this.props.channel.field)
    }

    render() {
        const { canDrop, isOver, connectDropTarget } = this.props;
        const isActive = canDrop && isOver;
        const isAvailable = this.props.dropAvailable;
        let backgroundColor = this.props.channel.isEncoded ? Color.DEEP_ORANGE : '#fff';
        if (!isAvailable) {
            backgroundColor = 'darkgrey';
        }
		else if (isActive) {
			backgroundColor = Color.DEEP_ORANGE;
		} 
		else if (canDrop) {
			backgroundColor = Color.ORANGE;
		}
        return connectDropTarget(
            <div>
                <Row className="shelf">
                    <Col span={4} className="channelName">{this.props.channel.name}</Col>
                    <Col span={ this.props.channel.isEncoded ? 14 : 18} className="channelSlot" 
                    style={{ backgroundColor: backgroundColor, color: this.props.channel.isEncoded ? "#ffffff" : "#37415C"}}>
                        {this.props.channel.isEncoded ? this.props.channel.field : 'drop field here'}</Col>
                    <Col span={ this.props.channel.isEncoded ? 4 : 0} className="channelSlot" style={{ backgroundColor }}>
                        <Button shape="circle" type="link" ghost size="small" icon="close" onClick={this.removeEncoding}/>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default DropTarget(
	DNDType.DND_MAPPING,
	boxTarget,
	(connect, monitor) => ({
		connectDropTarget: connect.dropTarget(),
		isOver: monitor.isOver(),
		canDrop: monitor.canDrop()
	})
)(Shelf);