import { _decorator, CCFloat, CCInteger, Component, find, instantiate, Node, Prefab, screen, tween, v2, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('RockSpanwer')
export class RockSpanwer extends Component {
    @property([Prefab])
    rockPrefabs: Prefab[] = [];

    @property({type:CCFloat, tooltip:"Spawn interval"})
    public spawnInterval: number = 2

   public minY: number = -180
   public maxY: number = 70
   public scene = screen.windowSize
   public game;
   public gameSpeed:number 

   private timer: number = 0;

   update(deltaTime: number) {
    this.timer += deltaTime;

    if (this.timer >= this.spawnInterval) {
        this.timer = 0;
        this.spawnRock();
    }
}

   spawnRock() {
    this.game = find("GameCtrl").getComponent("GameCtrl")
    this.gameSpeed = this.game.gameSpeed
    // Randomly choose one rock prefab
    const prefabIndex = Math.floor(Math.random() * this.rockPrefabs.length);
    const rockPrefab = this.rockPrefabs[prefabIndex];

   let rock = instantiate(rockPrefab);

    // Set start X (off-screen to the right)
    const startX = this.scene.width /2+250

    // Random Y position between minY and maxY
    const randomY = this.minY + Math.random() * (this.maxY - this.minY);

    rock.setPosition(new Vec3(startX, randomY, 0));
    this.node.addChild(rock);

    const distance = this.scene.width;
    const duration = distance / this.gameSpeed;

    tween(rock)
        .to(duration, { position: new Vec3(-this.scene.width+250 , randomY, 0) })
        .call(() => {
            rock.destroy();
        })
        .start();
}

    reset(){
        this.node.removeAllChildren()
    }
}


