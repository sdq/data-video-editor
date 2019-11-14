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
            dynamicAssistLines:"",
            showTextEditor: false, 
            showChartPreview: false, 
            showGifEditor:false,
            showVideoEditor:false,
            dbClickedElementIndex: -1,
        };
        this.handleStageDblClick = this.handleStageDblClick.bind(this);
        this.lastscene = props.sceneIndex; //进入界面的第一个scene编号
    }

    displayAssistLines(active) {
        this.setState({
            showAssistLines: active
        })
    }

    setDynamicAssistLines = value => {
        this.setState({
            dynamicAssistLines: value
        })
    }

    displayTextEditor(active) {
        this.setState({
            showTextEditor: active
        })
    }

    handleStageMouseDown = e => {
         
        //每当切换元素时，清空公用dragpos,transinfo
        this.props.dragElement('');
        this.props.transformElement('');


        // remove animation
        this.setState({
            showTextEditor: false,
            showAnimationLayer: false,
            showChartPreview: false,
            dbClickedElementIndex: -1,
            showGifEditor:false,
            showVideoEditor:false,
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
            } else if (dbElement.type() === ElementType.VIDEO) {
                this.setState({
                    showVideoEditor: true,
                })
            } else if (dbElement.type() === ElementType.CHART) {
                this.setState({
                    showChartPreview: true,
                })
            } 
        }
    }

    render() {
        const { isPerforming } = this.props;
        let editable = !isPerforming;  
        let { dbClickedElementIndex, showTextEditor, showChartPreview, showGifEditor, showVideoEditor, showAssistLines } = this.state;
        if (this.props.sceneIndex!==this.lastscene)
        {
            //切换屏幕时，保证交互层不显示，双击元素置空
            dbClickedElementIndex = -1;
            this.lastscene = this.props.sceneIndex;
            showTextEditor = false;
            showChartPreview = false;
            showGifEditor = false;
            showVideoEditor = false;
            showAssistLines = false;
        }



        const editableLayer = <EditableLayer 
                displayAssistLines={(active) => this.displayAssistLines(active)}
                dbClickedElementIndex={dbClickedElementIndex}
                dynamicAssistLines = {this.state.dynamicAssistLines}///////////
                setDynamicAssistLines = {this.setDynamicAssistLines}/////////////
                {...this.props}
            />;
        const backgroundLayer = <BackgroundLayer 
                {...this.props}
            />
        const animationLayer = <AnimationLayer
                dbClickedElementIndex={dbClickedElementIndex}
                {...this.props}
            />
        return (
            <div id="canvasContainer">
                {editable?
                <InteractionArea 
                    showTextEditor={showTextEditor}
                    showChartPreview={showChartPreview}
                    showGifEditor={showGifEditor}
                    showVideoEditor={showVideoEditor}
                    showAssistLines={showAssistLines} 
                    dynamicAssistLines = {this.state.dynamicAssistLines}///
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

