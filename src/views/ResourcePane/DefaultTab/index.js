import React, { Component } from 'react'
import { Upload, Button, Row, Col, List, Input, Collapse, Spin } from 'antd';
import ImageCard from '@/components/ImageCard';
import AudioCard from '@/components/AudioCard';
import GifCard from '@/components/GifCard';
import VideoCard from '@/components/VideoCard';
import './defaulttab.css';
import MyURL from '@/constants/MyURL'
import WebApi from '@/axios/api';
let gifFrames = require('gif-frames');

const { Dragger } = Upload;
const { Panel } = Collapse;
const { Search } = Input;

export default class DefaultTab extends Component {

    constructor(props) {
        super(props);
        this.state = {
            searchValue: '',
            loading: true,
            activeKey: "image", //default
            imageList: [],   //根据后台传来的数据设置列表内的默认数据
            audioList: [],
            videoList: [],
            gifList: [],
            loadingTips: 'Loading'
        }
    }

    componentDidMount() {
        this.initAssetsList();
    }

    //界面调用
    initAssetsList() {
        this.setState({
            gifList: [],
            imageList: [],
            videoList: [],
            audioList: [],
            loading: true,
            loadingTips:'Loading'
        })
        let parentId = this.props.folderId
        //Image 
        //"mimetype": "image/png",
        //"mimetype": "image/gif",
        WebApi.GetAssetsInExistingFolder(parentId, 'image').then(this.GetAsset).then(async assetsList => {
            await assetsList.map(async item => {
                if (item.mimetype === 'image/gif') {
                    //这里是解析对列表中默认的gif进行解析
                    item.gifData = await this.parseGif(item.src);
                    //console.log("item",item)
                    this.state.gifList.push(item)
                } else {
                    this.state.imageList.push(item)
                }
                return item;
            })
            //console.log("this.state.gifList", this.state.gifList)
            //TODO 解决异步问题
            this.setState({
                loading: false,
                imageList: this.state.imageList,
                gifList: this.state.gifList
            })
        })
        //Video
        WebApi.GetAssetsInExistingFolder(parentId, 'video').then(this.GetAsset).then(resolve => {
            this.setState({
                loading: false,
                videoList: resolve
            })
        })
        //Audio
        WebApi.GetAssetsInExistingFolder(parentId, 'audio').then(this.GetAsset).then(resolve => {
            this.setState({
                loading: false,
                audioList: resolve
            })
        })
    }
    GetAsset(data) {
        let IdList = data.data;
        return new Promise((resolve) => {
            let promiseList = [];
            for (let i = 0; i < IdList.length; i++) {
                let p = WebApi.GetAsset(IdList[i].id).then((data) => {
                    let assetInfo = data.data;
                    //src name uid
                    assetInfo.uid = assetInfo.id;
                    assetInfo.src = MyURL.PIMCORE + assetInfo.path + assetInfo.filename;
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
    encodeFileToBase64(file) {
        return new Promise((resolve) => {
            let encodeData;
            let reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = function (e) {
                //data:image/gif;base64,R0lGODlhOAT0Aff
                //data:video/mp4;base64,
                encodeData = e.target.result.split('base64,')[1]; // e.target.result就是该文件的完整Base64 Data-URI
                resolve(encodeData)
            };
        })
    }

    uploadFile = (file) => {
        this.encodeFileToBase64(file).then(encodeData => {
            this.setState({
                loading: true,
                loadingTips: 'uploading...'
            })
            let newFile = {};
            newFile.uid = file.uid;
            newFile.name = file.name;
            const fileURL = URL.createObjectURL(file);
            newFile.src = fileURL;
            let fileType = newFile.name.split(".").slice(-1).pop()
            let newList = [];
            switch (fileType) {
                case 'png':
                    WebApi.CreatNewAsset(this.props.folderId, 'image', file.name, encodeData).then(resolve => {
                        newFile.id = resolve.data.id;
                        //上传文件成功，打开对应的panel
                        newList = this.state.imageList;
                        newList.push(newFile);
                        this.setState({
                            loading: false,
                            imageList: newList,
                            activeKey: "image"
                        });
                    }, reject => {
                        this.setState({
                            loading: false,
                        })

                    })
                    break;
                case 'mp3':
                    WebApi.CreatNewAsset(this.props.folderId, 'audio', file.name, encodeData).then(resolve => {
                        newFile.id = resolve.data.id;
                        //上传文件成功，打开对应的panel
                        newList = this.state.audioList;
                        newList.push(newFile);
                        this.setState({
                            loading: false,
                            audioList: newList,
                            //上传文件成功，打开对应的panel
                            activeKey: "audio"
                        });
                    }, reject => {
                        this.setState({
                            loading: false,
                        })
                    })

                    break;
                case 'mp4':
                    WebApi.CreatNewAsset(this.props.folderId, 'video', file.name, encodeData).then(resolve => {
                        newFile.id = resolve.data.id;
                        newList = this.state.videoList;
                        newList.push(newFile);
                        this.setState({
                            loading: false,
                            videoList: newList,
                            //上传文件成功，打开对应的panel
                            activeKey: "video"
                        });
                    }, reject => {
                        this.setState({
                            loading: false,
                        })
                    })
                    break;
                case 'gif':
                    WebApi.CreatNewAsset(this.props.folderId, 'image', file.name, encodeData).then(resolve => {
                        newFile.id = resolve.data.id;
                        //上传文件成功，打开对应的panel
                        newList = this.state.gifList;
                        (async () => {
                            newFile.gifData = await this.parseGif(newFile.src);
                        })();
                        newList.push(newFile);
                        this.setState({
                            loading: false,
                            gifList: newList,
                            activeKey: "gif"
                        });
                    }, reject => {
                        this.setState({
                            loading: false,
                        })
                    })
                    break;
                default:
                    break;
            }
        })
        return false;
    }

    async parseGif(gifUrl) {
        //console.log("gifUrl", gifUrl)
        let _this = this;
        await gifFrames(
            { url: gifUrl, frames: 'all', outputType: 'canvas', cumulative: true },
            function (err, frameData) {
                // console.log("frameData", frameData)
                if (err) {
                    throw err;
                }
                _this.gifData = frameData;
            }
        );
        return _this.gifData;
    }

    onDelete = (type, key, assetId) => {
        this.setState({
            loading:true,
            loadingTips:'deleting...'
        })
        WebApi.DeleteAsset(assetId).then(reslove => {
            this.setState({
                loading:false,
            })
            this.refreshAssetList(type, key);
        },reject =>{
            this.setState({
                loading:false,
            })
        })
    }

    refreshAssetList(type, key) {
        switch (type) {
            case 'image':
                for (let i = 0; i < this.state.imageList.length; i++) {
                    if (this.state.imageList[i].uid === key) {
                        //console.log('deleteyes', this.state.imageList[i].uid);
                        const newList = this.state.imageList;
                        newList.splice(i, 1);
                        this.setState({
                            imageList: newList
                        });
                    }
                }
                break;
            case 'gif':
                for (let i = 0; i < this.state.gifList.length; i++) {
                    if (this.state.gifList[i].uid === key) {
                        //console.log('deleteyes', this.state.gifList[i].uid);
                        const newList = this.state.gifList;
                        newList.splice(i, 1);
                        this.setState({
                            gifList: newList
                        });
                    }
                }
                break;
            case 'audio':
                for (let i = 0; i < this.state.audioList.length; i++) {
                    if (this.state.audioList[i].uid === key) {
                        const newList = this.state.audioList;
                        newList.splice(i, 1);
                        this.setState({
                            audioList: newList
                        });
                    }
                }
                break;
            case 'video':
                for (let i = 0; i < this.state.videoList.length; i++) {
                    if (this.state.videoList[i].uid === key) {
                        const newList = this.state.videoList;
                        newList.splice(i, 1);
                        this.setState({
                            videoList: newList
                        });
                    }
                }
                break;
            default:
                break;
        }
    }


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

    onSearch(value) {
        this.setState({
            gifList: [],
            imageList: [],
            videoList: [],
            audioList: [],
            loading: true,
            loadingTips:'loading'
        })
        WebApi.SearchAssets(this.props.folderId, value, 'image').then(this.GetAsset).then(assetsList => {
            assetsList.map(item => {
                if (item.mimetype === 'image/gif') {
                    this.state.gifList.push(item)
                } else {
                    this.state.imageList.push(item)
                }
                return item;
            })
            this.setState({
                loading: false,
                imageList: this.state.imageList,
                gifList: this.state.gifList
            })
        })
        WebApi.SearchAssets(this.props.folderId, value, 'video').then(this.GetAsset).then(assetsList => {
            this.setState({
                loading: false,
                videoList: assetsList
            })
        })
        WebApi.SearchAssets(this.props.folderId, value, 'audio').then(this.GetAsset).then(assetsList => {
            this.setState({
                loading: false,
                audioList: assetsList
            })
        })
    }

    resetSearch = () => {
        this.setState({
            searchValue: ''
        })

    }

    inputValueChange = (e) => {
        if (e.target && e.target.value === "") {
            //重置列表   
            this.initAssetsList();
        }
    }

    render() {
        const { imageList, audioList, videoList, gifList } = this.state;


        return (
            <div className="defaulttab" style={{ height: this.props.contentHeight }}>
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
                <Spin tip={this.state.loadingTips} spinning={this.state.loading}>
                    <div className="user-upload-list" style={{ height: this.props.contentHeight-170 }}>
                        <Collapse accordion bordered={false} activeKey={this.state.activeKey} onChange={this.callback} style={{ height: this.props.contentHeight - 170 }} >
                            <Panel header={"Image (" + imageList.length + ")"} key="image" className="collaspe-panel">
                                <List
                                    grid={{ gutter: 3, column: 3 }}
                                    dataSource={imageList}
                                    renderItem={item => (
                                        <List.Item>
                                            <ImageCard info={item}  {...this.props} />
                                            <Button style={{ marginLeft: '25px' }} key={item.uid} type="link" icon="delete" size="small"
                                                onClick={() => this.onDelete('image', item.uid, item.id)}
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
                                            <GifCard info={item}  {...this.props} />
                                            <Button style={{ marginLeft: '25px' }} key={item.uid} type="link" icon="delete" size="small"
                                                onClick={() => this.onDelete('gif', item.uid, item.id)}
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
                                                        onClick={() => this.onDelete('audio', item.uid, item.id)} />
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
                                                onClick={() => this.onDelete('video', item.uid, item.id)}
                                            />
                                        </List.Item>
                                    )}
                                />
                            </Panel>
                        </Collapse>
                    </div>
                </Spin>
            </div>
        )
    }
}









