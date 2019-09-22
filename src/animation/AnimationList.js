import AnimationType from './AnimationType';
import AnimationModel from './AnimationModel';

const PresentationAnimations = [
    new AnimationModel(AnimationType.PRESENTATION_FADE, 'Fade'),
    new AnimationModel(AnimationType.PRESENTATION_ZOOM, 'Zoom'),
    // new AnimationModel(AnimationType.PRESENTATION_APPEAR, 'Appear'),
    // new AnimationModel(AnimationType.PRESENTATION_FLYIN, 'Fly in'),
    // new AnimationModel(AnimationType.PRESENTATION_FADEIN, 'Fade in'),
]

const InterpretationAnimations = [
    // new AnimationModel(AnimationType.INTERPRETATION_SCALE, 'Scale'),
    // new AnimationModel(AnimationType.INTERPRETATION_BLINK, 'Blink'),
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