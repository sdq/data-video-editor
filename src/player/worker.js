console.log('WORKER TASK: ', 'running');
// 监听事件
onmessage = function (e) {
    console.log('WORKER TASK: ', 'RECEIVE', e.data);
    // 发送数据事件
    postMessage('Hello, I am Worker');
}

// export function expensive(time) {
//     let start = Date.now(),
//         count = 0
//     while (Date.now() - start < time) count++
//     return count
// }