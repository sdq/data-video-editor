import React, { Component } from 'react';
import { Tabs, Modal, Input, Icon, Spin } from 'antd';
import IllustrationTab from './IllustrationTab/IllustrationTab';
import ChartTab from './ChartTab/ChartTab';
import UserTab from './UserTab';
import DefaultTab from './DefaultTab';
import './resourcepane.css';
import WebApi from '@/axios/api';
//import config from '@/constants/ApiConfig';
const { TabPane } = Tabs;

let tabName = '';
let newTabKey = "";

const tabIconStyle = {
  position: 'absolute',
  lineHeight: "20px",
  margin: "10px 0px 0px 5px",
  fontSize: '20px',
}
//限定2字长度组名
const tabTextStyle = {
  position: 'absolute',
  textAlign: 'center',//必须设置宽度才会有效
  lineHeight: "10px",
  marginTop: "33px",
  fontSize: '8px',
  width: "28px"
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
    this.state = {
      isfixName: false,
      loading: true,
      activeKey: -1,
      panes: [],
      visible: false,
    };
  }

  componentWillMount() {
    //let parentId = config.userFolderId;
    let parentId = 4962;///test
    //console.log("parentId...",parentId)
    let type = 'folder'
    WebApi.GetAssetsInExistingFolder(parentId, type).then(this.GetAsset).then(resolve => {
      this.setState({
        loading: false,
        panes: resolve
      })
    })
  }
  GetAsset(data) {
    let IdList = data.data;
    //console.log('IdList',IdList)
    return new Promise((resolve) => {
      let promiseList = [];
      for (let i = 0; i < IdList.length; i++) {

        let p = WebApi.GetAsset(IdList[i].id).then((data) => {
          let assetInfo = data.data;
          //src name uid
          //console.log('assetInfo',assetInfo)
          assetInfo.uid = assetInfo.id;
          assetInfo.src = assetInfo.path + assetInfo.filename;
          assetInfo.name = assetInfo.filename;
          return assetInfo;
        })
        promiseList.push(p);
      }
      //全部异步处理完毕
      Promise.all(promiseList)
        .then(arr => {
          resolve(arr)
        })
        .catch(err => {
        })
    })
  }
  addTab = (name) => {
     let parentId = 4962;/////////////////////////test
    //let parentId = config.userFolderId;
    WebApi.CreatNewFolder(name, parentId).then((resolve) => {
      //console.log("FolderId...", resolve)
      let id = resolve.data.id;
      this.state.panes.push({
        filename: name,
        id: id
      })
      //刷新界面
      this.setState({
        panes: this.state.panes,
        activeKey: id,
        visible: false,
      });
    })

  };

  onEdit = (targetKey, action) => {
    if (action === "add") {
      this.showModal();
    } else {
      this[action](targetKey);
    }
  };

 
  //设置默认图库和图表为不可删除项
  remove = targetKey => {
    let folderId = parseInt(targetKey);
    WebApi.DeleteFolder(folderId).then(resolve => {

      let { activeKey } = this.state;
      let lastIndex;

      this.state.panes.forEach((pane, i) => {
        if (pane.id === parseInt(targetKey)) {
          lastIndex = i - 1;
        }
      });
      //console.log("lastIndex",lastIndex,activeKey,targetKey)
      const panes = this.state.panes.filter(pane => pane.id !== parseInt(targetKey))
      if (panes.length && activeKey === parseInt(targetKey)) {
        if (lastIndex >= 0) {
          activeKey = panes[lastIndex].id;
          //console.log("activeKey",activeKey,panes)
        } else {
          activeKey = panes[0].id;
        }
      }

      //成功时更新界面  
      this.setState({
        activeKey,
        panes
      })
    })
  };

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

  fixFileName(key) {
    this.setState({
      isfixName: true
    })
    newTabKey = key;
  }

  onNameChange = e => {
    let { panes } = this.state;
    let newTabName = e.target.value;
    for (let i = 0; i < panes.length; i++) {
      if (panes[i].id === newTabKey) {
        this.newTabIndex = panes[i].id;
        panes[i].filename = newTabName;
        let activeKey = newTabName;
        this.setState({ panes, activeKey });
        this.setState({
          visible: false,
        });
      }
    }

  }

  onBlur = e => {
    let newFolderName = e.target.value
    if (newFolderName === ' ' || newFolderName === '') {
      this.setState({
        isfixName: false
      })
      return;
    }
    WebApi.UpdateExistingFolder(this.newTabIndex, newFolderName).then((resolve) => {
      //console.log("resolve", resolve)
      this.setState({
        isfixName: false
      })
    })
  }

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  changeTab = activeKey => {
    this.setState({ activeKey });
  };

  onChange = e => {
    tabName = e.target.value;
  }

  render() {
    return (
      <div className="card-container" style={{height:this.props.contentHeight-100+"px"}}>
        <Spin tip="Loading..." spinning={this.state.loading}>
          <Tabs tabPosition="left" type="editable-card" onEdit={this.onEdit} onChange={this.changeTab}>
            <TabPane
              tab={<div style={tabIconStyle}><Icon type="user" /></div>}
              key="User"
              closable={false}>
              <UserTab {...this.props} />
            </TabPane>
            <TabPane
              tab={<div style={tabIconStyle}><Icon type="appstore" /></div>}
              key="Illustration"
              closable={false}>
              <IllustrationTab {...this.props} />
            </TabPane>
            <TabPane
              tab={<div style={tabIconStyle}><Icon type="bar-chart" /></div>}
              key="Chart"
              closable={false}>
              <ChartTab {...this.props} />
            </TabPane>
            {this.state.panes.map(pane => (
              <TabPane
                tab={<div>
                  <div style={tabIconStyle}><Icon type='folder' /></div>
                  <p onDoubleClick={key => this.fixFileName(pane.id)} style={tabTextStyle}>{pane.filename}</p>
                </div>}
                key={pane.id} >
                <DefaultTab {...this.props} folderId={pane.id} />
              </TabPane>
            ))}
          </Tabs>
        </Spin>
        <Modal
          title="Input Group Name"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          //footer={null}
          fontSize="12px"
          keyboard={true}
          mask={false}
          maskClosable={true}
          width={200}
          placement="bottomRight"
          //modal位置根据位置动态计算
          style={{ position: "absolute", left: 69, top: (this.state.panes.length + 4) * 50 }}
        >
          <Input placeholder="Group1" maxLength={5} allowClear onChange={value => this.onChange(value)} />
        </Modal>
        {this.state.isfixName ?
          <input
            placeholder=""//不方便获取原名字 
            maxLength={5}
            onChange={value => this.onNameChange(value)}
            onBlur={value => this.onBlur(value)}
            caret-color="#fdc209"
            autoFocus="autofocus"
            style={{ position: "absolute", height: "15px", width: "48px", left: "6px", paddingLeft: "2px", borderWidth: "0.5px", top: window.event.clientY - 68 + "px" }}
          />
          : null}
      </div>
    )
  }
}
