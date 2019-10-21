import React, { Component } from 'react';
import { Button, Row, Col, Input, Collapse, List } from 'antd';
import LazyLoad from 'react-lazyload';
import ImageCard from '@/components/ImageCard';
import UndrawCard from '@/components/UndrawCard';
import './illustrationtab.css';
import data from './data';
import undrawdata from './undrawdata';

const { Panel } = Collapse;
const { Search } = Input;

export default class ImageTab extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeKey: "",          //激活标签
            search:"",              //搜索内容
            limit: 10,              //显示素材数
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
            case "undrawMaterial":
                this.setState({
                    activeKey: "undrawMaterial"
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
        const { limit, primaryColor, search  } = this.state;
        let undrawData = [...undrawdata];//...取值
        const total = undrawdata.length;
        let shown = total;
        let hasMore = false;

        if (search!=="") {
            undrawData = undrawdata.filter(item => item.indexOf(search) !== -1);
            shown = undrawData.length;
          }

        if (undrawData.length > limit) {
            undrawData.length = limit;
            hasMore = true;
          }else{
            hasMore = false;
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
                <Panel header={"Undraw Material"} key="undrawMaterial" className="collaspe-panel">
                        <List
                        className="collaspe-list"
                        grid={{ gutter: undrawData.length/2, column: 2 }}
                        dataSource={undrawData}
                        renderItem={item => (
                        <List.Item>
                               <LazyLoad>
                               {/* <Undraw name={item} primaryColor={primaryColor} height={"120"}/> */}
                               <LazyLoad><UndrawCard name={item} primaryColor={primaryColor} {...this.props}/>
                               </LazyLoad>
                               {/* <LazyLoad><UndrawCard info={item} {...this.props}/></LazyLoad> */}
                               <p className="card-text mb-0 text-center">{item}</p>
                               </LazyLoad>  
                               </List.Item>
                           )}></List>
                        {hasMore &&(
                        <Button size = "small" display = { hasMore ?"block":"none"} icon="caret-down"  onClick={this.onLoadMore} style={{margin:0, fontSize: '12px'}}>
                        Showing {limit} of {shown} , Click to load more...  
                        </Button>)}
                </Panel>
                    
                <Panel header={"Old Material"} key="oldMaterial" className="collaspe-panel">
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
