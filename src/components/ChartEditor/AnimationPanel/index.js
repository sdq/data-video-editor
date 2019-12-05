import React, { Component } from 'react';
import AnimationList from './AnimationList';
import AnimationPlan from './AnimationPlan';
import AnimationSetting from './AnimationSetting';
import './animationpanel.css';

export default class AnimationPanel extends Component {

    constructor(props) {
        super(props);
        const {displaySpec} = this.props;
        const animations = displaySpec.animation;
        this.state = {
            animationCount: animations.length,
        }
    }

    selectAnimation = (index, animation) => {
        this.props.selectChartAnimation(animation, index);
    }

    unselectAnimation = () => {
        this.props.selectChartAnimation(null, -1);
    }

    render() {
        const {selectedAnimationIndex, selectedAnimation} = this.props;
        let si = selectedAnimationIndex;
        let sa = selectedAnimation;

        /* The following code is to open animation setting after add new animation */
        // const {animationCount} = this.state;
        // const {displaySpec} = this.props;
        // const animations = displaySpec.animation;
        // if (animations.length > animationCount) {
        //     // added new animation
        //     sa = animations[animations.length - 1];
        //     si = animations.length - 1;
        //     this.props.selectChartAnimation(sa, si);
        //     this.setState({
        //         // selectedAnimation: sa,
        //         // selectedAnimationIndex: si,
        //         animationCount: animations.length,
        //     })
        // } else if (animations.length !== animationCount) {
        //     this.setState({
        //         animationCount: animations.length
        //     })
        // }

        return (
            <div>
                {
                    si !== -1?
                    <div>
                        <AnimationList {...this.props}/>
                        <AnimationSetting animation={sa} index={si} unselectAnimation={this.unselectAnimation} {...this.props}/>
                    </div>
                    :
                    <div>
                        <AnimationList {...this.props}/>
                        <AnimationPlan selectAnimation={this.selectAnimation} {...this.props}/>
                    </div>
                }
                
            </div>
        )
    }
}
