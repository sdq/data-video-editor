import React, { Component } from 'react'
import { Input, Button, message, Checkbox } from 'antd';
import config from '@/constants/ApiConfig';
import WebApi from '@/axios/api';
import regex from '@/utils/regex';
import './RegisteView.css'

export default class RegisteView extends Component {
    constructor(props) {
        super(props)
        this.state = {
            emailNum: '',
            psw: '',
        }
    }

    userLogIn = () => {
        this.props.history.push('/')
    }
    userRegister = () => {
        regex.checkEmail(this.state.emailNum).then(regex.checkPassword(this.state.psw)).then(() => {
            let parentId = config.rootFolderId;
            let folderName = 'user_' + this.state.emailNum;
            //创建与用户关联的文件夹
            WebApi.CreatNewFolder(folderName, parentId).then(reslove => {
                this.register(reslove).then(() => {
                    this.props.history.push('/index')
                })
            }, () => {
                message.error("This account already exists")
            })
        })
    }
    //注册用户
    register = (data) => {
        let userFolderId = data.data.id;
        return WebApi.registerUser(this.state.emailNum, this.state.psw, userFolderId).then(() => {
            config.userFolderId = userFolderId;
            this.props.history.push('/index')
        }, () => {
            message.error("Register failed! Please try again")
            return;
        })
    }

    onChange = (e) => {
        console.log(`checked = ${e.target.checked}`);
    }
    emailChange = (e) => {
        this.setState({
            emailNum: e.target.value
        })
    }
    pswChange = (e) => {
        this.setState({
            psw: e.target.value
        })
    }
    render() {
        const { emailNum, psw } = this.state;
        return (
            <div className='loginWrapper'>
                <div className='logo'></div>
                <div className='leftRectangle'></div>
                <div className='rightRectangle'></div>
                <div className='formWrapper'>
                    <span className='bigTxt'>Create your  Account</span>
                    <span>Email</span>
                    <Input value={emailNum} placeholder='Email' onChange={this.emailChange}></Input>
                    <span>Password</span>
                    <Input.Password value={psw} placeholder='Password' onChange={this.pswChange} />
                    <Checkbox onChange={this.onChange}>Remember me</Checkbox>
                    <Button type="primary" onClick={this.userRegister}>CREATE MY ACCOUNT</Button>
                </div>
                <div className='smallTxt'>
                    <div>ALREADY HAVE AN ACCOUNT ?<p className='loginTxt' onClick={this.userLogIn} >SIGN IN</p></div>
                </div>

            </div>
        );
    }

}
