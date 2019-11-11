import grow from './grow';
import emphasize from './emphasize';

const animate = (animation) => {

    switch (animation.type) {
        case 'grow':
            grow()
            break;

        case 'emphasize':
            emphasize()
            break;
    
        default:
            break;
    }
}

export default grow;

export {grow, emphasize, animate};