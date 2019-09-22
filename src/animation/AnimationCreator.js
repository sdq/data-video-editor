import AnimationType from './AnimationType';
import Animation from './Animation';

// Use Factory Pattern for Animations
export default class AnimationCreator {
    constructor(node) {
        this._node = node;
    }
    fromModel(model) {
        switch (model.type()) {
            case AnimationType.PRESENTATION_FADE:
                return new Animation.Fade(model.start(), model.duration(), this._node)
            case AnimationType.PRESENTATION_ZOOM:
                return new Animation.Zoom(model.start(), model.duration(), this._node)    
            default:
                break;
        }
    }
}