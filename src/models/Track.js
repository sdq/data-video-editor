export default class Track {
    constructor(id, index) {
        this._id = id;
        this._index = index;
        this._elements = [];
        this.id = function(id) {
            if (id == null){
                return this._id;
            } else {
                this._id = id;
                return this;
            }
        };
        this.index = function(index) {
            if (index == null){
                return this._index;
            } else {
                this._index = index;
                return this;
            }
        };
        this.elements = function(elements) {
            if (elements == null){
                return this._elements;
            } else {
                this._elements = elements;
                return this;
            }
        };
        this.add = function(element) {
            this._elements.push(element);
            return this;
        }
        this.remove = function(index) {
            this._elements.splice(index, 1);
            return this;
        }
        this.clear = function() {
            this._elements = [];
            return this;
        }
    }
}