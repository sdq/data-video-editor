import React from 'react';
import ChartAnimationType from '../../ChartAnimationType';
import dataTrend from './dataTrend/animate';
import DataTrendConf from './dataTrend/configure';
import emphasizeExtreme from './emphasizeExtreme/animate';
import EmphasizeExtremeConf from './emphasizeExtreme/configure';
import emphasizeValue from './emphasizeValue/animate';
import EmphasizeValueConf from './emphasizeValue/configure';
import compareExtremes from './compareExtremes/animate';
import CompareExtremesConf from './compareExtremes/configure';
import compareValues from './compareValues/animate';
import CompareValuesConf from './compareValues/configure';
import reconfigureOrder from './reconfigureOrder/animate';
import ReconfigureOrderConf from './reconfigureOrder/configure';

const animate = (animation, props) => {

    switch (animation.type) {
        case ChartAnimationType.TREND:
            dataTrend(animation, props);
            break;

        case ChartAnimationType.EMPHASIZE_EXTREME:
            emphasizeExtreme(animation, props);
            break;

        case ChartAnimationType.EMPHASIZE_VALUE:
            emphasizeValue(animation, props);
            break;

        case ChartAnimationType.COMPARE_EXTREMES:
            compareExtremes(animation, props);
            break;

        case ChartAnimationType.COMPARE_VALUES:
            compareValues(animation, props);
            break;

        case ChartAnimationType.RECONFIGURE_ORDER:
            reconfigureOrder(animation, props);
            break;

        default:
            break;
    }
}

const configure = (animation, index, props) => {

    switch (animation.type) {
        case ChartAnimationType.TREND:
            return <DataTrendConf animation={animation} index={index} {...props} />
    
        case ChartAnimationType.EMPHASIZE_EXTREME:
            return <EmphasizeExtremeConf animation={animation} index={index} {...props} />

        case ChartAnimationType.EMPHASIZE_VALUE:
            return <EmphasizeValueConf animation={animation} index={index} {...props} />

        case ChartAnimationType.COMPARE_EXTREMES:
            return <CompareExtremesConf animation={animation} index={index} {...props} />

        case ChartAnimationType.COMPARE_VALUES:
            return <CompareValuesConf animation={animation} index={index} {...props} />

        case ChartAnimationType.RECONFIGURE_ORDER:
            return <ReconfigureOrderConf animation={animation} index={index} {...props} />
    

        default:
            return null;
    }
}

export {animate, configure};