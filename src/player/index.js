import store from '@/store';
import * as videoActions from '@/actions/videoAction';
import * as sceneActions from '@/actions/sceneAction';
import * as playerActions from '@/actions/playerAction';
import AudioInstance from './audio';

const AudioController = new AudioInstance();

export default class Player {
    constructor() {
        if (!Player.instance) {
            this._timeouts = [];
            this._videoTimeouts = [];
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

    sceneDuration(index) {
        return store.getState().video.scenes[index].duration();
    }

    get scenePosition() {
        return store.getState().scene.position;
    }

    playScene(backgroundMusicID) {
        if (!this.isPerforming) {
            store.dispatch(playerActions.playScene(this.sceneIndex));
            this._clearTimeouts();
            const current = this.scenePosition;
            const end = this.currentSceneDuration;
            const msOffset = (end - current) * 1000;
            const playScene = true;
            AudioController.init(this.sceneIndex,current,playScene,backgroundMusicID);
            const n = Math.round(msOffset / 100) + 1; // update every 100ms
            for (let index = 0; index < n; index++) {
                this._timeouts.push(setTimeout(function () {
                    const position = current + index / 10 ;
                    store.dispatch(sceneActions.setPosition(position));
                    AudioController.playAudio(backgroundMusicID);
                    if (index === (n-1)) {
                    //播放单个场景的停止
                       console.log("tingzhi",index)
                        this.pauseScene();
                        store.dispatch(sceneActions.setPosition(0));
                    }
                }.bind(this), index * 100));
            }
        }
    }

    pauseScene() {
        this._clearTimeouts();
        store.dispatch(playerActions.stopScene(this.sceneIndex));
        AudioController.pauseAudio(this.sceneIndex); 
        //TODO：暂停后重播没有恢复播放音乐  
    }

    playVideo(backgroundMusicID) {
        store.dispatch(playerActions.playVideo());
        this._clearTimeouts();
        this._clearVideoTimeouts();
        let sceneStart = 0;

        //遍历播放scene
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
                const playScene = false;
                AudioController.init(this.sceneIndex,current,playScene);
                const n = Math.round(msOffset / 100) + 1; // update every 100ms
                for (let index = 0; index < n; index++) {
                    this._timeouts.push(setTimeout(function () {
                        const position = current + index / 10 ;
                        store.dispatch(sceneActions.setPosition(position));
                        const sceneOver = (index === n-1);
                        AudioController.playAudio(backgroundMusicID,sceneOver)
                        if (index === (n-1)) {
                            //this.pauseScene();
                            this.pauseVideo();
                            store.dispatch(sceneActions.setPosition(0));
                        }
                    }.bind(this), index * 100));
                }
            }.bind(this), sceneStart * 1000));
            sceneStart += sceneDuration; // whole time  
        }
        this._videoTimeouts.push(setTimeout(function () {
            store.dispatch(playerActions.stopVideo());
        }, sceneStart * 1000));
    }

    pauseVideo() {
        AudioController.pauseAudio(this.sceneIndex)//暂停当前场景
        AudioController.pauseAudio(0);             //暂停背景音乐
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