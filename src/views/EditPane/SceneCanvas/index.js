import React, { Component } from 'react';
import Konva from "konva";
import { Stage } from 'react-konva';
import InteractionArea from './InteractionArea';
import EditableLayer from './EditableLayer';
import BackgroundLayer from './BackgroundLayer';
import AnimationLayer from './AnimationLayer';
import './scenecanvas.css';
import { None } from 'vega';
import _ from 'lodash';

export default class EditCanvas extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showAssistLines: false,
        };
        this.elementNodes = new Array(props.currentElements.length).fill({});
        this.animations = new Array(props.currentElements.length).fill({});
    }

    componentDidMount() {
        
    }

    componentWillReceiveProps(props) {
        // this.animationStart()
    }

    componentWillUnmount() {
        // this.animationStop()
    }

    displayAssistLines(active) {
        this.setState({
            showAssistLines: active
        })
    }

    handleStageMouseDown = e => {
        // clicked on stage - clear selection
        if (e.target === e.target.getStage()) {
            this.props.unselectElement();
            return;
        }
        // clicked on transformer - do nothing
        const clickedOnTransformer =
            e.target.getParent().className === "Transformer";
        if (clickedOnTransformer) {
            return;
        }
    
        // find clicked rect by its name
        const name = e.target.name();
        // console.log(name);
        if (name) {
            var eleIndex = Number(name.split('-')[1]);
            this.props.selectElement(eleIndex, name);
        } else {
            this.props.unselectElement();
        }

        if (e.evt.button === 2) {
            // TODO: right click
            console.log(name);
        }
    };

    handleStageDblClick(e) {
        // console.log('dbclick');
        const name = e.target.name();

        // console.log(name);
        if (name) {
            // var eleIndex = Number(name.split('-')[1]);
            // TODO: show animation
        }
    }

    render() {
        const { isPerforming } = this.props;
        const editable = !isPerforming;
        return (
            <div id="canvasContainer">
                {editable?<InteractionArea showAssistLines={this.state.showAssistLines} {...this.props}/>: null}
                <Stage 
                    ref={ref => { this.stageRef = ref; }}
                    width={800} height={450} 
                    onMouseDown={editable?this.handleStageMouseDown:None}
                    onDblClick={editable?this.handleStageDblClick:None}
                >
                    <BackgroundLayer 
                        {...this.props}
                    />
                    <EditableLayer 
                        displayAssistLines={(active) => this.displayAssistLines(active)} 
                        {...this.props}
                    />
                    {/* <AnimationLayer
                        {...this.props}
                    /> */}
                </Stage>
            </div>
        )
    }
}
