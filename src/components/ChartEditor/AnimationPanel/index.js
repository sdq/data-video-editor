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
            selectedIndex: -1,
            selectedAnimation: null,
        }
    }

    selectAnimation = (index, animation) => {
        this.setState({
            selectedIndex: index,
            selectedAnimation: animation,
        })
    }

    unselectAnimation = () => {
        this.setState({
            selectedIndex: -1,
            selectedAnimation: null,
        })
    }

    render() {
        const {selectedIndex, selectedAnimation} = this.state;
        return (
            <div>
                {
                    this.state.selectedAnimation?
                    <AnimationSetting animation={selectedAnimation} index={selectedIndex} unselectAnimation={this.unselectAnimation} {...this.props}/>
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
