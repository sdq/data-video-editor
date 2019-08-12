import React, { Component } from 'react';
import { Transformer } from 'react-konva';
import Color from '../../constants/Color';

export default class TransformerComponent extends Component {

    componentDidMount() {
        this.checkNode();
    }
    componentDidUpdate() {
        this.checkNode();
    }

    checkNode() {
        // here we need to manually attach or detach Transformer node
        const stage = this.transformer.getStage();
        const { selectedElementName } = this.props;
    
        var selectedNode = stage.findOne("." + selectedElementName);
        // do nothing if selected node is already attached
        if (selectedNode === this.transformer.node()) {
            return;
        }
        if (selectedNode) {
            const type = selectedNode.getType();
            if (type !== "Group") {
                selectedNode = selectedNode.findAncestor("Group");
            }
            // attach to another node
            this.transformer.attachTo(selectedNode);
        } else {
            // remove transformer
            this.transformer.detach();
        }
    
        this.transformer.getLayer().batchDraw();
    }

    render() {
        return (
            <Transformer
                ref={node => {
                    this.transformer = node;
                }}
                borderStroke={Color.DEEP_ORANGE}
                anchorStroke={Color.DEEP_ORANGE}
                anchorFill={Color.LIGHT_ORANGE}
            />
        )
    }
}
