import { message } from 'antd';

var regex = {
    checkEmail(mail) {
        return new Promise((reslove, reject) => {
            if (mail === '') {
                message.error("Email address is required!")
                reject();
            }
            let filter = /^([a-zA-Z0-9_-])+@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
            if (filter.test(mail)) {
                reslove();
            } else {
                message.error("Please enter a valid email address!")
                reject();
            }
        })
    },
    checkPassword(password) {
        return new Promise((reslove, reject) => {
            if (password === '') {
                message.error("Password is required!")
                reject();
            } else {
                reslove();
            }

        })
    }

}

export default regex;