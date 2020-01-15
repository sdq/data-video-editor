var fileChange = {
    //Blob转为base64
    //chart录制成的视频数据转成base64格式（pimcore上传）
    blobToDataURL(blob, callback) {
        let a = new FileReader();
        a.onload = function (e) { callback(e.target.result); }
        a.readAsDataURL(blob);
    }


}
export default fileChange;
