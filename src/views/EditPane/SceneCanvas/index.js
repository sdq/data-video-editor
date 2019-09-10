import React, { Component } from 'react';
import { Stage } from 'react-konva';
import InteractionArea from './InteractionArea';
import EditableLayer from './EditableLayer';
import BackgroundLayer from './BackgroundLayer';
import AnimationLayer from './AnimationLayer';
import './scenecanvas.css';

export default class EditCanvas extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showAssistLines: false,
            showAnimationLayer: false,
            dbClickedElementIndex: -1,
        };
        this.handleStageDblClick = this.handleStageDblClick.bind(this);
    }

    displayAssistLines(active) {
        this.setState({
            showAssistLines: active
        })
    }

    handleStageMouseDown = e => {
        // remove animation
        this.setState({
            showAnimationLayer: false,
            dbClickedElementIndex: -1,
        });

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
        this.props.unselectElement();
        const name = e.target.name();

        // console.log(name);
        if (name) {
            var eleIndex = Number(name.split('-')[1]);
            console.log(eleIndex);
            this.setState({
                showAnimationLayer: true,
                dbClickedElementIndex: eleIndex,
            });
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
                    onMouseDown={editable?this.handleStageMouseDown:null}
                    onDblClick={editable?this.handleStageDblClick:null}
                >
                    <BackgroundLayer 
                        {...this.props}
                    />
                    <EditableLayer 
                        displayAssistLines={(active) => this.displayAssistLines(active)} 
                        showAnimationLayer = {this.state.showAnimationLayer}
                        dbClickedElementIndex={this.state.dbClickedElementIndex}
                        {...this.props}
                    />
                    {
                        this.state.showAnimationLayer?
                        <AnimationLayer
                            dbClickedElementIndex={this.state.dbClickedElementIndex}
                            {...this.props}
                        />:null
                    }
                    {/* <AnimationLayer
                        {...this.props}
                    /> */}
                </Stage>
            </div>
        )
    }
}
