import React, { Component } from 'react';
import EditToolBar from './EditToolBar';
import PlayControlBar from './PlayControlBar';

export default class EditPane extends Component {
    render() {
        return (
            <div>
                <div style={{ background: '#eee', height: '50px' }}><EditToolBar/></div>
                <div style={{ background: '#fff', height: '400px' }}>EditPane</div>
                <div style={{ background: '#eee', height: '50px' }}><PlayControlBar/></div>
            </div>
        )
    }
}
