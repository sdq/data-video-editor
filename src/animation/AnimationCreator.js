import AnimationType from './AnimationType';
import Animation from './Animation';

// Use Factory Pattern for Animations
export default class AnimationCreator {
    constructor(node ) {
        this._node = node;
    }
    fromModel(model) {
        switch (model.type()) {
            // Presentation
            case AnimationType.PRESENTATION_FADEIN:
                return new Animation.FadeIn(model.start(), model.duration(), this._node)
            case AnimationType.PRESENTATION_FADEOUT:
                return new Animation.FadeOut(model.start(), model.duration(), this._node)
            case AnimationType.PRESENTATION_ZOOMIN:
                return new Animation.ZoomIn(model.start(), model.duration(), this._node)
            case AnimationType.PRESENTATION_ZOOMOUT:
                return new Animation.ZoomOut(model.start(), model.duration(), this._node)
            case AnimationType.PRESENTATION_FLYIN:
                return new Animation.FlyIn(model.start(), model.duration(), this._node)
            case AnimationType.PRESENTATION_FLYOUT:
                return new Animation.FlyOut(model.start(), model.duration(), this._node)  
            case AnimationType.PRESENTATION_ZOOM:
                return new Animation.Zoom(model.start(), model.duration(), this._node)    

            // Interpretation
            case AnimationType.INTERPRETATION_FLICKER:
                return new Animation.Flicker(model.start(), model.duration(), this._node)
            case AnimationType.INTERPRETATION_PATH:// what type? 为什么info 不能放在node前面？？
                return new Animation.Path(model.start(), model.duration(),  this._node, model.pathinfo())
            default:
                break;
        }
    }
}