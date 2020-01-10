const defaultSpec = {
    "encoding": {
        "size": {"field": "Weight_in_lbs", "type": "quantitative","aggregation": "average"},
        "color": {"field": "Origin", "type": "nordinal"},
        "time": {"field": "Year", "type": "temporal"},
    },
    "style": {},
    "animation": []
}

export default defaultSpec;