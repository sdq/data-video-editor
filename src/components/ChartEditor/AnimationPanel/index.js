import React, { Component } from 'react';
import AnimationList from './AnimationList';
import AnimationPlan from './AnimationPlan';
import AnimationSetting from './AnimationSetting';
import './animationpanel.css';

export default class AnimationPanel extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showAnimationSetting: false,
            selectedAnimation: null,
        }
    }

    selectAnimation = (animation) => {
        console.log(animation);
        this.setState({
            selectedAnimation: animation,
        })
    }

    unselectAnimation = () => {
        this.setState({
            selectedAnimation: null,
        })
    }

    render() {
        return (
            <div>
                {
                    this.state.selectedAnimation?
                    <AnimationSetting animation={this.state.selectedAnimation} unselectAnimation={this.unselectAnimation} {...this.props}/>
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
