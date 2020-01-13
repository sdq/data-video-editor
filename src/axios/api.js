import axios from '@/axios'
//import { message } from 'antd';
import config from '@/constants/ApiConfig';
import qs from 'qs';

var composeUrl = (url, param) => {
    let result = url;
    param = {
        apikey: config.apikey,
        ...param,
    };
    if (typeof param === 'object' && Object.keys(param).length !== 0) {
        result += `?${qs.stringify(param)}`;
    }
    return result;
}
var composeUrl1 = (url, param) => {
    let result = url;
    param = {
        ...param,
    };
    if (typeof param === 'object' && Object.keys(param).length !== 0) {
        result += `?${qs.stringify(param)}`;
    }
    return result;
}
var request = ({ url, method, param, data }) => {
    //console.log("request...",data)
    return new Promise((reslove, reject) => {
        axios({
            method: method,
            url: composeUrl(url, param),
            data: data
        }).then((response) => {
            if (response.status === 200) {
                reslove(response.data);
            } else {
                reject();
                // message.error('error message');
            }
        }).catch(error => {
            reject();
            //  message.error('error message');
        })
    })
};

var requestWithOutApiKey = ({ url, method, param, data }) => {
    //console.log("request...",data)
    return new Promise((reslove, reject) => {
        axios({
            method: method,
            //不带api-key
            url: composeUrl1(url, param),
            data: data
        }).then((response) => {
            //console.log("requestWithOutApiKey",response)
            if (response.status === 200) {
                reslove(response.data);
            } else {
                reject();
                // message.error('error message');
            }
        }).catch(error => {
            reject();
            // message.error('error message');
        })
    })
};

var WebApi = {
    checkUser: function (name, psw) {
        return requestWithOutApiKey({
            url: '/login',
            method: 'post',
            data: {
                phone: name,
                password: psw
            }
        })
    },
    registerUser: function (name, psw, userFolderId) {
        return requestWithOutApiKey({
            url: '/register',
            method: 'post',
            data: {
                phone: name,
                password: psw,
                userFolderId: userFolderId,
            }
        })
    },
    CreatNewFolder: function (name, parentId) {
        return request({
            url: config.api.asset,
            method: 'post',
            data: {
                "parentId": parentId,
                "type": "folder",
                "filename": name,
            }
        });
    },
    UpdateExistingFolder: function (folderId, newName) {
        let parentId = 4962
        return request({
            url: config.api.asset,
            method: 'post',
            data: {
                "parentId": parentId,
                "id": folderId,
                "type": "folder",
                "filename": newName,
            }
        });
    },
    DeleteFolder(id) {
        return request({
            url: `${config.api.asset}/id/${id}`,
            method: 'delete',
        })
    },
    DeleteAsset(id) {
        return request({
            url: `${config.api.asset}/id/${id}`,
            method: 'delete',
        })
    },
    GetAssetsInExistingFolder(parentId, assetType) {
        return request({
            url: config.api.assetList,
            method: 'get',
            param: {
                q: `[{"parentId":${parentId}},{"type":"${assetType}"}]`
            }
        });
    },
    GetAsset(id) {
        return request({
            url: `${config.api.asset}/id/${id}`,
            method: 'get',
            param: {
                light: true
            },
        })
    },
    //获取base64图片数据,用本地内存中的url进行gif-frame解析。解决线上跨域问题
    GetGIFAsset(id) {
        return request({
            url: `${config.api.asset}/id/${id}`,
            method: 'get',
            param: {
                //light: true  //返回base64格式图片数据
            },
        }).then(data => {
            //let base64File = "data:image/jpeg;base64," + data.data;
            //console.log("GetGIFAsset",data.data.data)
            let bstr = atob(data.data.data);
            let n = bstr.length;
            let u8arr = new Uint8Array(n);
            while (n--) {
                u8arr[n] = bstr.charCodeAt(n);
            }
            let blobfile = new Blob([u8arr], { type: 'image/gif' })
            let fileURL = URL.createObjectURL(blobfile)
            return fileURL;
        })
    },
    CreatNewAsset(folderId, filetype, filname, data) {
        //console.log("creatNewAsset", filetype, filname, data)
        return request({
            url: config.api.asset,
            method: 'put',
            data: {
                "data": data,
                //parentId 是文件夹
                "parentId": folderId,
                "type": filetype,
                "filename": filname,
            }
        })

    },
    SearchAssets(parentId, value, assetType) {
        return request({
            url: config.api.assetList,
            method: 'get',
            param: {
                q: `[{"parentId":${parentId}},{"type":"${assetType}"},{"filename" : {"$like" : "%${value}%"}}]`
            }
        });
    }
};

export default WebApi;