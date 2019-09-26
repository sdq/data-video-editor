import React, { Component } from 'react'
import { Upload, Button, Row, Col, Collapse, List } from 'antd';
import ImageCard from '@/components/ImageCard';
import AudioCard from '@/components/AudioCard';
import './usertab.css';

const { Panel } = Collapse;
const { Dragger } = Upload;

export default class UserTab extends Component {

    constructor(props) {
        super(props);
        this.state = {
            activeKey:"audio",
            imageList: [],
            audioList: [
                {
                    uid: '-1',
                    name: "column-anon",
                    src: "https://datavideo.idvxlab.com/audios/column-anon.mp3"
                },
            ],
        }
    }

    uploadFile = (file) => {
        let newFile = {};
        newFile.uid = file.uid;
        newFile.name = file.name;
        const fileURL = URL.createObjectURL(file);
        newFile.src = fileURL;
        let fileType = newFile.name.split(".").slice(-1).pop()
        let newList = [];
        switch (fileType) {
            case 'png':
                newList = this.state.imageList;
                newList.push(newFile);
                this.setState({ 
                    imageList: newList,
                    //上传文件成功，打开对应的panel
                    activeKey:"image"
                });
                break;
            case 'mp3':
                newList = this.state.audioList;
                newList.push(newFile);
                this.setState({ 
                    audioList: newList,
                    //上传文件成功，打开对应的panel
                    activeKey:"audio"
                });
                break;
            default:
                break;
        }
        return false;
    }

    onDeleteImage = (key) => {
        for (var i = 0; i < this.state.imageList.length; i++) {
            if (this.state.imageList[i].uid === key) {
                console.log('deleteyes', this.state.imageList[i].uid);
                const newList = this.state.imageList;
                newList.splice(i, 1);
                this.setState({ 
                    imageList: newList
                });
            }
        }
    };

    onDeleteMusic = (key) => {
        for (var i = 0; i < this.state.audioList.length; i++) {
            if (this.state.audioList[i].uid === key) {
                const newList = this.state.audioList;
                newList.splice(i, 1);
                this.setState({ 
                    audioList: newList
                });
            }
        }
    };
     callback=(key)=> {
        //ant 中，undefined 表示收缩面板
        if(typeof key !=='undefined'){
            if(key==="image"){
              this.setState({
                activeKey:"image"
              })
            }else{
              this.setState({
                activeKey:"audio"
              })
            } 

        }else{
            this.setState({
                activeKey:""
              })
        }
      };

    render() {
        const { imageList, audioList } = this.state;
        return (
            <div className="usertab">
                <div style={{height: "120px", margin: "8px"}}>
                    <Dragger
                        showUploadList={false}
                        accept=".png,.mp3"
                        //accept=".png,.mp3,.wav,.wma,.aif,.mid,.ra,.vqf,.ape,.acm,.acc"
                        beforeUpload= {this.uploadFile}
                    >
                        <p className="ant-upload-text" >Click or drag to upload</p>
                        <p className="ant-upload-hint">
                            support for .png image or .mp3 audio
                        </p>
                    </Dragger>
                </div>
                
                <div className="user-upload-list">
                    <Collapse accordion bordered={false} activeKey={this.state.activeKey} onChange={this.callback}>
                        <Panel header={"Image ("+imageList.length+")"} key="image" className="collaspe-panel">
                            <List
                                grid={{ gutter: 3, column: 3 }}
                                dataSource={imageList}
                                renderItem={item => (
                                    <List.Item>
                                        <ImageCard info={item}  {...this.props} />
                                        <Button style={{marginLeft: '36px'}} key={item.uid} type="link" icon="delete" size="small"
                                            onClick={() => this.onDeleteImage(item.uid)}
                                        />
                                    </List.Item>
                                )}
                            />
                        </Panel>

                        <Panel header={"Audio ("+audioList.length+")"} key="audio" className="collaspe-panel">
                            <List
                                style={{ width: '100%', }}
                                grid={{ gutter: 8, column: 1 }}
                                dataSource={audioList}
                                renderItem={item => (
                                    <List.Item>
                                        <Row>
                                            <Col span={20} >
                                                <AudioCard info={item} {...this.props}/>
                                            </Col>
                                            <Col offset={16}>
                                                <Button key={item.uid} type="link" icon="delete" size="small"
                                                    onClick={() => this.onDeleteMusic(item.uid)} />
                                            </Col>
                                        </Row>
                                    </List.Item>
                                )}
                            />
                        </Panel>
                    </Collapse>
                </div>
            </div>
        )
    }
}









