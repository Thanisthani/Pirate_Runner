import { _decorator, Animation, CCInteger, Collider2D, Component, Contact2DType, director, find, IPhysics2DContact, Node, screen, Vec3 } from 'cc';
import { GameCtrl } from './GameCtrl';
import { Results } from './Results';
const { ccclass, property } = _decorator;

@ccclass('Oracle')
export class Oracle extends Component {

    @property({type: CCInteger, tooltip:"Oracle moving distance"})
    public moveDistance: number = 50


    @property({type: Results})
    public results: Results

    public gameCtrl

   public tempLocationOrcale: Vec3 = new Vec3();
   public oracleAnimation: Animation

   public isContactFloorUp: boolean = false
   public isContactFloorDown: boolean = false
   public scene = screen.windowSize
   public horizontalPosition

   onLoad(){
    this.gameCtrl = find("GameCtrl").getComponent(GameCtrl)
    this.oracleAnimation = this.node.getComponent(Animation)
    let initialPosition = this.node.getPosition()
    this.horizontalPosition = initialPosition.x
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
        this.results.showScore()
        this.gameCtrl.gameOver()
    }
   }

    update(){
        this.contactWithBird()
    }
    resetOracle(){
        this.tempLocationOrcale = this.node.getPosition()
        this.tempLocationOrcale.y =0
        this.tempLocationOrcale.x =this.horizontalPosition
        this.node.setPosition(this.tempLocationOrcale)
    }

}


