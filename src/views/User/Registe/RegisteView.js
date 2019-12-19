import React, { Component } from 'react'
import { Input, Button, message, Checkbox } from 'antd';
import config from '@/constants/ApiConfig';
import WebApi from '@/axios/api';
import './RegisteView.css'

export default class RegisteView extends Component {
    constructor(props) {
        super(props)
        this.emailNum = '';
        this.psw = '';
    }

    userLogIn = () => {
        this.props.history.push('/')
    }

    userRegister = () => {
        let parentId = config.rootFolderId;
        let name = 'user_' + this.emailNum;
        WebApi.CreatNewFolder(name, parentId).then(reslove => {
            this.register(reslove).then((resolve) => {
                this.props.history.push('/index')
            })
        }, reject => {
            message.error("此账号已经存在")
        })
    }

    register = (data) => {
        let userFolderId = data.data.id
        //console.log("userFolderId", userFolderId)
        return WebApi.registerUser(this.emailNum, this.psw, userFolderId).then(reslove => {
            config.userFolderId = userFolderId
            //console.log("registerUser", config.userFolderId)
            this.props.history.push('/index')
        }, reject => {
            message.error("注册失败")
            return;
        })
    }

    onChange = (e) => {
        console.log(`checked = ${e.target.checked}`);
    }
    emailChange = (e) => {
        this.emailNum = e.target.value
    }
    pswChange = (e) => {
        this.psw = e.target.value
    }
    render() {
        return (
            <div className='loginWrapper'>
                <div className='logo'></div>
                <div className='leftRectangle'></div>
                <div className='rightRectangle'></div>
                <div className='formWrapper'>
                    <span className='bigTxt'>免费注册</span>
                    <span>邮箱</span>
                    <Input placeholder='请输入邮箱号码' onChange={this.emailChange}></Input>
                    <span>密码</span>
                    <Input.Password placeholder='请输入密码' onChange={this.pswChange}/>
                    <Checkbox onChange={this.onChange}>记住我</Checkbox>
                    <Button type="primary" onClick={this.userRegister}>创建账户</Button>
                </div>
                <div className='smallTxt'>
                    <div>已有账户？点击此处<p className='loginTxt' onClick={this.userLogIn} >登陆</p>账户</div>
                </div>

            </div>
        );
    }

}
