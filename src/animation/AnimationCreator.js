import AnimationType from './AnimationType';
import Fade from './Fade';
import Zoom from './Zoom';

// Use Factory Pattern for Animation
export default class AnimationCreator {
    constructor(node) {
        this._node = node;
    }
    fromModel(model) {
        switch (model.type()) {
            case AnimationType.PRESENTATION_FADE:
                return new Fade(model.start(), model.duration(), this._node)
            case AnimationType.PRESENTATION_ZOOM:
                return new Zoom(model.start(), model.duration(), this._node)    
            default:
                break;
        }
    }
}