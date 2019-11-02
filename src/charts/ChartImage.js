import React from 'react';
import { Image } from 'react-konva';
import useImage from 'use-image';

const ChartImage = (props) => {
    const [image] = useImage(props.src);
    return <Image name={props.name} image={image} />;
};

export default ChartImage;