import AnimationType from '../animation/AnimationType';
import Animation from '@/animation/AnimationModel';

const PresentationAnimations = [
    new Animation(AnimationType.PRESENTATION_APPEAR, 'Appear'),
    new Animation(AnimationType.PRESENTATION_FLYIN, 'Fly in'),
    new Animation(AnimationType.PRESENTATION_FADEIN, 'Fade in'),
]

const InterpretationAnimations = [
    new Animation(AnimationType.INTERPRETATION_SCALE, 'Scale'),
    new Animation(AnimationType.INTERPRETATION_BLINK, 'Blink'),
]

const ReasoningAnimations = [
    new Animation(AnimationType.REASONING_HIGHLIGHT, 'Hightlight'),
    new Animation(AnimationType.REASONING_FILLCOLOR, 'Fill color'),
]

export default {
    presentation: PresentationAnimations,
    interpretation: InterpretationAnimations,
    reasoning: ReasoningAnimations,
}