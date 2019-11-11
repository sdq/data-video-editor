import grow from './grow';
import emphasize from './emphasize';

const animate = (animation, props) => {

    switch (animation.type) {
        case 'grow':
            grow(props)
            break;

        case 'emphasize':
            emphasize(props)
            break;
    
        default:
            break;
    }
}

export default animate;