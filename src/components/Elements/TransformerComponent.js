import React, { Component } from 'react';
import { Transformer } from 'react-konva';
import { message } from 'antd';
import Color from '@/constants/Color';

export default class TransformerComponent extends Component {
    constructor(props) {
        super(props)
        this.currentWidth = 0;
    }
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
        // if (selectedNode === this.transformer.node()) {
        //     return;
        // } 屏蔽解决poosTool及时更新的问题
        if (selectedNode) {
            const type = selectedNode.getType();
            if (type !== "Group") {
                selectedNode = selectedNode.findAncestor("Group");
            }
           // console.log("selectedNode",selectedElementName,selectedNode)
            // attach to another node
            this.transformer.attachTo(selectedNode);
        } else {
            // remove transformer
            this.transformer.detach();
        }

        this.transformer.getLayer().batchDraw();
    }
    componentWillUpdate() {
        if (this.preWidth !== this.currentWidth && this.currentWidth === 50) {
            message.info("Width is limited!")
        }  
    }
    setMinimumWidth(oldBox, newBox) {
        this.preWidth = this.currentWidth;
        newBox.width = Math.max(50, newBox.width); //限制宽度
        this.currentWidth = newBox.width;//记录
        return newBox;
    }

    render() {
        const { selectedElementType, selectedElementShapeType } = this.props;  //判断text-element  line  arrow
        return (
            <Transformer
                ref={node => {
                    this.transformer = node;
                }}
                boundBoxFunc={(oldBox, newBox) => this.setMinimumWidth(oldBox, newBox)}
                // width={this.props.element.info().width}
                // height={this.props.element.info().height}
                borderStroke="#DCDCDC"
                anchorStroke="#DCDCDC"
                anchorFill={Color.LIGHT_ORANGE}
                enabledAnchors={(selectedElementType === "text_element" || selectedElementShapeType === "line" || selectedElementShapeType === "arrow") ? ['middle-right'] : ['top-left', 'top-right', 'bottom-left', 'bottom-right']}
            />
        )
    }
}
