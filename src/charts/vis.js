import d3 from 'd3';

export default class Vis {
    constructor() {
        this.dimension = function(_name, _dataType, _extent) {
            let dimension = new Object(),
                name = _name || "",
                dataType = _dataType || "Numerical",
                extent = _extent || [];
        
            dimension.name = function(_) {
                if (!arguments.length) return name;
                name = _;
                return dimension;
            };
        
            dimension.dataType = function(_) {
                if (!arguments.length) return dataType;
                dataType = _;
                return dimension;
            };
        
            dimension.extent = function(_) {
                if (!arguments.length) return extent;
                extent = _;
                return dimension;
            };
        
            return dimension;
        };
        this.slot = function(_name, _description, _dataTypes, _isMultiple, _isRequired) {

            let slot = new Object(),
                name = _name || "",
                description = _description || "",
                dataTypes = _dataTypes || ["Numerical"], //Categorical,Numerical
                isMultiple = _isMultiple || false, //defalut:not multiple
                isRequired = _isRequired || false; //default:not required
        
        
            slot.name = function(_) {
                if (!arguments.length) return name;
                name = _;
                return slot;
            };
        
            slot.description = function(_) {
                if (!arguments.length) return description;
                description = _;
                return slot;
            };
        
            slot.dataTypes = function(_) {
                if (!arguments.length) return dataTypes;
                dataTypes = _;
                return slot;
            };
        
            slot.isMultiple = function(_) {
                if (!arguments.length) return isMultiple;
                isMultiple = _;
                return slot;
            };
        
            slot.isRequired = function(_) {
                if (!arguments.length) return isRequired;
                isRequired = _;
                return slot;
            };
        
            return slot;
        };
        this.initDimensions = function(data) {
            let dimensions = [];
            //csv
            if (data.columns) {
                //delete repeated dimension name
                data.columns = Array.from(new Set(data.columns));
                //init dimension
                data.columns.forEach(function(name) {
                    let dimension = vis.dimension().name(name);
                    let result = 0;
                    /*Numerical 0, Categorical 1, Temporal 2*/
                    let time = 0;
                    let categor = 0;
                    data.forEach(function(d) {
                        if (isNaN(d[name])) { //not number
                            if (isNaN(Date.parse(d[name]))) { //categorical
                                categor++;
                            } else { //Temporal
                                time++;
                            }
                        }
                    });
                    if (categor) result = 1;
                    else if (time) result = 2;
        
                    if (result == 0) { //Numerical
                        dimension.extent(d3.extent(data.filter(d => (d[name] == null || d[name] == "") ? false : true), d => Number(d[name])));
                    } else if (result == 1) {
                        dimension.dataType('Categorical')
                            .extent(Array.from(new Set(data.map(d => d[name]))).filter(d => (d == null || d == "") ? false : true));
                    } else if (result == 2) {
                        dimension.dataType('Temporal').extent(d3.extent(data.filter(d => (d[name] == null || d[name] == "") ? false : true), d => d[name]));
                    }
                    dimensions.push(dimension);
                });
            }
            return dimensions;
        }
    }
    
}