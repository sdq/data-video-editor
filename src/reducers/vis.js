import * as VisActionType from '../constants/VisActionType';

const originSpec = {
    "mark": "point",
    "encoding": {}
}

const initialState = {
    specIndex: 0,
    specHistory: [JSON.stringify(originSpec)],
    actionHistory: [{
        "type": "none",
        "description": "origin state",
    }],
}

export default (state = initialState, action) => {
    const newSpec = JSON.parse(state.specHistory[state.specIndex]);
    const newState = Object.assign({},state);
    var newSpecHistory = [];
    var newActionHistory = [];
    switch (action.type) {
    
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
            if (action.type === ActionType.ENCODING) {
                newActionHistory.push({
                    "type": ActionType.ENCODING,
                    "channel": action.channel,
                    "field": action.field,
                    "description": "add field "+action.channel,
                });
            } else {
                newActionHistory.push({
                    "type": ActionType.MODIFY_ENCODING,
                    "channel": action.channel,
                    "field": action.field,
                    "description": "modify field "+action.channel,
                });
            }
            newState.actionHistory = newActionHistory;
            newState.specIndex ++;
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
                "type": ActionType.REMOVE_ENCODING,
                "channel": action.channel,
                "field": action.field,
                "description": "remove field "+action.channel,
            });
            newState.actionHistory = newActionHistory;
            newState.specIndex ++;
            return newState
        
        // Meta

        default:
            return state
        }
}