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
            // selectedAnimationIndex: -1,
            // selectedAnimation: null,
            animationCount: animations.length,
        }
    }

    selectAnimation = (index, animation) => {
        this.props.selectChartAnimation(animation, index)
        // this.setState({
        //     selectedAnimationIndex: index,
        //     selectedAnimation: animation,
        // })
    }

    unselectAnimation = () => {
        this.props.selectChartAnimation(null, -1)
        // this.setState({
        //     selectedAnimationIndex: -1,
        //     selectedAnimation: null,
        // })
    }

    render() {
        const {selectedAnimationIndex, selectedAnimation} = this.props;
        const {animationCount} = this.state;
        let si = selectedAnimationIndex;
        let sa = selectedAnimation;
        const {displaySpec} = this.props;
        const animations = displaySpec.animation;
        if (animations.length > animationCount) {
            // added new animation
            sa = animations[animations.length - 1];
            si = animations.length - 1;
            this.props.selectChartAnimation(sa, si);
            this.setState({
                // selectedAnimation: sa,
                // selectedAnimationIndex: si,
                animationCount: animations.length,
            })
        } else if (animations.length !== animationCount) {
            this.setState({
                animationCount: animations.length
            })
        }
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
