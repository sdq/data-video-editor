console.log('WORKER TASK: ', 'running');

var _timeouts = [];
var _videoTimeouts = [];

const _clearTimeouts = function() {
    for (var i = 0; i < _timeouts.length; i++) {
        clearTimeout(_timeouts[i]);
    }
}

const _clearVideoTimeouts = function() {
    for (var i = 0; i < _videoTimeouts.length; i++) {
        clearTimeout(_videoTimeouts[i]);
    }
}

const _startTimeouts = function(duration, position, index, n) {
    _timeouts.push(setTimeout(function () {
        postMessage({
            status: 'scene',
            position: position,
            index: index,
            n: n,
        });
    }, duration))

    // _clearTimeouts();
    // _clearVideoTimeouts();
    // let sceneStart = 0;

    // for (let index = 0; index < this.scenesCount; index++) { //TODO:
    //     const sceneDuration = this.sceneDuration(index); //TODO:
    //     _videoTimeouts.push(setTimeout(function () {
    //         store.dispatch(videoActions.selectScene(index));//TODO:
    //         store.dispatch(sceneActions.setPosition(0));//TODO:
    //         // play scene
    //         _clearTimeouts();
    //         const current = this.scenePosition;//TODO:
    //         const end = this.currentSceneDuration;//TODO:
    //         const msOffset = (end - current) * 1000;
    //         AudioController.init(this.sceneIndex,current);//TODO:
    //         const n = Math.round(msOffset / 100) + 1; // update every 100ms
    //         for (let index = 0; index < n; index++) {
    //             _timeouts.push(setTimeout(function () {
    //                 const position = current + index / 10 ;
    //                 store.dispatch(sceneActions.setPosition(position));//TODO:
    //                 AudioController.playAudio()//TODO:
    //                 if (index === (n-1)) {
    //                     this.pauseScene();//TODO:
    //                     store.dispatch(sceneActions.setPosition(0));//TODO:
    //                 }
    //             }.bind(this), index * 100));
    //         }
    //     }.bind(this), sceneStart * 1000));
    //     sceneStart += sceneDuration;
    // }
    // _videoTimeouts.push(setTimeout(function () {
    //     store.dispatch(playerActions.stopVideo()); //TODO:
    // }, sceneStart * 1000));
}
// 监听事件
onmessage = function (e) {
    //console.log('WORKER TASK: ', 'RECEIVE', e.data);
    // 发送数据事件
    if (e.data.status === 'start') {
        _startTimeouts(e.data.duration, e.data.position, e.data.index, e.data.n)
    } else {
        _clearTimeouts()
        _clearVideoTimeouts()
    }
}

// export function expensive(time) {
//     let start = Date.now(),
//         count = 0
//     while (Date.now() - start < time) count++
//     return count
// }