const defaultSpec = {
    "encoding": {
        "x": {"field": "Year", "type": "temporal"},
        "y": {"field": "Acceleration", "type": "quantitative", "aggregation": "average"},
        "color": {"field": "Origin", "type": "nordinal"}
    },
    "style": {
        "showAxisX": true,
        "showAxisY": true,
        "showGrid": true
    },
    "animation": []
}

export default defaultSpec;