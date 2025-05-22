import { _decorator, CCInteger, Collider2D, Component, Contact2DType, director, IPhysics2DContact, Node, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Oracle')
export class Oracle extends Component {

    @property({type: CCInteger, tooltip:"Oracle moving distance"})
    public moveDistance: number = 50

   public tempLocationOrcale: Vec3 = new Vec3();

   public isContactFloorUp: boolean = false
   public isContactFloorDown: boolean = false

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
        director.pause()
    }
   }

    update(){
        this.contactWithBird()
    }

}


