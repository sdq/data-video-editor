import React, { Component } from 'react'
import { Upload, Button, Row, Col, Collapse, List } from 'antd';
import ImageCard from '@/components/ImageCard';
import AudioCard from '@/components/AudioCard';
import GifCard from '@/components/GifCard';
import VideoCard from '@/components/VideoCard';
import MyURL from '@/constants/MyURL';
import './usertab.css';
var gifFrames = require('gif-frames');

const { Panel } = Collapse;
const { Dragger } = Upload;

export default class UserTab extends Component {

    constructor(props) {
        super(props);
        this.testFolderId = 1;
        this.state = {
            folderList: [],
            activeKey: "image", //default
            imageList: [
                {
                    uid: '-1',
                    name: "man",
                    style: "cartoon",
                    src: MyURL.OSS + "/images/man.png"
                },
                {
                    uid: '-2',
                    name: "chair",
                    style: "cartoon",
                    src: MyURL.OSS + "/images/chair.png"
                },
                {
                    uid: '-3',
                    name: "light",
                    style: "cartoon",
                    src: MyURL.OSS + "/images/light.png"
                },
                {
                    uid: '-4',
                    name: "testImage",
                    style: "cartoon",
                    //src: MyURL.OSS + "/images/light.png"
                    src: 'https://pimcore.idvxlab.com:7000/pimcore-logo-2013-grau.png'
                },
            ],
            audioList: [
                {
                    uid: '-2',
                    name: "service1",
                    src: "https://datavideo.idvxlab.com/audios/service1.mp3"
                },
                {
                    uid: '-3',
                    name: "servic2",
                    src: "https://datavideo.idvxlab.com/audios/service2.mp3"
                },
                {
                    uid: '-4',
                    name: "service3",
                    src: "https://datavideo.idvxlab.com/audios/service3.mp3"
                },
                {
                    uid: '-4',
                    name: "service4",
                    src: "https://datavideo.idvxlab.com/audios/service4.mp3"
                },
                {
                    uid: '-5',
                    name: "88mp3",
                    src: "https://datavideo.idvxlab.com/audios/88mp3.mp3"
                },
                {
                    uid: '-6',
                    name: "90mp3",
                    src: "https://datavideo.idvxlab.com/audios/90mp3.mp3"
                },
                {
                    uid: '-7',
                    name: "91mp3",
                    src: "https://datavideo.idvxlab.com/audios/91mp3.mp3"
                },
                {
                    uid: '-5',
                    name: "testAudio",
                    src: 'https://pimcore.idvxlab.com:7000/examples/audios/column-anon.mp3'
                }
            ],
            videoList: [
                {
                    uid: '-1',
                    name: "chart_movie",
                    src: "https://datavideo.idvxlab.com/videos/chart_movie.mp4"
                },
                {
                    uid: '-2',
                    name: "video",
                    src: 'users/default/video.mp4'
                }
            ],
            gifList: [
                {
                    uid: '-1',
                    name: "walking",
                    src: "https://datavideo.idvxlab.com/gifs/walking.gif"
                },
                {
                    uid: '-2',
                    name: "car-run",
                    src: "https://datavideo.idvxlab.com/gifs/car-run.gif"
                },
                {
                    uid: '-3',
                    name: "star-flicker",
                    src: "https://datavideo.idvxlab.com/gifs/star-flicker.gif"
                },
            ],
        }
    }
    componentWillMount() {
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
                break;
            default:
                break;
        }

        return false;
    }

    async parseGif(gifUrl) {
       // console.log("gifUrl", gifUrl)
        let _this = this;
        await gifFrames(
            { url: gifUrl, frames: 'all', outputType: 'canvas', cumulative: true },
            function (err, frameData) {
                if (err) {
                    throw err;
                }
                _this.gifData = frameData;
                //console.log("frameData",frameData)
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
                // this.deleteAssetByID();
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

   
   

    render() {
        const { imageList, audioList, videoList, gifList } = this.state;
        //console.log("gifList", gifList)

        return (
            <div className="usertab" style={{ height: this.props.contentHeight }}  >
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

                <div className="user-upload-list" style={{height:this.props.contentHeight-130}}>
                    <Collapse accordion bordered={false} activeKey={this.state.activeKey} onChange={this.callback}  >
                        <Panel header={"Image (" + imageList.length + ")"} key="image" className="collaspe-panel">
                            <List
                                grid={{ gutter: 3, column: 3 }}
                                dataSource={imageList}
                                renderItem={item => (
                                    <List.Item>
                                        <ImageCard info={item}  {...this.props} />
                                        <Button style={{ marginLeft: '25px' }} key={item.uid} type="link" icon="delete" size="small"
                                            onClick={() => this.onDeleteImage(item.uid)}
                                        />
                                    </List.Item>
                                )}
                            />
                        </Panel>
                        <Panel header={"Gif (" + gifList.length + ")"} key="gif" className="collaspe-panel">
                            <List
                                grid={{ gutter: 3, column: 3 }}
                                dataSource={gifList}
                                renderItem={item => (
                                    <List.Item>
                                        <GifCard info={item}  {...this.props}/>
                                        <Button style={{ marginLeft: '25px' }} key={item.uid} type="link" icon="delete" size="small"
                                            onClick={() => this.onDeleteGif(item.uid)}
                                        />
                                    </List.Item>
                                )}
                            />
                        </Panel>

                        <Panel header={"Audio (" + audioList.length + ")"} key="audio" className="collaspe-panel">
                            <List
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
                        </Panel>
                        <Panel header={"Video (" + videoList.length + ")"} key="video" className="collaspe-panel">
                            <List
                                grid={{ gutter: 3, column: 2 }}
                                dataSource={videoList}
                                renderItem={item => (
                                    <List.Item >
                                        <VideoCard info={item}  {...this.props} />
                                        <Button style={{ marginLeft: '45px' }} key={item.uid} type="link" icon="delete" size="small"
                                            onClick={() => this.onDeleteVideo(item.uid)}
                                        />
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









