import { _decorator, Component, director, Node, UITransform, Vec3 } from 'cc';
import { GameCtrl } from './GameCtrl';
const { ccclass, property } = _decorator;

@ccclass('Backgrounds')
export class Backgrounds extends Component {

    @property({type: Node,tooltip:"Backround 1 here"})
    public bg1: Node ;

    @property({type: Node,tooltip:"Backround 2 here"})
    public bg2: Node ;

    @property({type: Node,tooltip:"Backround 3 here"})
    public bg3: Node ;

    public bgWidth1:number;
    public bgWidth2:number;
    public bgWidth3:number;

    public bgLocation1:Vec3 = new Vec3();
    public bgLocation2:Vec3 = new Vec3();
    public bgLocation3:Vec3 = new Vec3();

    public gameCtrlSpeed: GameCtrl = new GameCtrl();


onLoad() {
    this.startUp();
}

startUp() {
    this.bgWidth1 = this.bg1.getComponent(UITransform).contentSize.width;
    this.bgWidth2 = this.bg2.getComponent(UITransform).contentSize.width;
    this.bgWidth3 = this.bg3.getComponent(UITransform).contentSize.width;

    this.bgLocation1.set(0, 0, 0);
    this.bgLocation2.set(this.bgWidth1 *0.35, 0, 0);
    this.bgLocation3.set(this.bgWidth1 * 2 *0.35, 0, 0);

    this.bg1.setPosition(this.bgLocation1);
    this.bg2.setPosition(this.bgLocation2);
    this.bg3.setPosition(this.bgLocation3);
}

update(deltaTime: number) {
    this.bgLocation1.x -= this.gameCtrlSpeed.gameSpeed * deltaTime;
    this.bgLocation2.x -= this.gameCtrlSpeed.gameSpeed * deltaTime;
    this.bgLocation3.x -= this.gameCtrlSpeed.gameSpeed * deltaTime;

    if (this.bgLocation1.x <= 0-this.bgWidth1*0.35) {
        this.bgLocation1.x = this.bgLocation3.x + this.bgWidth3*0.35;
    }
    if (this.bgLocation2.x <= 0-this.bgWidth2*0.35) {
        this.bgLocation2.x = this.bgLocation1.x + this.bgWidth1*0.35;
    }
    if (this.bgLocation3.x <= 0-this.bgWidth3*0.35) {
        this.bgLocation3.x = this.bgLocation2.x + this.bgWidth2*0.35;
    }

    this.bg1.setPosition(this.bgLocation1);
    this.bg2.setPosition(this.bgLocation2);
    this.bg3.setPosition(this.bgLocation3);
}


}


