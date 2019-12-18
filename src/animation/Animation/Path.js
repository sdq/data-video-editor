import Konva from "konva";
import AnimationBase from './AnimationBase';

export default class Path extends AnimationBase {
    constructor(start, duration, node, pathinfo) {
        super(start, duration, node ,pathinfo); //注意赋值顺序
        this.pathinfo = pathinfo; //包含path信息 
        this._animation = new Konva.Animation(function(frame) {

            //line 获取起点终点
            const variedRate= ((this._duration * 1000 - frame.time) / (this._duration * 1000)); // from 1 - 0  
            const [x1,y1,x2,y2] = [pathinfo[0],pathinfo[1],pathinfo[2],pathinfo[3]];
            this._node.position({
                x: (x2-x1)*(1-variedRate),//相对路径
                y: (y2-y1)*(1-variedRate)//相对路径
            });
             
            /*
            //TODO:路径功能扩展方法：
            card：path ani card 增加类别选项，直线、多线段、圆形，分别拖拽到素材上
            交互：直线拖动起点终点，多段先输入线段数，生成相应锚点，圆形可以拉伸大小
            path 内部info：增加type判断，对应到相应的动画路径
            实现：直线读取info四个值，多段读取多个值，圆形读取方法如下
            // var circle = new Konva.Circle({ x: data[0].x, y: data[0].y, radius: 10, fill: 'Magenta'});
            // this._layer.add(circle);
            // pos = pos + 1;
            // pt = path.getPointAtLength(pos * step);
            // circle.position({x: pt.x, y: pt.y});
            */

        }.bind(this), this._layer);
    }
}