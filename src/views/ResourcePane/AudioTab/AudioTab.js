import React, { Component } from 'react';
import AudioCard from '@/components/AudioCard';
import LazyLoad from 'react-lazyload';

export default class AudioTab extends Component {
    render() {
        return (
            <div>
                <LazyLoad>
                    <AudioCard name="demo sound" soundurl="http://datavideo.idvxlab.com/audios/electronic-anon.mp3"/>
                </LazyLoad>
            </div>
        )
    }
}
