import React from 'react';
import ChartAnimationType from '../../ChartAnimationType';
import dataTrend from './dataTrend/animate';
import DataTrendConf from './dataTrend/configure';
import emphasizeCategory from './emphasizeCategory/animate';
import EmphasizeCategoryConf from './emphasizeCategory/configure';
import compareCategories from './compareCategories/animate';
import CompareCategoriesConf from './compareCategories/configure';
import reconfigureOrder from './reconfigureOrder/animate';
import ReconfigureOrderConf from './reconfigureOrder/configure';

const animate = (animation, props) => {

    switch (animation.type) {
        case ChartAnimationType.DATA_TREND:
            dataTrend(animation, props)
            break;

        case ChartAnimationType.EMPHASIZE_CATEGORY:
            emphasizeCategory(animation, props)
            break;

        case ChartAnimationType.COMPARE_CATEGORIES:
            compareCategories(animation, props)
            break;

        case ChartAnimationType.RECONFIGURE_ORDER:
            reconfigureOrder(animation, props)
            break;
    
        default:
            break;
    }
}

const configure = (animation, index, props) => {

    switch (animation.type) {
        case ChartAnimationType.DATA_TREND:
            return <DataTrendConf animation={animation} index={index} {...props}/>

        case ChartAnimationType.EMPHASIZE_CATEGORY:
            return <EmphasizeCategoryConf animation={animation} index={index} {...props}/>

        case ChartAnimationType.COMPARE_CATEGORIES:
            return <CompareCategoriesConf animation={animation} index={index} {...props}/>

        case ChartAnimationType.RECONFIGURE_ORDER:
            return <ReconfigureOrderConf animation={animation} index={index} {...props}/>
    
        default:
            return null;
    }
}

export {animate, configure};