import AnimationType from './AnimationType';
import AnimationModel from './AnimationModel';

let pathinfo="";//init path info

const all = [
    new AnimationModel(AnimationType.INTERPRETATION_PATH, 'Path', pathinfo),
    new AnimationModel(AnimationType.INTERPRETATION_FLICKER, 'Flicker'),
    new AnimationModel(AnimationType.PRESENTATION_FADEIN, 'Fade in'),
    new AnimationModel(AnimationType.PRESENTATION_FADEOUT, 'Fade out'),
    new AnimationModel(AnimationType.PRESENTATION_ZOOMIN, 'Zoom in'),
    new AnimationModel(AnimationType.PRESENTATION_ZOOMOUT, 'Zoom out'),
    new AnimationModel(AnimationType.PRESENTATION_FLYIN, 'Fly in'),
    new AnimationModel(AnimationType.PRESENTATION_FLYOUT, 'Fly out'),
]

const PresentationAnimations = [
    new AnimationModel(AnimationType.PRESENTATION_FADEIN, 'Fade in'),
    new AnimationModel(AnimationType.PRESENTATION_FADEOUT, 'Fade out'),
    new AnimationModel(AnimationType.PRESENTATION_ZOOMIN, 'Zoom in'),
    new AnimationModel(AnimationType.PRESENTATION_ZOOMOUT, 'Zoom out'),
    new AnimationModel(AnimationType.PRESENTATION_FLYIN, 'Fly in'),
    new AnimationModel(AnimationType.PRESENTATION_FLYOUT, 'Fly out'),
]

const InterpretationAnimations = [
    new AnimationModel(AnimationType.INTERPRETATION_FLICKER, 'Flicker'),
    new AnimationModel(AnimationType.INTERPRETATION_PATH, 'Path', pathinfo),
]

const ReasoningAnimations = [
    // new AnimationModel(AnimationType.REASONING_HIGHLIGHT, 'Hightlight'),
    // new AnimationModel(AnimationType.REASONING_FILLCOLOR, 'Fill color'),
]

export default {
    all: all,
    presentation: PresentationAnimations,
    interpretation: InterpretationAnimations,
    reasoning: ReasoningAnimations,
}