import React, { Component } from 'react';
import { PageHeader } from 'antd';

export default class AnimationSetting extends Component {
    render() {
        console.log(this.props.animation);
        return (
            <div>
                <PageHeader
                    style={{
                    border: '1px solid rgb(235, 237, 240)',
                    }}
                    onBack={() => this.props.unselectAnimation()}
                    title={this.props.animation.type}
                    subTitle="Setting"
                />
                {/* Animation Setting */}
            </div>
        )
    }
}
