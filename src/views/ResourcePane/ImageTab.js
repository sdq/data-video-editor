import React, { Component } from 'react';
import { List } from 'antd';
import LazyLoad from 'react-lazyload';
import './imagetab.css';

const data = [
    {
        name: "man",
        style: "cartoon",
        src: "http://localhost:8080/images/man.png"
    },
    {
        name: "leaf",
        style: "cartoon",
        src: "http://localhost:8080/images/leaf.png"
    }
];

export default class ImageTab extends Component {
    
    render() {
        return (
            <div className="imagetab">
                <List
                    grid={{ gutter: 17, column: 3 }}
                    dataSource={data}
                    renderItem={item => (
                    <List.Item>
                        {/* {item.title} */}
                        {/* <Card title={item.title}>Card content</Card> */}
                        <LazyLoad>
                            <div className="imagecard" align="center">
                                <img src={item.src} />
                            </div>
                        </LazyLoad>
                    </List.Item>
                    )}
                />
            </div>
        )
    }
}
