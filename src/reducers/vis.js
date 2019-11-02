import VisActionType from '@/actions/visTypes';
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
    // data
    dataIndex: 0,
    dataNameList: ['cars.csv'],
    dataList: [cars],
    fieldsList: [carsSchema],
    // vis
    specIndex: 0,
    specHistory: [JSON.stringify(originSpec)],
    displaySpec: {},
    // history
    actionHistory: [{
        "type": "none",
        "description": "origin state",
    }],
}

export default (state = initialState, action) => {
    const newSpec = JSON.parse(state.specHistory[state.specIndex]);
    const newState = Object.assign({},state);
    const newList = newState.dataNameList.slice();
    var newSpecHistory = [];
    var newActionHistory = [];
    switch (action.type) {
        // Select Chart
        case VisActionType.OPEN_EDITOR:
            newState.dataIndex = action.dataIndex;
            newState.displaySpec = action.spec;
            if (!("encoding" in newState.displaySpec)) {
                newState.displaySpec.encoding = {}
            }
            newState.displaySpec.encoding.color = {
                "value": Color.DEEP_ORANGE
            };
            newState.specIndex = 0;
            newState.specHistory = [JSON.stringify(action.spec)];
            return newState;

        // Data
        case VisActionType.ADD_DATA:
            newList.push(action.dataName)
            newState.dataNameList = newList;
            newState.dataList.push(action.data);
            newState.fieldsList.push(action.dataSchema);
            return newState

        case VisActionType.SWITCH_DATA:
            newState.dataIndex = action.index 
            return newState

        case VisActionType.UPDATE_DATA:
            newState.dataIndex = action.index;
            const dataList = newState.dataList.slice();
            dataList[action.index] = action.data;
            newState.dataList = dataList;
            return newState

        case VisActionType.DELETE_DATA:
            newList.splice(action.index, 1)
            newState.dataNameList = newList;
            newState.dataList.splice(action.index, 1)
            newState.fieldsList.splice(action.index, 1)
            newState.dataIndex = 0
            return newState
    
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

        case VisActionType.CONFIGURE:
            // state
            newSpecHistory = newState.specHistory.slice(0,newState.specIndex+1);
            newSpec.configuration = action.configuration;
            newSpecHistory.push(JSON.stringify(newSpec));
            newState.specHistory = newSpecHistory
            // action
            newActionHistory = newState.actionHistory.slice();
            newActionHistory.push({
                "type": VisActionType.CONFIGURATION,
                "description": "change configuration",
                "detail": action.configuration,
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