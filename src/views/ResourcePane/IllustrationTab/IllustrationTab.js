import React, { Component } from 'react';
import { Button, Row, Col, Input, Collapse, List } from 'antd';
//import LazyLoad from 'react-lazyload';
//import ImageCard from '@/components/ImageCard';
import UndrawCard from '@/components/UndrawCard';
import { SketchPicker } from 'react-color';
import './illustrationtab.css';
//import data from './data';
//import undrawdata from './undrawdata/undrawdata';
import test from './undrawdata/test';


const { Panel } = Collapse;
const { Search } = Input;

export default class ImageTab extends Component {
    constructor(props) {
        super(props);
        this.state = {
            displayColorPicker: false,
            activeKey: "C1",        //激活标签
            search: "",              //搜索内容
            limit: 10,              //单次加载素材数量,单次操作
            primaryColor: "#6c63ff", //显示颜色
        }
        this.onSearch = this.onSearch.bind(this);
        this.onLoadMore = this.onLoadMore.bind(this);
        this.handleColorClick = this.handleColorClick.bind(this);  //bind
    }

    componentDidMount() { }

    callback = (key) => {
        switch (key) {
            case "oldMaterial":
                this.setState({
                    activeKey: "oldMaterial"
                })
                break;
            case "C1":
                this.setState({
                    limit: 10, //limit重置
                    activeKey: "C1"
                })
                break;
            case "C2":
                this.setState({
                    limit: 10,
                    activeKey: "C2"
                });
                break;
            case "C3":
                this.setState({
                    limit: 10,
                    activeKey: "C3"
                });
                break;
            case "C4":
                this.setState({
                    limit: 10,
                    activeKey: "C4"
                });
                break;
            case "C5":
                this.setState({
                    limit: 10,
                    activeKey: "C5"
                });
                break;

            default:
                this.setState({
                    activeKey: ""
                })
                break;
        }
    };


    handleColorClick() {
        let { displayColorPicker } = this.state;
        displayColorPicker = displayColorPicker === "none" ? "block" : "none";
        this.setState({ displayColorPicker })
        if (displayColorPicker) {
            //this.props.updateColor(key,color)
        }
        this.setState({ displayColorPicker: !this.state.displayColorPicker })
    };


    handleColorChange = (value) => {
        let color = value.hex;
        this.setState({
            primaryColor: color
        });
        //this.handleColorClose();
    }


    handleColorClose = () => {
        this.setState({ displayColorPicker: false })
    };






    onSearch(e) {
        let value = e.target.value;
        if (this.debounce) {
            window.clearTimeout(this.debounce);
        }

        this.debounce = window.setTimeout(() => {
            this.setState({
                limit: 10,
                search: value
            });
        }, 30);
    }


    //Debounce timer.
    debounce;


    onLoadMore() {
        this.setState(state => ({ limit: state.limit + 10 }));
    }


