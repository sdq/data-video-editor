import axios from '@/axios'
import { message } from 'antd';
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

var request = ({ url, method, param, data }) => {
    //console.log("request...",data)
    return new Promise((reslove,reject) => {
        axios({
            method: method,
            url: composeUrl(url, param),
            data: data
        }).then((response) => {
            if (response.status === 200) {
                reslove(response.data);
            } else {
                reject();
                message.error('error message');
            }
        }).catch(error => {
            reject();
            message.error('error message');
        })
    })
};
var WebApi = {
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
    SearchAssets(parentId,value,assetType){
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