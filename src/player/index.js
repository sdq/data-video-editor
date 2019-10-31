import store from '@/store';
import * as videoActions from '@/actions/videoAction';
import * as sceneActions from '@/actions/sceneAction';
import * as playerActions from '@/actions/playerAction';
import worker from 'workerize-loader!./worker';// eslint-disable-line import/no-webpack-loader-syntax
import AudioInstance from './audio';
const AudioController = new AudioInstance();

export default class Player {
    constructor() {
        if (!Player.instance) {
            this._timeouts = [];
            this._videoTimeouts = [];
            this._worker = worker()  // `new` is optional
            this._worker.addEventListener('message', function (e) {
                //console.log('MAIN: ', 'RECEIVE', e.data);
                let {position, index, n} = e.data;
                if (e.data.status === 'scene') {
                    this.setPositionInScene(position, index, n);
                }
            }.bind(this));
            //this._worker.postMessage('Hello Worker, I am main.js');
            Player.instance = this;
        } else {
            return Player.instance;
        }
    }

    get isPerforming() {
        return store.getState().player.isPerforming;
    }

    get sceneIndex() {
        return store.getState().video.index;
    }

    get scenesCount() {
        return store.getState().video.scenes.length;
    }

    get currentSceneDuration() {
        return this.sceneDuration(this.sceneIndex);
    }

    get sceneDurations() {
        return store.getState().video.scenes.map(x => x.duration());
    }

    sceneDuration(index) {
        return store.getState().video.scenes[index].duration();
    }

    get scenePosition() {
        return store.getState().scene.position;
    }

    playScene() {
        if (!this.isPerforming) {
            store.dispatch(playerActions.playScene(this.sceneIndex));
            //this._clearTimeouts();
            this._worker.postMessage({
                status: 'end',
            });
            const current = this.scenePosition;
            const end = this.currentSceneDuration;
            const msOffset = (end - current) * 1000;
            AudioController.init(this.sceneIndex,current);
            const n = Math.round(msOffset / 100) + 1; // update every 100ms
            for (let index = 0; index < n; index++) {
                this._worker.postMessage({
                    status: 'start',
                    duration: index * 100,
                    position: current + index / 10,
                    index: index,
                    n: n,
                });
                // this._timeouts.push(setTimeout(function () {
                //     const position = current + index / 10 ;
                //     store.dispatch(sceneActions.setPosition(position));
                //     AudioController.playAudio();
                //     if (index === (n-1)) {
                //         this.pauseScene();
                //         store.dispatch(sceneActions.setPosition(0));
                //     }
                // }.bind(this), index * 100));
            }
        }
    }

    setPositionInScene(position, index, n) {
        store.dispatch(sceneActions.setPosition(position));
        AudioController.playAudio();
        if (index === (n-1)) {
            this.pauseScene();
            store.dispatch(sceneActions.setPosition(0));
        }
    }

    pauseScene() {
        //this._clearTimeouts();
        this._worker.postMessage({
            status: 'end',
        });
        store.dispatch(playerActions.stopScene(this.sceneIndex));
        AudioController.pauseAudio(this.sceneIndex)       
    }

    playVideo() {
        store.dispatch(playerActions.playVideo());
        this._clearTimeouts();
        this._clearVideoTimeouts();
        let sceneStart = 0;

        for (let index = 0; index < this.scenesCount; index++) {
            const sceneDuration = this.sceneDuration(index);
            this._videoTimeouts.push(setTimeout(function () {
                store.dispatch(videoActions.selectScene(index));
                store.dispatch(sceneActions.setPosition(0));
                // play scene
                this._clearTimeouts();
                const current = this.scenePosition;
                const end = this.currentSceneDuration;
                const msOffset = (end - current) * 1000;
                AudioController.init(this.sceneIndex,current);
                const n = Math.round(msOffset / 100) + 1; // update every 100ms
                for (let index = 0; index < n; index++) {
                    this._timeouts.push(setTimeout(function () {
                        const position = current + index / 10 ;
                        store.dispatch(sceneActions.setPosition(position));
                        AudioController.playAudio()
                        if (index === (n-1)) {
                            this.pauseScene();
                            store.dispatch(sceneActions.setPosition(0));
                        }
                    }.bind(this), index * 100));
                }
            }.bind(this), sceneStart * 1000));
            sceneStart += sceneDuration;
        }
        this._videoTimeouts.push(setTimeout(function () {
            store.dispatch(playerActions.stopVideo());
        }, sceneStart * 1000));
    }

    pauseVideo() {
        this._worker.postMessage('end');
        this._clearTimeouts();
        this._clearVideoTimeouts();
        store.dispatch(playerActions.stopVideo());
    }

    _clearTimeouts() {
        for (var i = 0; i < this._timeouts.length; i++) {
            clearTimeout(this._timeouts[i]);
        }
    }

    _clearVideoTimeouts() {
        for (var i = 0; i < this._videoTimeouts.length; i++) {
            clearTimeout(this._videoTimeouts[i]);
        }
    }

}