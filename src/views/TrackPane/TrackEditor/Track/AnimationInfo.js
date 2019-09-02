import React, { Component } from 'react';

export default class AnimationInfo extends Component {

    render() {
        let {animation} = this.props;
        return (
            <div className="trackinfo" style={{backgroundColor: '#ffffff'}} onMouseOver={this.onOver}>
                <p style={{float: 'left', marginLeft: 42, width: 140, whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis'}}>
                    {animation.name()}
                </p>
            </div>
        )
    }
}
