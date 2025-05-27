import { _decorator, Component, Node, UITransform, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('CollectPoints_BG')
export class CollectPoints_BG extends Component {
    @property({type: Node,tooltip:"Backround 1 here"})
    public bg1: Node ;

    @property({type: Node,tooltip:"Backround 2 here"})
    public bg2: Node ;

    public bgWidth1:number;
    public bgWidth2:number;

    public bgLocation1:Vec3 = new Vec3();
    public bgLocation2:Vec3 = new Vec3();

    public gameSpeed:number = 300;

    onLoad() {
        this.startUp();
    }
    
    startUp() {
        this.bgWidth1 = this.bg1.getComponent(UITransform).contentSize.width;
        this.bgWidth2 = this.bg2.getComponent(UITransform).contentSize.width;
    
        this.bgLocation1.set(0, 0, 0);
        this.bgLocation2.set(this.bgWidth1, 0, 0);
    
        this.bg1.setPosition(this.bgLocation1);
        this.bg2.setPosition(this.bgLocation2);
    }

    update(deltaTime: number) {
        this.bgLocation1.x -= this.gameSpeed * deltaTime;
        this.bgLocation2.x -= this.gameSpeed * deltaTime;
    
        if (this.bgLocation1.x <= 0-this.bgWidth1) {
            this.bgLocation1.x = this.bgLocation2.x + this.bgWidth2;
        }
        if (this.bgLocation2.x <= 0-this.bgWidth2) {
            this.bgLocation2.x = this.bgLocation1.x + this.bgWidth1;
        }
       
    
        this.bg1.setPosition(this.bgLocation1);
        this.bg2.setPosition(this.bgLocation2);
    }


}


