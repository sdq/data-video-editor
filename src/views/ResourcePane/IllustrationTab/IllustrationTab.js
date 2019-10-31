import React, { Component } from 'react';
import { Button, Row, Col, Input, Collapse, List } from 'antd';
import LazyLoad from 'react-lazyload';
import ImageCard from '@/components/ImageCard';
import UndrawCard from '@/components/UndrawCard';
import './illustrationtab.css';
import data from './data';
//import undrawdata from './undrawdata/undrawdata';
import test from './undrawdata/test';

const { Panel } = Collapse;
const { Search } = Input;

export default class ImageTab extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeKey: "",          //激活标签
            search:"",              //搜索内容
            limit: 10,              //单次加载素材数量,单次操作
            primaryColor:"#6c63ff", //显示颜色
        }
        this.onSearch = this.onSearch.bind(this);
        this.onLoadMore = this.onLoadMore.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    componentDidMount() {}

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

    onChange(event) {
        this.setState({
            primaryColor: event.target.value
        });
      }
    
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

        //define
        const { limit, primaryColor, search  } = this.state;
        let undrawData =  new Array(0);
        let total = new Array(0);
        let shown = new Array(0);
        let hasMore = new Array(0);

        //init       
        for(let i =0;i<test.length;i++){
            undrawData.push([...test[i]]);
            total.push (test[i].length);
            shown.push(total[i]);
            hasMore.push(false);
            }

         //search
        if (search!=="") {
            for(let i =0;i<test.length;i++){
            undrawData[i] = test[i].filter(item => item.indexOf(search) !== -1);
            shown[i] = [undrawData[i].length];
            }
          }

        //load
        for(let i = 0;i<test.length;i++){
        if (undrawData[i].length > limit) {
            undrawData[i].length = limit;
            hasMore[i] = true;
          }else{
            hasMore[i] = false;
          }
        }

        return (
            <div className="imagetab">
                <Row>
                <Col span={20}>
                <Search
                     size="small"
                     placeholder="search illustration"
                     onChange={value => this.onSearch(value)}
                />
                </Col>
                <Col span={3} style={{margin: '1px 0px 0px 7px', fontSize: '14px'}}>
                <input
                    type="color"
                    className="form-control"
                    name="primaryColor"
                    onChange={this.onChange}
                    value={primaryColor}
                    width = {50}
                    height = {50}
                />
                </Col>
                </Row>
                <Collapse className="collaspe" id = "collaspe" ref="collaspe" accordion bordered={false} activeKey={this.state.activeKey} onChange={this.callback}>
                <Panel header={search!==""?"C1 (" + shown[0] + ")":"C1"} key="C1" className="collaspe-panel">
                        <List
                        className="collaspe-list"
                        grid={{ gutter: undrawData.length/2, column: 2 }}
                        dataSource={undrawData[0]}
                        renderItem={item => (
                        <List.Item>
                               <LazyLoad>
                               {/* <Undraw name={item} primaryColor={primaryColor} height={"120"}/> */}
                               <LazyLoad><UndrawCard name={item} primaryColor={primaryColor}  {...this.props}/>
                               </LazyLoad>
                               {/* <LazyLoad><UndrawCard info={item} {...this.props}/></LazyLoad> */}
                               <p className="card-text mb-0 text-center">{item}</p>
                               </LazyLoad>  
                               </List.Item>
                           )}></List>
                        {hasMore[0] &&(
                        <Button size = "small" display = { hasMore[0] ?"block":"none"} icon="caret-down"  onClick={this.onLoadMore} style={{margin:0, fontSize: '12px'}}>
                        Showing {limit} of {shown[0]} , Click to load more...  
                        </Button>)}
                </Panel>

                <Panel  header={search!==""?"C2 (" + shown[1] + ")":"C2"} key="C2" className="collaspe-panel">
                        <List
                        className="collaspe-list"
                        grid={{ gutter: undrawData.length/2, column: 2 }}
                        dataSource={undrawData[1]}
                        renderItem={item => (
                        <List.Item>
                               <LazyLoad>
                               <LazyLoad><UndrawCard name={item} primaryColor={primaryColor}  {...this.props}/>
                               </LazyLoad>
                               <p className="card-text mb-0 text-center">{item}</p>
                               </LazyLoad>  
                               </List.Item>
                           )}></List>
                        {hasMore[1] &&(
                        <Button size = "small" display = { hasMore[1] ?"block":"none"} icon="caret-down"  onClick={this.onLoadMore} style={{margin:0, fontSize: '12px'}}>
                        Showing {limit} of {shown[1]} , Click to load more...  
                        </Button>)}
                </Panel>


                <Panel  header={search!==""?"C3 (" + shown[2] + ")":"C3"} key="C3" className="collaspe-panel">
                        <List
                        className="collaspe-list"
                        grid={{ gutter: undrawData.length/2, column: 2 }}
                        dataSource={undrawData[2]}
                        renderItem={item => (
                        <List.Item>
                               <LazyLoad>
                               <LazyLoad><UndrawCard name={item} primaryColor={primaryColor}  {...this.props}/>
                               </LazyLoad>
                               <p className="card-text mb-0 text-center">{item}</p>
                               </LazyLoad>  
                               </List.Item>
                           )}></List>
                        {hasMore[2] &&(
                        <Button size = "small" display = { hasMore[2] ?"block":"none"} icon="caret-down"  onClick={this.onLoadMore} style={{margin:0, fontSize: '12px'}}>
                        Showing {limit} of {shown[2]} , Click to load more...  
                        </Button>)}
                </Panel>

                <Panel  header={search!==""?"C4 (" + shown[3] + ")":"C4"} key="C4" className="collaspe-panel">
                        <List
                        className="collaspe-list"
                        grid={{ gutter: undrawData.length/2, column: 2 }}
                        dataSource={undrawData[3]}
                        renderItem={item => (
                        <List.Item>
                               <LazyLoad>
                               <LazyLoad><UndrawCard name={item} primaryColor={primaryColor}  {...this.props}/>
                               </LazyLoad>
                               <p className="card-text mb-0 text-center">{item}</p>
                               </LazyLoad>  
                               </List.Item>
                           )}></List>
                        {hasMore[3] &&(
                        <Button size = "small" display = { hasMore[3] ?"block":"none"} icon="caret-down"  onClick={this.onLoadMore} style={{margin:0, fontSize: '12px'}}>
                        Showing {limit} of {shown[3]} , Click to load more...  
                        </Button>)}
                </Panel>

                <Panel  header={search!==""?"C5 (" + shown[4] + ")":"C5"} key="C5" className="collaspe-panel">
                        <List
                        className="collaspe-list"
                        grid={{ gutter: undrawData.length/2, column: 2 }}
                        dataSource={undrawData[4]}
                        renderItem={item => (
                        <List.Item>
                               <LazyLoad>
                               <LazyLoad><UndrawCard name={item} primaryColor={primaryColor}  {...this.props}/>
                               </LazyLoad>
                               <p className="card-text mb-0 text-center">{item}</p>
                               </LazyLoad>  
                               </List.Item>
                           )}></List>
                        {hasMore[4] &&(
                        <Button size = "small" display = { hasMore[4] ?"block":"none"} icon="caret-down"  onClick={this.onLoadMore} style={{margin:0, fontSize: '12px'}}>
                        Showing {limit} of {shown[4]} , Click to load more...  
                        </Button>)}
                </Panel>

                    
                <Panel header={"Other"} key="oldMaterial" className="collaspe-panel">
                        <List
                        className="collaspe-list"
                        grid={{ gutter: 17, column: 3 }}
                        dataSource={data}
                        renderItem={item => (
                        <List.Item>
                        <LazyLoad><ImageCard info={item} {...this.props}/></LazyLoad>
                        </List.Item>
                        )} />
                </Panel>
                </Collapse>
            </div>
            
        )
    }
}
