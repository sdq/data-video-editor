import React, { Component } from 'react';
import HTML5Backend from 'react-dnd-html5-backend'
import { DndProvider } from 'react-dnd'
import './editview.css';
import ChartEditor from './../../components/ChartEditor'

export default class EditorView extends Component {
    render() {
        return (
            <div id="editview">
                <DndProvider backend={HTML5Backend}>
                    <ChartEditor
                    {...this.props} />
                </DndProvider>
            </div>
        )
    }
}
