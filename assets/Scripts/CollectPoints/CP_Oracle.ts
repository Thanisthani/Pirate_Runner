import { _decorator, Animation, CCFloat, Component, Node, tween, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('CP_Oracle')
export class CP_Oracle extends Component {
   @property({type:CCFloat})
   public jumpHeight:number = 20
   
   @property({type:CCFloat})
   public jumpDuration:number = 3.5

   public oracleLocation:Vec3 
   public oracleAnimation: Animation 

   resetOracle(){
    this.oracleLocation= new Vec3(0,0,0)
    this.node.setPosition(this.oracleLocation)
    this.oracleAnimation.play("Oracle_walking")
   }

   jumpOracle(){
    this.oracleAnimation.stop()
    tween(this.node.position).to(this.jumpDuration,new Vec3(this.node.position.x,this.node.position.y+this.jumpHeight,0),{easing:"smooth",
        onUpdate:(target: Vec3, ratio:number)=>{
    this.node.position = target;
        }
    })
    .start()
    this.oracleAnimation.play("Oracle_jumping")
}

}

