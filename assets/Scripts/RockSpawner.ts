import { _decorator, CCFloat, Component, find, instantiate, Node, Prefab, screen, tween,  Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('RockSpanwer')
export class RockSpanwer extends Component {
    @property([Prefab])
    rockPrefabs: Prefab[] = [];

    public children: Node[] = [];

    @property({type:CCFloat, tooltip:"Spawn interval"})
    public spawnInterval: number = 2

   public minY: number = -180
   public maxY: number = 40
   public scene = screen.windowSize
   public game;
   public gameSpeed:number 
   public gameWorld

   private timer: number = 0;

   onLoad(){
    this.game = find("GameCtrl").getComponent("GameCtrl")
    this.gameSpeed = this.game.gameSpeed


}

   update(deltaTime: number) {
    this.timer += deltaTime;

    if (this.timer >= this.spawnInterval) {
        this.timer = 0;
        this.spawnRock();
    }
}

   spawnRock() {
    // Randomly choose one rock prefab
    const prefabIndex = Math.floor(Math.random() * this.rockPrefabs.length);
    const rockPrefab = this.rockPrefabs[prefabIndex];

   let rock = instantiate(rockPrefab);

    // Set start X (off-screen to the right)
    const startX = this.scene.width /2+200

    // Random Y position between minY and maxY
    const randomY = this.minY + Math.random() * (this.maxY - this.minY);

    rock.setPosition(new Vec3(startX, randomY, 0));
    this.node.addChild(rock);
    rock['currentX'] = startX;

    const endX = -this.scene.width+200
    const distance = this.scene.width;
    const duration = distance / this.gameSpeed;

    tween(rock)
    .to(duration, {}, {
        onUpdate: (_, ratio) => {
            const newX = startX + (endX - startX) * ratio;
            rock.setPosition(new Vec3(newX, randomY, 0));
            rock['currentX'] = newX; // ✅ Track updated position
        }
    })
        .call(() => {
            rock.destroy();
        })
        .start();
}

    reset(){
        this.node.removeAllChildren()
    }
}


