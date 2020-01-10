const defaultSpec = {
    "encoding": {
        "color": {"field": "Origin", "type": "nordinal"},
        "size": {"field": "Weight_in_lbs", "type": "quantitative", "aggregation": "average"},
        "time": {"field": "Year", "type": "temporal"},
    },
    "style": {},
    "animation": []
}

export default defaultSpec;