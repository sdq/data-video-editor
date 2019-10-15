import React, { Component } from 'react';
import { Stage } from 'react-konva';
import InteractionArea from './InteractionArea';
import EditableLayer from './EditableLayer';
import BackgroundLayer from './BackgroundLayer';
import AnimationLayer from './AnimationLayer';
import ElementType from '@/constants/ElementType';
import './scenecanvas.css';

export default class EditCanvas extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showAssistLines: false,
            showTextEditor: false, 
            showChartPreview: false, 
            showGifEditor:false,
            dbClickedElementIndex: -1,
        };
        this.handleStageDblClick = this.handleStageDblClick.bind(this);
    }

    displayAssistLines(active) {
        this.setState({
            showAssistLines: active
        })
    }

    displayTextEditor(active) {
        this.setState({
            showTextEditor: active
        })
    }

    handleStageMouseDown = e => {
        // remove animation
        this.setState({
            showTextEditor: false,
            showAnimationLayer: false,
            showChartPreview: false,
            dbClickedElementIndex: -1,
            showGifEditor:false,
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
        if (name) {
            var eleIndex = Number(name.split('-')[1]);
            this.props.selectElement(eleIndex, name);
        } else {
            this.props.unselectElement();
        }

        if (e.evt.button === 2) {
            // TODO: right click
            console.log('right click:'+name);
        }
    };

    handleStageDblClick(e) {
        // console.log('dbclick');
        // this.props.unselectElement();
        const name = e.target.name();

        if (name) {
            var eleIndex = Number(name.split('-')[1]);
            let dbElement = this.props.currentElements[eleIndex];
            this.setState({
                dbClickedElementIndex: eleIndex,
            });
            if (dbElement.type() === ElementType.TEXT) {
                this.setState({
                    showTextEditor: true,
                })
            } else if(dbElement.type() === ElementType.GIF){
                this.setState({
                    showGifEditor: true,
                })
            } else if(dbElement.type() === ElementType.CHART){
                this.setState({
                    showChartPreview: true,
                })
            } 
        }
    }

    render() {
        const { isPerforming } = this.props;
        const editable = !isPerforming;
        const editableLayer = <EditableLayer 
                displayAssistLines={(active) => this.displayAssistLines(active)}
                dbClickedElementIndex={this.state.dbClickedElementIndex}
                {...this.props}
            />;
        const backgroundLayer = <BackgroundLayer 
                {...this.props}
            />
        const animationLayer = <AnimationLayer
                dbClickedElementIndex={this.state.dbClickedElementIndex}
                {...this.props}
            />
        return (
            <div id="canvasContainer">
                {editable?
                <InteractionArea 
                    showTextEditor={this.state.showTextEditor}
                    showChartPreview={this.state.showChartPreview}
                    showGifEditor={this.state.showGifEditor}
                    showAssistLines={this.state.showAssistLines} 
                    {...this.props}
                />: 
                null}
                <Stage 
                    ref={ref => { this.stageRef = ref; }}
                    width={800} height={450} 
                    onMouseDown={editable?this.handleStageMouseDown:null}
                    onDblClick={editable?this.handleStageDblClick:null}
                >
                    {isPerforming?null:backgroundLayer}
                    {isPerforming?null:editableLayer}
                    {isPerforming?animationLayer:null}
                </Stage>
            </div>
        )
    }
}
