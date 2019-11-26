import React, { Component } from 'react';
import { Tabs,Modal,Input,Icon} from 'antd';
import IllustrationTab from './IllustrationTab/IllustrationTab';
import ChartTab from './ChartTab/ChartTab';
import UserTab from './UserTab';
import DefaultTab from './DefaultTab';
import './resourcepane.css';

const { TabPane } = Tabs;

let tabName = '';

const tabIconStyle = {
    position: 'absolute',
    lineHeight:"20px",
    margin:"10px 0px 0px 5px",
    fontSize: '20px',
}
//限定2字长度组名
const tabTextStyle = {
    position: 'absolute',
    textAlign:'center',//无效
    lineHeight:"10px",
    marginTop:"33px",
    fontSize: '8px',
}
// const tabButtonStyle = {
//     positon:"absolute",
//     width: '10px',
//     height:'10px',
//     color:"#363636",
//     background:"#909096",
//     top:"0px",
//     left:"40px",
//     //float:"right",
//     border:"none",
// }
// const tabPaneStyle = {
//     //position: 'fixed',
//     zIndex: '2',
//     height:'50px',
// }

export default class ResourcePane extends Component {
    constructor(props) {
        super(props);
        this.newTabIndex = 0;
         const panes = [
           { icon: "picture", text:"",content: <DefaultTab {...this.props}/>, key: 'UImageser' },
           { icon: "gift", text:"",content: <DefaultTab {...this.props}/>, key: 'Gif' },
           { icon: "customer-service",text:"", content: <DefaultTab {...this.props}/>, key: 'Audio' },
           { icon: "play-square", text:"",content: <DefaultTab {...this.props}/>, key: 'Video' },
         ];
        this.state = {
          activeKey: panes[0].key,
          panes,
          visible: false,
        };
      }

    addTab = (name) => {
        const { panes } = this.state;

        const activeKey = `name${this.newTabIndex++}`;
        panes.push({ 
        icon: "file",
        text:name,
        content: <DefaultTab {...this.props}/>, key: activeKey });
        this.setState({ panes, activeKey,});
        this.setState({
            visible: false,
          });
      };

      onEdit = (targetKey, action) => {
          if(action==="add"){
            this.showModal();
          }else{
            this[action](targetKey);
          }
      };


      //TODO://设置按钮，动态开启编辑模式
      //设置默认图库和图表为不可删除项

      remove = targetKey => {
        let { activeKey } = this.state;
        let lastIndex;
        this.state.panes.forEach((pane, i) => {
          if (pane.key === targetKey) {
            lastIndex = i - 1;
          }
        });
        const panes = this.state.panes.filter(pane => pane.key !== targetKey);
        if (panes.length && activeKey === targetKey) {
          if (lastIndex >= 0) {
            activeKey = panes[lastIndex].key;
          } else {
            activeKey = panes[0].key;
          }
        }
        this.setState({ panes, activeKey });
      };

      showModal = () => {
        this.setState({
          visible: true,
        });
      };
    
      onChange = e =>  {
        tabName = e.target.value;
      }

      handleOk = e => {
        this.addTab(tabName);
        this.setState({
          visible: false,
        });
      };
    
   
      handleCancel = e => {
        this.setState({
          visible: false,
        });
      };


    render() {
        return (
            <div className="card-container">

                <Tabs tabPosition="left" type="editable-card" onEdit={this.onEdit}>
                    <TabPane 
                    tab={<div style={tabIconStyle}><Icon type="user" /></div>} 
                    key="User"
                    closable={false}>
                        <UserTab {...this.props}/>
                    </TabPane>
                    <TabPane 
                    tab={<div style={tabIconStyle}><Icon type="appstore"  /></div>} 
                    key="Illustration"
                    closable={false}>
                        <IllustrationTab {...this.props}/>
                    </TabPane>
                    <TabPane 
                    tab={<div style={tabIconStyle}><Icon type="bar-chart"  /></div>} 
                    key="Chart"
                    closable={false}>
                        <ChartTab {...this.props}/>
                    </TabPane> 
                    {this.state.panes.map(pane => (
                    <TabPane 
                    tab={<div>
                        <div style={tabIconStyle}><Icon type={pane.icon}  /></div>
                        <p style={tabTextStyle}>{pane.text}</p>
                    </div>} 
                    key={pane.key} >
                       {pane.content}
                    </TabPane>
                  ))}
                    </Tabs>
                  <Modal
                    title="Input Group Name"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}         
                    //footer={null}
                    fontSize= "12px"
                    keyboard = {true}
                    mask = {false}
                    maskClosable = {true}
                    width = {200}
                    placement="bottomRight"
                    //modal位置根据位置动态计算
                    style={{ position:"absolute",left: 69 , top : (this.state.panes.length+4)*50 }} 
                     >
                    <Input placeholder="Group1" maxLength={5} allowClear onChange = {value => this.onChange(value)}/>
                </Modal>
            </div>
        )
    }
}
