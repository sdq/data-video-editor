import { combineReducers } from 'redux';
import ui from './ui';
import timeline from './timeline';
export default combineReducers({
    ui,
    timeline,
});