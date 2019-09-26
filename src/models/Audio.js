export default class Audio{
    constructor(){
        this._elements = [];
        this._duration = duration;
    }
   
   
    duration = function(duration) {
        //set animation duration
        if (duration == null){
            return this._duration;
        } else {
            this._duration = duration;
            return this;
        }
    };
    elements = function() {
        return this._elements;
    };
    addElement = function(element) {
        // element.start(0);
        // if (element.duration() === 0) {
        //     if (this.duration() > 10) {
        //         element.duration(10.0);
        //     } else {
        //         element.duration(this.duration());
        //     }
        // } else if (element.duration() > this.duration()) {
        //     element.duration(this.duration());
        //     this.duration(element.duration()); // update scene duration
        // }
        // let fragment = new Fragment(0, element.duration());
        // element.addFragment(fragment);
        this._elements.push(element);
        return this;
    };
    updateElement = function(element, index) {
        this._elements[index] = element;
        return this;
    };
}