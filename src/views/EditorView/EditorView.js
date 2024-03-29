import React, { Component } from 'react';
import { Layout } from 'antd';
import HeaderBar from '../HeaderBar';
import EditPane from '../EditPane';
import ResourcePane from '../ResourcePane';
import ToolPane from '../ToolPane';
import StorylinePane from '../StorylinePane';
import TrackPane from '../TrackPane';
// import ActionTracker from '../ActionTracker';
import HTML5Backend from 'react-dnd-html5-backend'
import { DndProvider } from 'react-dnd'
import UIMode from '@/constants/UIMode';
import './editview.css';

const { Sider, Content } = Layout;



export default class EditorView extends Component {
        state = {
            windowWidth:window.innerWidth,
            windowHeight:window.innerHeight,
            contentHeight:window.innerHeight-370,
            contentWidth:window.innerWidth-660,
            scrollLeft:0,
        };


    componentWillMount() {  //初始化获取窗口大小   
        this.setState({
            windowWidth:window.innerWidth,
            windowHeight:window.innerHeight,
            contentHeight:window.innerHeight-370,
            contentWidth:window.innerWidth-660,
            // windowWidth:window.innerWidth>1300?window.innerWidth:1300,
            // windowHeight:window.innerHeight>820?window.innerHeight:820,
            // contentHeight:window.innerHeight>820?window.innerHeight-370:450,
            // contentWidth:window.innerWidth>1300?window.innerWidth-660:800,
        })
      }

    componentDidMount() {
        window.addEventListener('resize', this.handleResize.bind(this)); //监听窗口大小改变
        window.addEventListener('scroll', this.bindHandleScroll);
      }
    
    componentWillUnmount() { //移除监听器，以防多个组件之间导致this的指向紊乱 
        window.removeEventListener('resize', this.handleResize.bind(this));
        window.removeEventListener('scroll', this.bindHandleScroll);
      }

    handleResize = e => {
        const {showResourcePane, showToolPane} = this.props;
        this.setState({
            windowWidth:window.innerWidth,
            windowHeight:window.innerHeight,
            contentHeight:window.innerHeight-370,
            contentWidth:
            showResourcePane&&showToolPane?window.innerWidth-660
            :!showResourcePane&&showToolPane?window.innerWidth-300
            :showResourcePane&&!showToolPane?window.innerWidth-360
            :window.innerWidth
        })
      }

      bindHandleScroll=(event)=>{
        // 滚动的宽度
        this.setState({
            scrollLeft:event.srcElement ? event.srcElement.documentElement.scrollLeft : 0 
        })
    }

    showMedia = () => {
        const {showResourcePane} = this.props;
        this.props.displayResourcePane(!showResourcePane);
    }

    showTool = () => {
        const {showToolPane} = this.props;
        this.props.displayToolPane(!showToolPane);
    }


    render() {
        const {showResourcePane, showToolPane} = this.props;
        const {windowWidth,windowHeight,contentHeight,contentWidth} = this.state;
        //const canvasW = 800*(this.state.contentHeight-100)/450;
        const canvasH = this.state.contentHeight-100;
        return (
            <div id="editview" style={{ height: windowHeight+'px',width: windowWidth+'px' }}  >
            <DndProvider backend={HTML5Backend}>
                <HeaderBar history={this.props.history}/>
                <Layout style={{ height: windowHeight+'px' }}>
                    <Layout style={{ height: contentHeight+'px' }}>
                        <Sider 
                            width={360} 
                            style={{background : '#fff', height: contentHeight+'px',
                            borderRightStyle: "solid",
                            borderRightWidth: "1px",
                            borderRightColor: "#FFC107",
                            zIndex:5}} 
                            // trigger={null} 
                            // collapsible 
                            collapsedWidth={0} 
                            collapsed={!showResourcePane}
                        >
                            <ResourcePane contentHeight={contentHeight}/>
                            {/* 收起左边栏按钮 */}
                            <div className="maskbutton1" 
                             onClick={this.showMedia}
                             style={{left:showResourcePane?"359px":"0px",top:canvasH/2+33+"px",width:"18px",}}>
                             <p style={{marginLeft:"4px",marginTop:"3px"}} >{showResourcePane?"<":">" }</p>
                         </div>
                        </Sider>

                        <Content style={{ background: '#fff', height: contentHeight+'px',width: contentWidth+'px'  }}>
                            <EditPane contentHeight={contentHeight} contentWidth={contentWidth}/>
                        </Content>
                        <Sider 
                            width={300}                            
                            style={{ background: '#fff', height: contentHeight+'px',
                            borderLeftStyle: "solid",
                            borderLeftWidth: "1px",
                            borderLeftColor: "#FFC107" }} 
                            // trigger={null} 
                            // collapsible 
                            collapsedWidth={0} 
                            collapsed={!showToolPane}
                        >
                            <ToolPane contentHeight={contentHeight}/>
                            {/* 收起右边栏按钮 */}
                            <div className="maskbutton2" 
                            onClick={this.showTool}
                            style={{right:showToolPane?"298px":"0px",top:canvasH/2+33+"px",width:"18px",}}>
                            {/* style={{right:showToolPane?(windowWidth<1300?298-(1300-windowWidth)+"px":"298px"):"0px",top:canvasH/2+33+"px",width:"18px",}}> */}
                            <p style={{marginLeft:"4px",marginTop:"3px"}} >{showToolPane?">":"<" }</p>
                            </div>
                        </Sider>
                           {/* 贴别遮罩按钮 */}
                            <div className="maskbutton2" 
                            onClick={this.showTool}
                            style={{display:!showToolPane&&window.innerWidth<1300?"inline":"none",left:window.innerWidth+this.state.scrollLeft-18+"px",top:canvasH/2+93+"px",width:"18px",}}>
                            <p style={{marginLeft:"4px",marginTop:"3px"}} >{"<"}</p>
                        </div>

                    </Layout>
                    <Layout style={{ height: '370px' }}>
                        <Content
                        style={{ background: '#eee', height: '320px',zIndex:5 }} 
                        >
                            {this.props.uimode === UIMode.TRACK_MODE?<TrackPane />:<StorylinePane />}
                            
                        </Content>
                    </Layout>
                    {/* <Layout>
                        <Content
                        style={{ background: '#eee', height: '30px' }} 
                        >
                            <ActionTracker />
                        </Content>
                    </Layout> */}
                </Layout>
            </DndProvider>     
            </div>
        )
    }
}
