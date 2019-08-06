import React, { Component } from 'react';
import { List } from 'antd';
import LazyLoad from 'react-lazyload';
import ImageCard from '../../../components/ImageCard';
import './imagetab.css';
import data from './data';

export default class ImageTab extends Component {
    
    render() {
        return (
            <div className="imagetab">
                <List
                    grid={{ gutter: 17, column: 3 }}
                    dataSource={data}
                    renderItem={item => (
                    <List.Item>
                        <LazyLoad><ImageCard info={item} {...this.props}/></LazyLoad>
                    </List.Item>
                    )}
                />
            </div>
        )
    }
}
