import React, { Component } from 'react';
import EditToolBar from './EditToolBar';
import PlayControlBar from './PlayControlBar';
import EditCanvas from './EditCanvas';
import './editpane.css';

export default class EditPane extends Component {
    render() {
        return (
            <div id="editpane">
                <div style={{ background: '#FFFAEA', height: '50px' }}><EditToolBar/></div>
                <div style={{ background: '#fff', height: '450px' }}><EditCanvas { ...this.props }/></div>
                <div style={{ background: '#FFFAEA', height: '50px' }}><PlayControlBar { ...this.props }/></div>
            </div>
        )
    }
}
