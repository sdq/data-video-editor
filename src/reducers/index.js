import { combineReducers } from 'redux';
import ui from './ui';
import timeline from './timeline';
import canvas from './canvas';
import player from './player';
export default combineReducers({
    ui,
    timeline,
    canvas,
    player,
});