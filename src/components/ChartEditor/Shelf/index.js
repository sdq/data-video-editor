import React, { Component } from 'react';
import { Row, Col, Button } from 'antd';
import { DropTarget } from 'react-dnd';
import DNDType from '@/constants/DNDType';
import Color from '@/constants/Color';
import './shelf.css';

const boxTarget = {
	drop: (props) => ({ 
        name: props.channel,
        isEncoded: props.slot.isEncoded,
    })
}

class Shelf extends Component {

    constructor(props) {
        super(props);
        this.removeEncoding = this.removeEncoding.bind(this);
    }

    removeEncoding() {
        //TODO: 
        //this.props.removeEncoding(this.props.channel, this.props.slot.name)
    }

    render() {
        const { canDrop, isOver, connectDropTarget } = this.props;
        const isActive = canDrop && isOver;
        const isAvailable = this.props.dropAvailable;
        let backgroundColor = this.props.slot.isEncoded ? '#FE9900' : '#fff';
        if (!isAvailable) {
            backgroundColor = 'darkgrey';
        }
		else if (isActive) {
			backgroundColor = Color.ORANGE;
		} 
		else if (canDrop) {
			backgroundColor = Color.LIGHT_ORANGE;
		}
        return connectDropTarget(
            <div>
                <Row className="shelf">
                    <Col span={4} className="channelName">{this.props.channel}</Col>
                    <Col span={ this.props.slot.isEncoded ? 14 : 18} className="channelSlot" style={{ backgroundColor: backgroundColor, color: this.props.slot.isEncoded ? "#ffffff" : "#37415C" }}>{this.props.slot.isEncoded ? this.props.slot.name : 'drop field here'}</Col>
                    <Col span={ this.props.slot.isEncoded ? 4 : 0} className="channelSlot" style={{ backgroundColor }}>
                        <Button shape="circle" type="link" size="small" icon="close" onClick={this.removeEncoding}/>
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