    render() {

        const popover = {
            position: 'absolute',
            //position: 'relative',
            left: '-180px',
            zIndex: '2',
        }
        const cover = {
            position: 'fixed',
            //position:
            // top: '0px',
            //right: '0px',
            // bottom: '0px',
            // left: '0px',
        }


        //define
        const { limit, primaryColor, search } = this.state;
        let undrawData = new Array(0);
        let total = new Array(0);
        let shown = new Array(0);
        let hasMore = new Array(0);

        //init       
        for (let i = 0; i < test.length; i++) {
            undrawData.push([...test[i]]);
            total.push(test[i].length);
            shown.push(total[i]);
            hasMore.push(false);
        }

        //search
        if (search !== "") {
            for (let i = 0; i < test.length; i++) {
                undrawData[i] = test[i].filter(item => item.indexOf(search) !== -1);
                shown[i] = [undrawData[i].length];
            }
        }

        //load
        for (let i = 0; i < test.length; i++) {
            if (undrawData[i].length > limit) {
                undrawData[i].length = limit;
                hasMore[i] = true;
            } else {
                hasMore[i] = false;
            }
        }
        return (
            <div className="imagetab" style={{ 
                height: this.props.contentHeight 
                }}>
                <Row>
                    <Col span={20}>
                        <Search
                            size="small"
                            placeholder="search illustration"
                            onChange={value => this.onSearch(value)}
                        />
                    </Col>
                    <Col span={3} style={{ margin: '1px 0px 0px 7px', fontSize: '14px' }}>
                        {/* <Button onClick={this.handleColorClick} 
                        style={{ width: '100%', height: "24px", margin: '0px 0px 0px 0px', 
                        background: primaryColor, border: "#ffffff", verticalAlign: "middle" }}></Button>
                        {this.state.displayColorPicker ? <div style={popover}>
                            <div style={cover} onClick={this.handleColorClose} />
                            <SketchPicker color={primaryColor} onChange={this.handleColorChange} />
                        </div> : null} */}

                    <Button size='small' icon="bg-colors" onClick={ this.handleColorClick } 
                    style={{width: '100%',height: "24px",margin: '0px 0px 0px 0px',
                    background:primaryColor,border:"#ffffff",verticalAlign: "middle"}}></Button> 
                    {this.state.displayColorPicker ? <div style={ popover }>
                     <div style={ cover } onClick={ this.handleColorClose } />
                     <SketchPicker color={primaryColor}  onChange={this.handleColorChange}  />
                     </div>:null }
                    </Col>
                </Row>
                <Collapse
                    className="collaspe"
                    id="collaspe"
                    ref="collaspe"
                    accordion bordered={false}
                    //defaultActiveKey={['C1']}
                    activeKey={this.state.activeKey}
                    onChange={this.callback}
                    style={{ 
                        height: this.props.contentHeight-25,
                        overflowY:'scroll'
                    }}
                    >
                    
                    <Panel header={search !== "" ? "Business & Technology (" + shown[0] + ")" : "Business & Technology"} key="C1" className="collaspe-panel">
                        <List
                        className="collaspe-list"
                        grid={{ gutter: undrawData.length/2, column: 2 }}
                        dataSource={undrawData[0]}
                        renderItem={item => (
                        <List.Item>
                               {/* <Undraw name={item} primaryColor={primaryColor} height={"120"}/> */}
                               <UndrawCard name={item} primaryColor={primaryColor}  {...this.props}/>
                               {/* <LazyLoad><UndrawCard info={item} {...this.props}/></LazyLoad> */}
                               <p className="card-text mb-0 text-center" style={{ fontSize: '10px'}}>{item}</p>
                               </List.Item>
                           )}></List>
                        {hasMore[0] &&(
                        <Button size = "small" display = { hasMore[0] ?"block":"none"} icon="caret-down"  onClick={this.onLoadMore} style={{margin:0, fontSize: '12px'}}>
                        Show {limit}/{shown[0]},Load more..
                        </Button>)}
                    </Panel>

                    <Panel header={search !== "" ? "Society & Humanity (" + shown[1] + ")" : "Society & Humanity"} key="C2" className="collaspe-panel">
                        <List
                        className="collaspe-list"
                        grid={{ gutter: undrawData.length/2, column: 2 }}
                        dataSource={undrawData[1]}
                        renderItem={item => (
                        <List.Item>
                            <UndrawCard name={item} primaryColor={primaryColor}  {...this.props}/>
                               <p className="card-text mb-0 text-center" style={{ fontSize: '10px'}}>{item}</p>
                               </List.Item>
                           )}></List>
                        {hasMore[1] &&(
                        <Button size = "small" display = { hasMore[1] ?"block":"none"} icon="caret-down"  onClick={this.onLoadMore} style={{margin:0, fontSize: '12px'}}>
                        Show {limit}/{shown[1]},Load more.. 
                        </Button>)}
                    </Panel>


                    <Panel header={search !== "" ? "Sports & Fitness (" + shown[2] + ")" : "Sports & Fitness"} key="C3" className="collaspe-panel">
                        <List
                        className="collaspe-list"
                        grid={{ gutter: undrawData.length/2, column: 2 }}
                        dataSource={undrawData[2]}
                        renderItem={item => (
                        <List.Item>
                            <UndrawCard name={item} primaryColor={primaryColor}  {...this.props}/>
                               <p className="card-text mb-0 text-center" style={{ fontSize: '10px'}}>{item}</p>
                               </List.Item>
                           )}></List>
                        {hasMore[2] &&(
                        <Button size = "small" display = { hasMore[2] ?"block":"none"} icon="caret-down"  onClick={this.onLoadMore} style={{margin:0, fontSize: '12px'}}>
                        Show {limit}/{shown[2]},Load more..  
                        </Button>)}
                    </Panel>

                    <Panel header={search !== "" ? "Animal & Nature (" + shown[3] + ")" : "Animal & Nature"} key="C4" className="collaspe-panel">
                        <List
                        className="collaspe-list"
                        grid={{ gutter: undrawData.length/2, column: 2 }}
                        dataSource={undrawData[3]}
                        renderItem={item => (
                        <List.Item>
                               <UndrawCard name={item} primaryColor={primaryColor}  {...this.props}/>
                               <p className="card-text mb-0 text-center" style={{ fontSize: '10px'}}>{item}</p>
                               </List.Item>
                           )}></List>
                        {hasMore[3] &&(
                        <Button size = "small" display = { hasMore[3] ?"block":"none"} icon="caret-down"  onClick={this.onLoadMore} style={{margin:0, fontSize: '12px'}}>
                       Show {limit}/{shown[3]},Load more..  
                        </Button>)}
                    </Panel>

                    <Panel header={search !== "" ? "Culture & Art (" + shown[4] + ")" : "Culture & Art"} key="C5" className="collaspe-panel">
                        <List
                        className="collaspe-list"
                        grid={{ gutter: undrawData.length/2, column: 2 }}
                        dataSource={undrawData[4]}
                        renderItem={item => (
                        <List.Item>
                               <UndrawCard name={item} primaryColor={primaryColor}  {...this.props}/>
                               <p className="card-text mb-0 text-center" style={{ fontSize: '10px'}}>{item}</p>  
                               </List.Item>
                           )}></List>
                        {hasMore[4] &&(
                        <Button size = "small" display = { hasMore[4] ?"block":"none"} icon="caret-down"  onClick={this.onLoadMore} style={{margin:0, fontSize: '12px'}}>
                        Show {limit}/{shown[4]},Load more..  
                        </Button>)}
                    </Panel>
                    {/* <Panel header={"Other"} key="oldMaterial" className="collaspe-panel">
                        <List
                            className="collaspe-list"
                            grid={{ gutter: 17, column: 3 }}
                            dataSource={data}
                            renderItem={item => (
                                <List.Item>
                                    <LazyLoad><ImageCard info={item} {...this.props} /></LazyLoad>
                                </List.Item>
                            )} />
                    </Panel> */}
                </Collapse>
            </div>

        )
    }
}
