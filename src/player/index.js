import store from '@/store';
import * as sceneActions from '@/actions/sceneAction';
import * as playerActions from '@/actions/playerAction';

export default class Player {
    constructor() {
        if (!Player.instance) {
            this._timeouts = [];
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

    get currentSceneDuration() {
        return store.getState().video.scenes[this.sceneIndex].duration();
    }

    get scenePosition() {
        return store.getState().scene.position;
    }

    playScene() {
        if (!this.isPerforming) {
            store.dispatch(playerActions.playScene(this.sceneIndex));
            const current = this.scenePosition;
            const end = this.currentSceneDuration;
            const msOffset = (end - current) * 1000;
            const n = Math.round(msOffset / 100) + 1; // update every 100ms
            for (let index = 0; index < n; index++) {
                this._timeouts.push(setTimeout(function () {
                    const position = current + index / 10 ;
                    store.dispatch(sceneActions.setPosition(position));
                    if (index === (n-1)) {
                        this.pauseScene();
                        store.dispatch(sceneActions.setPosition(position));
                    }
                }.bind(this), index * 100));
            }
        }
    }

    pauseScene() {
        this._clearTimeouts();
        store.dispatch(playerActions.stopScene(this.sceneIndex));
    }

    _clearTimeouts() {
        for (var i = 0; i < this._timeouts.length; i++) {
            clearTimeout(this._timeouts[i]);
        }
    }

}