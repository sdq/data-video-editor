const defaultSpec = {
    "encoding": {
        "x": {"field": "Cylinders", "type": "ordinal"},
        "y": {"field": "Horsepower", "type": "quantitative"},
        "color": {"field": "Origin", "type": "nordinal"},
    },
    "style": {
        "showAxisX": true,
        "showAxisY": true,
    },
    "animation": []
}

export default defaultSpec;