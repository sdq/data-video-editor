import React, { Component } from 'react'
import { Upload, Button, Row, Col, List, Input } from 'antd';
import ImageCard from '@/components/ImageCard';
import AudioCard from '@/components/AudioCard';
import GifCard from '@/components/GifCard';
import VideoCard from '@/components/VideoCard';
import './defaulttab.css';
var gifFrames = require('gif-frames');

const { Dragger } = Upload;
const { Search } = Input;

export default class DefaultTab extends Component {

    constructor(props) {
        super(props);
        this.state = {
            activeKey: "image", //default 根据后台传来的数据设置列表内的默认数据 设置
            imageList: [],   //根据后台传来的数据设置列表内的默认数据
            audioList: [],
            videoList: [],
            gifList: [],
        }
    }

    componentDidMount() {
        //解析后台数据，设置给state

        //这里是解析对列表中默认的gif进行解析
        this.state.gifList.map(async element => {
            element.gifData = await this.parseGif(element.src);
            return element;
        })
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
                    activeKey: "image"
                });
                break;
            case 'mp3':
                newList = this.state.audioList;
                newList.push(newFile);
                this.setState({
                    audioList: newList,
                    //上传文件成功，打开对应的panel
                    activeKey: "audio"
                });
                break;
            case 'mp4':
                newList = this.state.videoList;
                newList.push(newFile);
                this.setState({
                    videoList: newList,
                    //上传文件成功，打开对应的panel
                    activeKey: "video"
                });
                break;
            case 'gif':
                newList = this.state.gifList;
                (async () => {
                    newFile.gifData = await this.parseGif(newFile.src);
                })();
                //console.log("newFile",newFile)
                newList.push(newFile);
                this.setState({
                    gifList: newList,
                    //上传文件成功，打开对应的panel
                    activeKey: "gif"
                });
                //console.log("uploadFile111", this.state.gifList)
                break;
            default:
                break;
        }
        return false;
    }

    async parseGif(gifUrl) {
        //console.log("gifUrl", gifUrl)
        let _this = this;
        await gifFrames(
            { url: gifUrl, frames: 'all', outputType: 'canvas', cumulative: true },
            function (err, frameData) {
                if (err) {
                    throw err;
                }
                _this.gifData = frameData;
            }
        );
        return _this.gifData;
    }
    onDeleteImage = (key) => {
        for (var i = 0; i < this.state.imageList.length; i++) {
            if (this.state.imageList[i].uid === key) {
                //console.log('deleteyes', this.state.imageList[i].uid);
                const newList = this.state.imageList;
                newList.splice(i, 1);
                this.setState({
                    imageList: newList
                });
            }
        }
    };
    onDeleteGif = (key) => {
        for (var i = 0; i < this.state.gifList.length; i++) {
            if (this.state.gifList[i].uid === key) {
                //console.log('deleteyes', this.state.gifList[i].uid);
                const newList = this.state.gifList;
                newList.splice(i, 1);
                this.setState({
                    gifList: newList
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

    onDeleteVideo = (key) => {
        for (var i = 0; i < this.state.videoList.length; i++) {
            if (this.state.videoList[i].uid === key) {
                const newList = this.state.videoList;
                newList.splice(i, 1);
                this.setState({
                    videoList: newList
                });
            }
        }
    };

    callback = (key) => {
        switch (key) {
            case "image":
                this.setState({
                    activeKey: "image"
                })
                break;
            case "audio":
                this.setState({
                    activeKey: "audio"
                })
                break;
            case "video":
                this.setState({
                    activeKey: "video"
                });
                break;
            case "gif":
                this.setState({
                    activeKey: "gif"
                });
                break;

            default:
                this.setState({
                    activeKey: ""
                })
                break;
        }
    };

    onSearch(value){
        //search  资源
    }

    render() {
        const { imageList, audioList, videoList, gifList} = this.state;
        //console.log("gifList", gifList)

        return (
            <div className="defaulttab" style={{ height: this.props.contentHeight-140,overflow:"auto" }}>
                <Search
                placeholder="input search text"
                onSearch={value => this.onSearch(value)}
                style={{ width: "100%",marginBottom:"10px" }}
                />
                <div style={{ height: "120px" }}>
                    <Dragger
                        showUploadList={false}
                        accept=".png,.mp3,.gif,.mp4"
                        //accept=".png,.mp3,.wav,.wma,.aif,.mid,.ra,.vqf,.ape,.acm,.acc"
                        beforeUpload={this.uploadFile}
                    >
                        <p className="ant-upload-text" >Click or drag to upload</p>
                        <p className="ant-upload-hint">
                            support for .png .gif image or .mp3 audio
                        </p>
                    </Dragger>
                </div>

                <div className="user-upload-list">
                        { imageList.length!==0 ?   <List
                                grid={{ gutter: 3, column: 3 }}
                                dataSource={imageList}
                                renderItem={item => (
                                    <List.Item>
                                        <ImageCard info={item}  {...this.props} />
                                        <Button style={{ marginLeft: '36px' }} key={item.uid} type="link" icon="delete" size="small"
                                            onClick={() => this.onDeleteImage(item.uid)}
                                        />
                                    </List.Item>
                                )}
                            />
                                :null}
                       
                       { gifList.length!==0 ? <List
                                grid={{ gutter: 3, column: 3 }}
                                dataSource={gifList}
                                renderItem={item => (
                                    <List.Item>
                                        <GifCard info={item}  {...this.props} />
                                        <Button style={{ marginLeft: '36px' }} key={item.uid} type="link" icon="delete" size="small"
                                            onClick={() => this.onDeleteGif(item.uid)}
                                        />
                                    </List.Item>
                                )}
                            />
                                :null}
                      
                      { audioList.length!==0 ?<List
                                style={{ width: '100%', }}
                                grid={{ gutter: 8, column: 1 }}
                                dataSource={audioList}
                                renderItem={item => (
                                    <List.Item>
                                        <Row>
                                            <Col span={20} >
                                                <AudioCard info={item} {...this.props} />
                                            </Col>
                                            <Col offset={16}>
                                                <Button key={item.uid} type="link" icon="delete" size="small"
                                                    onClick={() => this.onDeleteMusic(item.uid)} />
                                            </Col>
                                        </Row>
                                    </List.Item>
                                )}
                            />
                                :null}
                       
                       { videoList.length!==0 ? <List
                                grid={{ gutter: 3, column: 2 }}
                                dataSource={videoList}
                                renderItem={item => (
                                    <List.Item >  
                                        <VideoCard info={item}  {...this.props} />
                                        <Button style={{ marginLeft: '70px' }} key={item.uid} type="link" icon="delete" size="small"
                                            onClick={() => this.onDeleteVideo(item.uid)}
                                        />  
                                    </List.Item>
                                )}
                            />
                                :null}
       
                </div>
            </div>
        )
    }
}









