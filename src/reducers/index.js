import { combineReducers } from 'redux';
import ui from './ui';
import video from './video';
import canvas from './canvas';
import player from './player';
import vis from './vis';
import scene from './scene';
import user from './user';

export default combineReducers({
    ui,
    video,
    scene,
    canvas,
    player,
    vis,
    user,
});