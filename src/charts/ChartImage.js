import React from 'react';
import { Image } from 'react-konva';
import useImage from 'use-image';

const ChartImage = (props) => {
    const [image] = useImage(props.src);
    return <Image ref={node=>props.getImageRef(node)} name={props.name} image={image} width={props.width} height={props.height} />;
};

export default ChartImage;