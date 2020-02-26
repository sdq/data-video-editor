import React from 'react';
import ChartAnimationType from '../../ChartAnimationType';
import dataTrend from './dataTrend/animate';
import DataTrendConf from './dataTrend/configure';
import reconfigureScope from './reconfigureScope/animate';
import ReconfigureScopeConf from './reconfigureScope/configure';
import emphasizeSeries from './emphasizeSeries/animate';
import EmphasizeSeriesConf from './emphasizeSeries/configure';
import emphasizeExtreme from './emphasizeExtreme/animate';
import EmphasizeExtremeConf from './emphasizeExtreme/configure';
import emphasizeValue from './emphasizeValue/animate';
import EmphasizeValueConf from './emphasizeValue/configure';
import compareSeries from './compareSeries/animate';
import CompareSeriesConf from './compareSeries/configure';
import reconfigureStyle from './reconfigureStyle/animate';
import ReconfigureStyleConf from './reconfigureStyle/configure';

const animate = (animation, props) => {
    switch (animation.type) {

        case ChartAnimationType.TREND:
            dataTrend(animation, props);
            break;

        case ChartAnimationType.GRANULARITY_SCOPE:
            reconfigureScope(animation, props);
            break;

        case ChartAnimationType.EMPHASIZE_SERIES:
            emphasizeSeries(animation, props);
            break;

        case ChartAnimationType.EMPHASIZE_EXTREME:
            emphasizeExtreme(animation, props)
            break;

        case ChartAnimationType.EMPHASIZE_VALUE:
            emphasizeValue(animation, props)
            break;

        case ChartAnimationType.COMPARE_SERIES:
            compareSeries(animation, props)
            break;

        case ChartAnimationType.RECONFIGURE_STYLE:
            reconfigureStyle(animation, props);
            break;


        default:
            break;
    }
}

const configure = (animation, index, props) => {

    switch (animation.type) {
        case ChartAnimationType.TREND:
            return <DataTrendConf animation={animation} index={index} {...props} />

        case ChartAnimationType.GRANULARITY_SCOPE:
            return <ReconfigureScopeConf animation={animation} index={index} {...props} />

        case ChartAnimationType.EMPHASIZE_SERIES:
            return <EmphasizeSeriesConf animation={animation} index={index} {...props} />

        case ChartAnimationType.EMPHASIZE_EXTREME:
            return <EmphasizeExtremeConf animation={animation} index={index} {...props} />

        case ChartAnimationType.EMPHASIZE_VALUE:
            return <EmphasizeValueConf animation={animation} index={index} {...props} />

        case ChartAnimationType.RECONFIGURE_STYLE:
            return <ReconfigureStyleConf animation={animation} index={index} {...props} />

        case ChartAnimationType.COMPARE_SERIES:
            return <CompareSeriesConf animation={animation} index={index} {...props} />
            
        default:
            return null;
    }
}

export { animate, configure };