import React, { Component } from 'react';
import { Stage } from 'react-konva';
import InteractionArea from './InteractionArea';
import EditableLayer from './EditableLayer';
import BackgroundLayer from './BackgroundLayer';
import AnimationLayer from './AnimationLayer';
import PathLayer from './PathLayer';
import ElementType from '@/constants/ElementType';
import './scenecanvas.css';

export default class EditCanvas extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dynamicAssistLines:"",
            showTextEditor: false, 
            showChartPreview: false, 
            showGifEditor:false,
            showVideoEditor:false,
            showPath:false,
            dbClickedElementIndex: -1,
            isElementWithPath:false,
            windowWidth:window.innerWidth,//init
            stageSize: {
                width: 450,
                height: 500
            }
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
        this.props.cleanInterationLayer(true);
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
            this.props.displayPathLayer(false);
            this.props.unselectElement();
            return;
            
        }
        // clicked on transformer - do nothing
        if(e.target.getParent()){ //path with no parennt
            const clickedOnTransformer =
            e.target.getParent().className === "Transformer";

            if (clickedOnTransformer) {
                return;
            }
        }
        

    
        // find clicked rect by its name
        const name = e.target.name();

        if (name) {
            //选中一个元素
            var eleIndex = Number(name.split('-')[1]);
            this.props.selectElement(eleIndex, name);
            //判断选中的元素是否被赋予了path动画
            const aniLength = this.props.currentElement?this.props.currentElement.animations().length:0;
            const aniArray = this.props.currentElement?this.props.currentElement.animations():0;
            if(aniLength===0)
            {
                this.props.displayPathLayer(false);
            }else{
            for(let i=0;i<aniLength;i++){
                if(aniArray[i].type().indexOf("INTERPRETATION_PATH")!==-1){
                    this.props.displayPathLayer(true);
                    break;
                }
                this.props.displayPathLayer(false);
            }
        }

        } else {
            if(e.target.attrs.id&&e.target.attrs.id.indexOf("path")!==-1){
                //判断选中的是否为path元素（认path没有name属性）
                    this.props.displayPathLayer(true);
                    return;
            }else{
            this.props.unselectElement();
                }
        }

        if (e.evt.button === 2) {
            // TODO: right click
            //console.log('right click:'+name);
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
            this.props.cleanInterationLayer(false);
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


    componentDidMount() {
        this.checkSize();
        window.addEventListener('resize', this.handleResize.bind(this)) //监听窗口大小改变
    }

    componentWillReceiveProps(nextProps) {
        //console.log("componentWillReceiveProps", nextProps.showToolPane, this.props.showToolPane)
        if (nextProps.showToolPane !== this.props.showToolPane) {
            //showToolPane 300px
            if (nextProps.showToolPane) {
                this.setState({
                    stageSize: {
                        width: this.state.stageSize.width - 300, //展开
                        height: this.state.stageSize.height
                    }
                })
            } else {
                this.setState({
                    stageSize: {
                        width: this.state.stageSize.width + 300,//折叠
                        height: this.state.stageSize.height
                    }
                })
            }
        }
        if (nextProps.showResourcePane !== this.props.showResourcePane) {
            //showResourcePane 360px
            if (nextProps.showResourcePane) {
                this.setState({
                    stageSize: {
                        width: this.state.stageSize.width - 360, //展开
                        height: this.state.stageSize.height
                    }
                })
            } else {
                this.setState({
                    stageSize: {
                        width: this.state.stageSize.width + 360,//折叠
                        height: this.state.stageSize.height
                    }
                })
            }
        }

    }
    componentWillUnmount() { //移除监听器，以防多个组件之间导致this的指向紊乱 
        window.removeEventListener('resize', this.handleResize.bind(this))
      }

    handleResize = e => {
        this.setState({
            windowWidth: window.innerWidth,
        })
        //获取stage父节点div的宽高，赋值
        this.checkSize()
    }

    checkSize = () => {
        const width = this.container.offsetWidth;
        const height = this.container.offsetHeight;
        this.setState({
            stageSize: {
                width,
                height
            }
        });
    };

    render() {
        //isPerforming判断是否在播放，showPathLayer用于anicard拖拽管理，isElementSelected判断是否有元素被选中,判断选中的元素是否含有path动画
        const { isPerforming,showPathLayer, isCleanInterationLayer} = this.props; 
        //const canvasW = 800*(this.props.contentHeight-100)/450;
        //const canvasH = this.props.contentHeight-100;
        //const { showResourcePane, showToolPane} = this.props;
        
        let editable = !isPerforming;  
        //let { dbClickedElementIndex, showTextEditor, showChartPreview, showGifEditor, showVideoEditor, showAssistLines,windowWidth,stageSize } = this.state;
        let { dbClickedElementIndex, showTextEditor, showChartPreview, showGifEditor, showVideoEditor, showAssistLines,stageSize } = this.state;
        if (this.props.sceneIndex!==this.lastscene || isCleanInterationLayer)
        {
            //切换屏幕时，保证交互层不显示，双击元素置空
            dbClickedElementIndex = -1;
            this.lastscene = this.props.sceneIndex;
            showTextEditor = false;
            showChartPreview = false;
            showGifEditor = false;
            showVideoEditor = false;
            showAssistLines = false;
            this.props.displayPathLayer(false);
        }
        const editableLayer = <EditableLayer 
                displayAssistLines={(active) => this.displayAssistLines(active)}
                dbClickedElementIndex={dbClickedElementIndex}
                dynamicAssistLines = {this.state.dynamicAssistLines}
                setDynamicAssistLines = {this.setDynamicAssistLines}
                {...this.props}
            />;
        const backgroundLayer = <BackgroundLayer  layerSize={stageSize}
                {...this.props}
            />
        const animationLayer = <AnimationLayer layerSize={stageSize}
                dbClickedElementIndex={dbClickedElementIndex}
                {...this.props}
            />
        const pathLayer = <PathLayer
                {...this.props}
           />
        //console.log("stageSize...", stageSize.width, stageSize.height)
        return (
            <div id="canvasContainer" 
                 style={{ 
                 width:'100%',
                 height:'100%', 
                 //height: canvasH+'px',
                 //缩放策略 全局统一缩放
                //  marginLeft:
                //  showResourcePane&&showToolPane?(windowWidth-660-canvasW)/2+'px'
                //  :!showResourcePane&&showToolPane?(windowWidth-300-canvasW)/2+'px'
                //  :showResourcePane&&!showToolPane?(windowWidth-360-canvasW)/2+'px'
                //  :(windowWidth-canvasW)/2+'px'
                 
                }
            } 
                 >
                {editable ?
                <InteractionArea 
                    showTextEditor={showTextEditor}
                    showChartPreview={showChartPreview}
                    showGifEditor={showGifEditor}
                    showVideoEditor={showVideoEditor}
                    showAssistLines={showAssistLines} 
                    dynamicAssistLines = {this.state.dynamicAssistLines}
                    dbClickedElementIndex={dbClickedElementIndex}
                    {...this.props}
                />: 
                null}
                <div style={{width:'100%',height:'100%'}}
                ref={node => { this.container = node; }}> 
                <Stage 
                    ref={ref => { this.stageRef = ref; }}
                    //控制画布缩放，限定大于800*450时
                    // width={canvasW>800?canvasW:800} height={canvasH>450?canvasH:450} 
                    // scale={{x: canvasW>800?canvasH/450:1, y:canvasH>450?canvasH/450:1}}
                    // width={canvasW} height={canvasH} 
                    // scale={{x:canvasH/450, y:canvasH/450}}
                    width={stageSize.width}
                    height={stageSize.height}
                    onMouseDown={editable?this.handleStageMouseDown:null}
                    onDblClick={editable?this.handleStageDblClick:null}
                >
                    {isPerforming?null:backgroundLayer}
                    {isPerforming?null:editableLayer}
                    {!isPerforming&&showPathLayer&&this.props.isElementSelected?pathLayer:null}
                    {isPerforming?animationLayer:null}
                </Stage>
                </div>
               </div>
        )
    }
}

