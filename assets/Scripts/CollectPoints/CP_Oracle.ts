import { _decorator, Animation, CCFloat, Collider2D, Component, Contact2DType, EventTouch, find, Input, input, IPhysics2DContact, Node, RigidBody2D, tween, Vec2, Vec3 } from 'cc';
import { CP_GameCtrl } from './CP_GameCtrl';
const { ccclass, property } = _decorator;

@ccclass('CP_Oracle')
export class CP_Oracle extends Component {
    @property({type: CCFloat})
    public minJumpForce: number = 1;

    @property({type: CCFloat})
    public maxJumpForce: number = 3;

    @property({type: CCFloat})
    public maxHoldTime: number = 1.0; // Max hold duration in seconds

    private holdStartTime: number = 0;
    private rb2d: RigidBody2D;
    private oracleAnimation: Animation;
    private isGrounded: boolean = true;
    private collider: Collider2D;
    public gameCtrl
    private initalPosition: Vec3 = new Vec3()

    onLoad() {
        this.rb2d = this.node.getComponent(RigidBody2D);
        this.oracleAnimation = this.node.getComponent(Animation);

        input.on(Input.EventType.TOUCH_START, this.onTouchStart, this);
        input.on(Input.EventType.TOUCH_END, this.onTouchEnd, this);

        this.gameCtrl = find("GameCtrl").getComponent(CP_GameCtrl)
        this.collider = this.node.getComponent(Collider2D);
        this.initalPosition = this.node.getPosition()

        // this.rb2d.linearDamping = 5;
    
        // Contact listeners
        if (this.collider) {
            this.collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
            this.collider.on(Contact2DType.END_CONTACT, this.onEndContact, this);
        }
       
    }

    onDestroy() {
        input.off(Input.EventType.TOUCH_START, this.onTouchStart, this);
        input.off(Input.EventType.TOUCH_END, this.onTouchEnd, this);
    }

    onTouchStart(event: EventTouch) {
        if(!this.gameCtrl.isOver) {
            this.holdStartTime = performance.now();
        }
        
       
    }

    onTouchEnd(event: EventTouch) {
        if (!this.isGrounded) return;

        const holdDuration = (performance.now() - this.holdStartTime) / 1000;
        const clamped = Math.min(holdDuration, this.maxHoldTime);
        const forceRatio = clamped / this.maxHoldTime;
        const jumpForce = this.minJumpForce + forceRatio * (this.maxJumpForce - this.minJumpForce);

        this.isGrounded = false; // now Oracle is in air
        this.gameCtrl.jumbUp()
        this.oracleAnimation.play("Oracle_jumping");
        this.rb2d.linearVelocity = new Vec2(0, jumpForce);
    }
    onBeginContact(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {
        if (otherCollider.node.name.includes("Floor")) {
            this.isGrounded = true;
            this.gameCtrl.jumbDown()
            this.oracleAnimation.play("Oracle_walking");
        }
    }

    onEndContact(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {
        if (otherCollider.node.name.includes("Floor")) {
            this.isGrounded = false;
        }
    }

    update(){
        const pos = this.node.getPosition();
        this.node.setPosition(this.initalPosition.x, pos.y, pos.z);
    }


}
