import React, { Component } from 'react'
import { Input, Button, message, Checkbox } from 'antd';
import config from '@/constants/ApiConfig';
import WebApi from '@/axios/api';
import './LogInView.css'

export default class LogInView extends Component {
    constructor(props) {
        super(props)
        this.emailNum = '';
        this.psw = '';
    }

    userLogIn = () => {
        if (this.emailNum === '' ) {
            message.error("请输入邮箱号码！")
            return;
        }
        if (this.psw === '') {
            message.error("请输入密码！")
            return;
        }
        //console.log("checkUser...",this.emailNum,this.psw)
        WebApi.checkUser(this.emailNum, this.psw).then(reslove => {
            //console.log("checkUser...",reslove.data)
            config.userFolderId = reslove.data.userFolderId;
            //console.log("config",reslove.data.userFolderId)
            this.props.history.push('/index')
        }, reject => {
            //console.log("WebApi...",reject)
            message.error("用户名或密码不正确！请再次输入")
            return;
        })
    }

    userRegiste = () => {
        this.props.history.push('/register')

    }

    onChange = (e) => {
        //console.log(`checked = ${e.target.checked}`);
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
                    <span className='bigTxt'>登陆</span>
                    <span>邮箱</span>
                    <Input placeholder='请输入邮箱号码' onChange={this.emailChange}></Input>
                    <span>密码</span>
                    <Input.Password placeholder='请输入密码' onChange={this.pswChange}/>
                    <Checkbox onChange={this.onChange}>记住我</Checkbox>
                    <Button type="primary" onClick={this.userLogIn}>登陆</Button>
                </div>
                <div className='smallTxt'>
                    <div>忘记密码</div>
                    <p className='line'></p>
                    <div onClick={this.userRegiste}>创建账户</div>
                </div>
            </div>
        );
    }
}