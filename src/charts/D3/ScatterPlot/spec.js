const defaultSpec = {
    "encoding": {
        "x": {"field": "Income", "type": "quantitative"},
        "y": {"field": "Life_expectancy", "type": "quantitative"},
        "color": {"field": "Country", "type": "nordinal"},
        "id":{"field":"Country"},
        "time":{"field":"Year"}
    },
    "style": {},
    "animation": []
}

export default defaultSpec;