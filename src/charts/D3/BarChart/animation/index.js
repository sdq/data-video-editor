import React from 'react';
import grow from './grow/animate';
import GrowConf from './grow/configure';
import emphasize from './emphasize/animate';
import EmphasizeConf from './emphasize/configure';
import sort from './sort/animate';
import SortConf from './sort/configure';

const animate = (animation, props) => {

    switch (animation.type) {
        case 'grow':
            grow(props)
            break;

        case 'emphasize':
            emphasize(props)
            break;

        case 'sort':
            sort(props)
            break;
    
        default:
            break;
    }
}

const configure = (animation, props) => {

    switch (animation.type) {
        case 'grow':
            return <GrowConf {...props}/>

        case 'emphasize':
            return <EmphasizeConf {...props}/>

        case 'sort':
            return <SortConf {...props}/>
    
        default:
            return null;
    }
}

export {animate, configure};