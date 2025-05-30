import { _decorator, Animation, CCInteger, Collider2D, Component, Contact2DType, director, EventTouch, find, IPhysics2DContact, Node, screen, UITransform, Vec3 } from 'cc';
import { GameCtrl } from './GameCtrl';
import { Results } from './Results';
import { RockSpanwer } from './RockSpawner';
const { ccclass, property } = _decorator;

@ccclass('Oracle')
export class Oracle extends Component {

    @property({type: CCInteger, tooltip:"Oracle moving distance"})
    public moveDistance: number = 50

    @property({ type: RockSpanwer })
    public rockSpawner: RockSpanwer;


    @property({type: Results})
    public results: Results

    public gameCtrl

   public tempLocationOrcale: Vec3 = new Vec3();
   public oracleAnimation: Animation

   public isContactFloorUp: boolean = false
   public isContactFloorDown: boolean = false
   public scene = screen.windowSize
   public horizontalPosition
   private _touching = false;

   public isOver:boolean = false

   onLoad(){
    this.gameCtrl = find("GameCtrl").getComponent(GameCtrl)
    this.oracleAnimation = this.node.getComponent(Animation)
    let initialPosition = this.node.getPosition()
    this.horizontalPosition = initialPosition.x
    this.node.on(Node.EventType.TOUCH_START, this.onTouchStart, this);
    this.node.on(Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
    this.node.on(Node.EventType.TOUCH_END, this.onTouchEnd, this);
    this.node.on(Node.EventType.TOUCH_CANCEL, this.onTouchEnd, this);
   }


   onTouchStart(event: EventTouch) {
    this._touching = true;
    
}

// onTouchMove(event: EventTouch) {
//     if (!this._touching) return;

//     const delta = event.getDelta(); // returns movement delta since last frame

//     // Only move vertically
//     const currentPos = this.node.getPosition();
//     this.node.setPosition(currentPos.x, currentPos.y + delta.y, currentPos.z);
// }
onTouchMove(event: EventTouch) {
    if (!this._touching) return;

    const delta = event.getDelta();
    const currentPos = this.node.getPosition();

    // ✅ Set your desired Y limits (based on barrier positions)
    const minY = -180;  // bottom barrier Y
    const maxY = 140;   // top barrier Y

    let newY = currentPos.y + delta.y;
    newY = Math.max(minY, Math.min(maxY, newY));  // clamp within bounds

    this.node.setPosition(currentPos.x, newY, currentPos.z);
}

onTouchEnd(event: EventTouch) {
    this._touching = false;
}

onDestroy() {
    this.node.off(Node.EventType.TOUCH_START, this.onTouchStart, this);
    this.node.off(Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
    this.node.off(Node.EventType.TOUCH_END, this.onTouchEnd, this);
    this.node.off(Node.EventType.TOUCH_CANCEL, this.onTouchEnd, this);
}


   moveUp() {
    if(this.isContactFloorDown){
        this.isContactFloorDown = false
    }

    if(!this.isContactFloorUp){
        this.tempLocationOrcale = this.node.getPosition()
        this.tempLocationOrcale.y +=  this.moveDistance

        this.node.setPosition(this.tempLocationOrcale)
     }
   }

   moveDown() {
    if(this.isContactFloorUp){
        this.isContactFloorUp = false
    }

    if(!this.isContactFloorDown){
        this.tempLocationOrcale = this.node.getPosition()
        this.tempLocationOrcale.y -= this.moveDistance
        this.node.setPosition(this.tempLocationOrcale)
    }
   }


   contactWithBird(){
    let colider = this.node.getComponent(Collider2D)
    if(colider){
        colider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this)
    }
   }

   onBeginContact(selfColider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null){
        
    if(otherCollider.name == "Top_BG<BoxCollider2D>" || otherCollider.name == "Bottom_BG<BoxCollider2D>"){
        this.isContactFloorUp = true
    } else if(otherCollider.name == "Bottom_BG<BoxCollider2D>"){
        this.isContactFloorDown = true
    }
    else{
        this.isOver = true
        this.results.showScore()
        this.gameCtrl.gameOver()
    }
   }

   update(deltaTime: number) {
    this.contactWithBird();

    const oracleY = this.node.worldPosition.y;
    const oracleX = this.node.worldPosition.x;

    const siblings = this.node.parent.children;
    let targetSiblingIndex = this.node.getSiblingIndex(); // Default

    for (let i = 0; i < siblings.length; i++) {
        const child = siblings[i];

        if (child === this.node) continue;
        if (!child.name.startsWith("Rock")) continue;

        const rockY = child.worldPosition.y;
        
        const rockX = child['currentX'];
        // 🟡 Only check rocks in front of Oracle (to the right)
        if (rockX +child.getComponent(UITransform).contentSize.width/2< oracleX) {
console.log("next")
            continue;
        }

        // if(i==0) {
        //     console.log("first")
        //     continue}
        // 🟢 If Oracle is visually in front (higher Y), set below the rock


        if (oracleY < rockY) {
            targetSiblingIndex = Math.max(targetSiblingIndex, child.getSiblingIndex() + 1);
            break
        } else {
            targetSiblingIndex = Math.min(targetSiblingIndex, child.getSiblingIndex() - 1);
            break
        }

    }

    this.node.setSiblingIndex(targetSiblingIndex);
}

    resetOracle(){
        this.tempLocationOrcale = this.node.getPosition()
        this.tempLocationOrcale.y =0
        this.tempLocationOrcale.x =this.horizontalPosition
        this.node.setPosition(this.tempLocationOrcale)
    }

}


