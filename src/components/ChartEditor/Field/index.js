import React, { Component } from 'react';
import './field.css';
import { DragSource } from 'react-dnd';
import DNDType from '@/constants/DNDType';

const boxSource = {

	beginDrag(props) {
		return {
			field: props.field,
		}
	},
	endDrag(props, monitor) {
		const item = monitor.getItem();
		const dropResult = monitor.getDropResult();

		if (dropResult) {
            console.log(`You dropped ${item.field.name} into ${dropResult.name}!`);
            //TODO: encoding
			//props.encoding(dropResult.name, item.field, dropResult.isEncoded);
		}
	},
}

class Field extends Component {
    render() {
        const { connectDragSource } = this.props;
        return connectDragSource(
            <div className="field">
				<div style={{display: "inline-block"}}>{this.props.field.name}</div>
            </div>
        )
    }
}

export default DragSource(
    DNDType.DND_MAPPING,
    boxSource,
	(connect, monitor) => ({
		connectDragSource: connect.dragSource(),
		isDragging: monitor.isDragging()
	}),
)(Field)
