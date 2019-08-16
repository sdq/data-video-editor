import VisActionType from '../constants/VisActionType';
import ActionType from '../constants/ActionType';
import cars from '@/datasets/cars';
import carsSchema from '@/datasets/carsSchema';
import Color from '@/constants/Color';

const originSpec = {
    "mark": "line",
    "encoding": {
        "color": {
            "value": Color.ORANGE
        }
    }
}

const initialState = {
    dataIndex: 0,
    dataList: [cars],
    fieldsList: [carsSchema],
    specIndex: 0,
    specHistory: [JSON.stringify(originSpec)],
    actionHistory: [{
        "type": "none",
        "description": "origin state",
    }],
    displaySpec: {},
}

export default (state = initialState, action) => {
    const newSpec = JSON.parse(state.specHistory[state.specIndex]);
    const newState = Object.assign({},state);
    var newSpecHistory = [];
    var newActionHistory = [];
    switch (action.type) {
        // Select Chart
        case VisActionType.OPEN_EDITOR:
            console.log("open editor!");
            newState.dataIndex = action.dataIndex;
            newState.displaySpec = action.spec;
            console.log(newState);
            return newState;
    
        // Vis
        case VisActionType.ENCODING:
        case VisActionType.MODIFY_ENCODING:
            // state
            newSpecHistory = newState.specHistory.slice(0,newState.specIndex+1);
            //console.log(newSpecHistory);
            if (action.channel in newSpec["encoding"]) {
                newSpec["encoding"][action.channel]["field"] = action.field.name;
                newSpec["encoding"][action.channel]["type"] = action.field.type;
            }
            else {
                newSpec["encoding"][action.channel] = {};
                newSpec["encoding"][action.channel]["field"] = action.field.name;
                newSpec["encoding"][action.channel]["type"] = action.field.type;
            };
            newSpecHistory.push(JSON.stringify(newSpec));
            newState.specHistory = newSpecHistory
            // action
            newActionHistory = newState.actionHistory.slice();
            if (action.type === VisActionType.ENCODING) {
                newActionHistory.push({
                    "type": VisActionType.ENCODING,
                    "channel": action.channel,
                    "field": action.field,
                    "description": "add field "+action.channel,
                });
            } else {
                newActionHistory.push({
                    "type": VisActionType.MODIFY_ENCODING,
                    "channel": action.channel,
                    "field": action.field,
                    "description": "modify field "+action.channel,
                });
            }
            newState.actionHistory = newActionHistory;
            newState.specIndex ++;
            newState.displaySpec = newSpec;
            return newState

        case VisActionType.REMOVE_ENCODING:
            // state
            newSpecHistory = newState.specHistory.slice(0,newState.specIndex+1);
            //console.log(newSpecHistory);
            if (action.channel in newSpec["encoding"]) {
                delete newSpec["encoding"][action.channel].field;
                delete newSpec["encoding"][action.channel].type;
            }
            newSpecHistory.push(JSON.stringify(newSpec));
            newState.specHistory = newSpecHistory
            // action
            newActionHistory = newState.actionHistory.slice();
            newActionHistory.push({
                "type": VisActionType.REMOVE_ENCODING,
                "channel": action.channel,
                "field": action.field,
                "description": "remove field "+action.channel,
            });
            newState.actionHistory = newActionHistory;
            newState.specIndex ++;
            newState.displaySpec = newSpec;
            return newState
        
        // Meta

        default:
            return state
        }
}