import React, { Component } from 'react'
import { Button, Select, Icon } from 'antd';
import Color from '@/constants/Color';
import './toolbar.css';

const ButtonGroup = Button.Group;
const { Option } = Select;

export default class ToolBar extends Component {

    constructor(props) {
        super(props);
        this.copyElement = this.copyElement.bind(this);
        this.cutElement = this.cutElement.bind(this);
        this.pasteElement = this.pasteElement.bind(this);
        this.deleteElement = this.deleteElement.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.selectRef = React.createRef()
    }

    copyElement() {
        this.props.copyElement();
    }

    cutElement() {
        this.props.cutElement();
    }

    pasteElement() {
        this.props.pasteElement();
    }

    deleteElement() {
        this.props.deleteElement();
    }

    handleChange(value) {
        
        let selectValue =  value.slice() 
        if(selectValue.indexOf('Resource') + 1){           
            this.props.displayResourcePane(true)
        } else {
            this.props.displayResourcePane(false)
        }

        if(selectValue.indexOf('Tool') + 1){
            this.props.displayToolPane(true)
        } else {
            this.props.displayToolPane(false)
        }

        // lose focus
        this.selectRef.current.blur()
        
    }

    render() {
        const { isElementSelected, copiedElement, isPerforming } = this.props;
        const tabs = [
            <Option key='Resource'>Resource</Option>,
            <Option key='Tool'>Tool</Option>
        ];
        return (
            <div id='edittoolbar' style={{ background: Color.LIGHT_ORANGE }}>
                <Select
                    ref={this.selectRef} 
                    id='select-unfold-sider'
                    mode="multiple"
                    style={{ width: '65px', margin: '10px 0px 0px 20px', float: 'left' }}
                    defaultValue={['Resource','Tool']}
                    onChange={this.handleChange}
                    showArrow={true}
                    suffixIcon={<Icon type="caret-down" />}
                    getPopupContainer={triggerNode => triggerNode.parentElement}
                >
                    {tabs}
                </Select>

                <ButtonGroup style={{ margin: '10px 0px 0px 20px', float: 'left' }}>
                    <Button icon="copy" style={{ padding: '0 20px 0 20px' }} onClick={this.copyElement} disabled={!isElementSelected || isPerforming} />
                    <Button icon="scissor" style={{ padding: '0 20px 0 20px' }} onClick={this.cutElement} disabled={!isElementSelected || isPerforming} />
                    <Button icon="snippets" style={{ padding: '0 20px 0 20px' }} onClick={this.pasteElement} disabled={copiedElement === null || isPerforming} />
                    <Button icon="delete" style={{ padding: '0 20px 0 20px' }} onClick={this.deleteElement} disabled={!isElementSelected || isPerforming} />
                </ButtonGroup>

                <ButtonGroup style={{ margin: '10px 20px 0 0', float: 'right' }} >
                    <Button icon="undo" style={{ padding: '0 20px 0 20px' }} disabled={isPerforming} />
                    <Button icon="redo" style={{ padding: '0 20px 0 20px' }} disabled={isPerforming} />
                </ButtonGroup>

                <ButtonGroup style={{ margin: '10px 20px 0px 0px', float: 'right' }}>

                    <Button icon="pic-center" style={{ padding: '0 20px 0 20px' }} disabled={isPerforming} />
                    <Button icon="table" style={{ padding: '0 20px 0 20px' }} disabled={isPerforming} />
                </ButtonGroup>

                <Button icon="font-size" style={{ width: '80px', margin: '10px 20px 0px 0px', float: 'right' }} disabled={isPerforming} />
            </div>
        )
    }
}