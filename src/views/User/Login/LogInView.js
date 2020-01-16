import React, { Component } from 'react'
import { Input, Button, message, Checkbox } from 'antd';
import config from '@/constants/ApiConfig';
import WebApi from '@/axios/api';
import regex from '@/utils/regex';
import './LogInView.css'

export default class LogInView extends Component {
    constructor(props) {
        super(props)
        this.state = {
            // emailNum: 'm13676059895@163.com',
            // psw: '123456',
            emailNum:'',
            psw:''
        }
    }

    userLogIn = () => {
        regex.checkEmail(this.state.emailNum).then(regex.checkPassword(this.state.psw)).then(() => {
            //检验邮箱与密码格式正确后，检验用户名与密码
            WebApi.checkUser(this.state.emailNum, this.state.psw).then(reslove => {
                config.userFolderId = reslove.data.userFolderId;
                this.props.updateUserFolder(reslove.data.userFolderId);
                this.props.updateUserInfo({
                    emailNum: this.state.emailNum
                })
                this.props.history.push({
                    pathname: '/index',
                })
            }, () => {
                message.error("Unable to log you in. Please double check your email address and password, then try again");
                // this.setState({
                //     emailNum: '',
                //     psw: ""
                // })
                return;
            })
        })
    }

    userRegiste = () => {
        this.props.history.push('/register')

    }

    onChange = (e) => {
        //console.log(`checked = ${e.target.checked}`);
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
                    <span className='bigTxt'>Sign In</span>
                    <span>Email</span>
                    <Input value={emailNum} placeholder='Email' onChange={this.emailChange}></Input>
                    <span>Password</span>
                    <Input.Password value={psw} placeholder='Password' onChange={this.pswChange} />
                    <Checkbox onChange={this.onChange}>Remember me</Checkbox>
                    <Button type="primary" onClick={this.userLogIn}>SIGN IN</Button>
                </div>
                <div className='LoginsmallTxt'>
                    <p>FORGOT PASSWORD</p>
                    <p className='line'></p>
                    <p onClick={this.userRegiste}>CREATE AN ACCOUNT</p>
                </div>
            </div>
        );
    }
}