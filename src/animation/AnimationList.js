import AnimationType from './AnimationType';
import AnimationModel from './AnimationModel';

const PresentationAnimations = [
    new AnimationModel(AnimationType.PRESENTATION_FADEIN, 'Fade in'),
    new AnimationModel(AnimationType.PRESENTATION_FADEOUT, 'Fade out'),
    new AnimationModel(AnimationType.PRESENTATION_ZOOMIN, 'Zoom in'),
    new AnimationModel(AnimationType.PRESENTATION_ZOOMOUT, 'Zoom out'),
    // new AnimationModel(AnimationType.PRESENTATION_FADE, 'Fade'),
    // new AnimationModel(AnimationType.PRESENTATION_ZOOM, 'Zoom'),
    // new AnimationModel(AnimationType.PRESENTATION_APPEAR, 'Appear'),
    new AnimationModel(AnimationType.PRESENTATION_FLYIN, 'Fly in'),
    new AnimationModel(AnimationType.PRESENTATION_FLYOUT, 'Fly out'),
    // new AnimationModel(AnimationType.PRESENTATION_FADEIN, 'Fade in'),
]

const InterpretationAnimations = [
    new AnimationModel(AnimationType.INTERPRETATION_FLICKER, 'Flicker'),
]

const ReasoningAnimations = [
    // new AnimationModel(AnimationType.REASONING_HIGHLIGHT, 'Hightlight'),
    // new AnimationModel(AnimationType.REASONING_FILLCOLOR, 'Fill color'),
]

export default {
    presentation: PresentationAnimations,
    interpretation: InterpretationAnimations,
    reasoning: ReasoningAnimations,
}