import { combineReducers } from 'redux';
import ui from './ui';
import timeline from './timeline';
import canvas from './canvas';
import player from './player';
import vis from './vis';
import scene from './scene';
export default combineReducers({
    ui,
    timeline,
    scene,
    canvas,
    player,
    vis,
});