import { _decorator, CCFloat, Collider2D, Component, Contact2DType, find, instantiate, Node, Prefab, screen, tween, Vec3 } from 'cc';
import { CP_GameCtrl } from './CP_GameCtrl';
const { ccclass, property } = _decorator;

@ccclass('CoinSpawner')
export class CoinSpawner extends Component {
  
    @property({type:Prefab})
    private coinPrefab: Prefab;

    @property({type:Prefab})
    private fireBallPrefab: Prefab;

    @property({type:Prefab})
    private gemPrefab: Prefab;

    @property({type:CCFloat, tooltip:"Spawn interval"})
    private spawnInterval: number = 1

    @property({type:CCFloat, tooltip:"Fire ball spawn interval"})
    private FireBallSpawnInterval: number = 4

    @property({type:CCFloat, tooltip:"Gem spawn interval"})
    private gemSpawnInterval: number = 5

    @property({type:CCFloat})
    private spawnSpeed: number = 350


public minY: number = -180
public maxY: number = 250
public scene = screen.windowSize
private timer: number = 0;
private fireBallTimer: number = 0;
private gemTimer: number = 0;


public gameCtrl

onLoad(){
    this.gameCtrl = find("GameCtrl").getComponent(CP_GameCtrl)
}

update(deltaTime: number) {
    this.timer += deltaTime;
    this.fireBallTimer += deltaTime;
    this.gemTimer += deltaTime;

    if (this.timer >= this.spawnInterval) {
        this.timer = 0;
        this.spawnCoin();
    }
    if (this.fireBallTimer >= this.FireBallSpawnInterval) {
        this.fireBallTimer = 0;
        this.spawnFireBall();
    }
    if (this.gemTimer >= this.gemSpawnInterval) {
        this.gemTimer = 0;
        console.log("spawnGem")
        this.spawnGem();
    }
}

spawnCoin(){

    let coin = instantiate(this.coinPrefab)

    const startX = this.scene.width /2+200

    const randomY = this.minY + Math.random() * (this.maxY - this.minY);

    coin.setPosition(new Vec3(startX, randomY, 0));
    this.node.addChild(coin);

    this.gameCtrl.addTotalPoints(1)
    
    let collider = coin.getComponentInChildren(Collider2D)

    if(collider){
    
        collider.on(Contact2DType.BEGIN_CONTACT, ()=>{
          this.gameCtrl.addPoint(1)
            coin.destroy()
        }, this)
    }

    const distance = this.scene.width;
    const duration = distance / this.spawnSpeed;

    tween(coin)
    .to(duration,{position: new Vec3(-this.scene.width+200, randomY,0)})
    .call(()=>{
        coin.destroy()
    })
    .start()

   

}

resetCoin(){
    this.node.removeAllChildren()
}

spawnFireBall(){

    let fireBall = instantiate(this.fireBallPrefab)

    const startX = this.scene.width /2+200

    const randomY = this.minY + Math.random() * (this.maxY - this.minY);

    fireBall.setPosition(new Vec3(startX, randomY, 0));
    this.node.addChild(fireBall);

    let collider = fireBall.getComponent(Collider2D)

    if(collider){
    
        collider.on(Contact2DType.BEGIN_CONTACT, ()=>{
          this.gameCtrl.decreasePoint()
            fireBall.destroy()
        }, this)
    }
    const distance = this.scene.width;
    const duration = distance / this.spawnSpeed;

    tween(fireBall)
    .to(duration,{position: new Vec3(-this.scene.width+200, randomY,0)})
    .call(()=>{
        fireBall.destroy()
    })
    .start()
}

spawnGem(){

    let gem = instantiate(this.gemPrefab)

    const startX = this.scene.width /2+200

    const randomY = this.minY + Math.random() * (this.maxY - this.minY);

    gem.setPosition(new Vec3(startX, randomY, 0));
    this.node.addChild(gem);

    this.gameCtrl.addTotalPoints(3)
    
    let collider = gem.getComponent(Collider2D)

    if(collider){
    
        collider.on(Contact2DType.BEGIN_CONTACT, ()=>{
          this.gameCtrl.addPoint(3)
            gem.destroy()
        }, this)
    }

    const distance = this.scene.width;
    const duration = distance / this.spawnSpeed;

    tween(gem)
    .to(duration,{position: new Vec3(-this.scene.width+200, randomY,0)})
    .call(()=>{
        gem.destroy()
    })
    .start()

   

}

}


