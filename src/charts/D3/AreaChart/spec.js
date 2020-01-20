const defaultSpec = {
    "encoding": {
        "x": {"field": "Year", "type": "ordinal"},
        "y": {"field": "Displacement", "type": "quantitative","aggregation": "average"},
        "color": {"field": "Origin", "type": "nordinal"},
    },
    "style": {
        "showAxisX": true,
        "showAxisY": true,
    },
    "animation": []
}

export default defaultSpec;