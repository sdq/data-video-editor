import React, { Component } from 'react';
import { Modal, Layout, Tabs, Spin, Button } from 'antd';
import DataPanel from './DataPanel';
import MappingPanel from './MappingPanel';
import StylePanel from './StylePanel';
import AnimationPanel from './AnimationPanel';
import ChartPanel from './ChartPanel';
import TablePanel from './TablePanel';
import carsSchema from '@/datasets/carsSchema';
import _ from 'lodash';
import './charteditor.css';

const { Sider, Content } = Layout;
const { TabPane } = Tabs;

export default class ChartEditor extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showChart: true,
            showChartAnimation: false,
            //只有在内部动画没有录制结束，但是点击保存按钮的时候，显示录制中弹窗，显示倒计时
            isShowRecordingModal: false,
            //录制倒计时
            remainTime: 0,
        }
        this.isRecording = true;
        this.totalDelay = 0;
        this.timer = 0;
    }

    changeTab = (key) => {
        if (key === 'Data') {
            this.setState({
                showChart: false,
                showChartAnimation: false,
            })
        } else if (key === 'Animation') {
            this.setState({
                showChart: true,
                showChartAnimation: true,
            })
        } else {
            this.setState({
                showChart: true,
                showChartAnimation: false,
            })
        }
    }
    addRecordingStateListener = (isRecording, totalDelay) => {
        this.isRecording = isRecording
        this.totalDelay = totalDelay / 1000 //totalDelay ms
        //监听录制结束，如果是在等待录制过程中，则主动关闭弹窗
        if (!isRecording && this.state.isShowRecordingModal) {
            this.setState({
                isShowRecordingModal: false
            })
            setTimeout(()=>{
                this.props.handleOk();//录制完毕直接返回到画布上;500ms容易接受
            },500)
            clearTimeout(this.timer)
        }
    }

    CancelRecordingChartAnimation = () => {
        if (this.timer) {
            clearTimeout(this.timer)
        }
        this.setState({
            isShowRecordingModal: false
        });
        //如果没有动画
        let animationSteps = this.props.displaySpec.animation
        if (!animationSteps.length) {
            this.props.currentElement.info().src = null   //这样在双击图表，就不显示录制好的video
            const newScene = _.cloneDeep(this.props.currentScene);
            newScene.updateElement(this.props.currentElement, this.props.elementIndex);
            this.props.updateScene(this.props.sceneIndex, newScene);
        }

    };
    saveChartAnimation = () => {
        //有动画
        let animationSteps = this.props.displaySpec.animation;
        if (this.isRecording && animationSteps.length) {
            //点击保存,但是没有录制完毕,弹窗显示等待时间或者用户取消保存
            this.setState({
                isShowRecordingModal: true,
                remainTime: this.totalDelay
            })
            let remainTime = this.totalDelay
            //倒计时
            this.timer = setInterval(() => {
                remainTime--;
                this.setState({
                    remainTime
                })
                if (this.timer && remainTime <= 0) {
                    clearTimeout(this.timer);
                }
            }, 1000)
        } else {
            //返回到画布上
            this.props.handleOk()
        }
    }
    render() {
        const { showChart, showChartAnimation, isShowRecordingModal, remainTime } = this.state;
        const { currentData, currentElement, displaySpec } = this.props;
        if (!currentData.data) return null;
        const datapreview = <TablePanel {...this.props} />
        const chartInfo = currentElement.info();
        const chart = <ChartPanel data={currentData.data} chartInfo={chartInfo} spec={displaySpec} showChartAnimation={showChartAnimation} addRecordingStateListener={this.addRecordingStateListener} {...this.props} />;
        return (
            <div>
                <Modal
                    title="Chart Editor"
                    visible={this.props.visible}
                    // onOk={this.props.handleOk}
                    onOk={this.saveChartAnimation}
                    width={1050}
                    bodyStyle={{ height: 600, padding: 0 }}
                    onCancel={this.props.handleCancel}
                >
                    <Layout style={{ height: '600px' }}>
                        <Sider width={420} className="pane">
                            <Tabs defaultActiveKey='Mapping' onChange={this.changeTab}>
                                <TabPane tab="Data" key="Data" style={{ padding: 8 }}>
                                    <DataPanel {...this.props} />
                                </TabPane>
                                <TabPane tab="Mapping" key="Mapping" style={{ padding: 8 }}>
                                    <MappingPanel currentFields={carsSchema} channels={this.props.channels}  {...this.props} />
                                </TabPane>
                                <TabPane tab="Style" key="Style" style={{ padding: 8 }}>
                                    <StylePanel {...this.props} />
                                </TabPane>
                                <TabPane tab="Animation" key="Animation" style={{ padding: 8 }}>
                                    <AnimationPanel chartInfo={chartInfo} {...this.props} />
                                </TabPane>
                            </Tabs>
                        </Sider>
                        <Layout>
                            <Content className="pane">
                                {showChart ? chart : datapreview}
                            </Content>
                        </Layout>
                    </Layout>
                </Modal>
                <Modal
                    className='recordConfirm'
                    visible={isShowRecordingModal}
                    onCancel={this.CancelRecordingChartAnimation}
                    closable={false}
                    maskClosable={false}
                    footer={[<Button key="cancel" type="primary" onClick={this.CancelRecordingChartAnimation}>Cancel</Button>]}
                >
                    <Spin id='spin' size="large"></Spin>
                    <p>Recording Inner Animation In Chart...</p>
                    <p>{remainTime} remaining</p>
                    <p>Please don't leave this page!</p>
                </Modal>
            </div>
        )
    }
}