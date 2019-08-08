import { combineReducers } from 'redux';
import ui from './ui';
import timeline from './timeline';
import canvas from './canvas';
export default combineReducers({
    ui,
    timeline,
    canvas,
});