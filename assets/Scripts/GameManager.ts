import { _decorator, Component, director, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('GameManager')
export class GameManager extends Component {
    public static Instance: GameManager;

    public currentLevel: number = 0;
    public levelConfig = [
        { sceneName: "EndlessRunner", type: "runner" },
        { sceneName: "CollectPoints", type: "jumper" }
    ];

    onLoad() {
        if (!GameManager.Instance) {
            GameManager.Instance = this;
            director.addPersistRootNode(this.node); 
        } else {
            this.node.destroy(); 
        }
    }

    getCurrentLevelScene(): string {
        return this.levelConfig[this.currentLevel].sceneName;
    }

    loadCurrentLevelScene() {
        const sceneName = this.getCurrentLevelScene();
        director.loadScene(sceneName);
    }

    goToNextLevel() {
        if (this.currentLevel < this.levelConfig.length - 1) {
            this.currentLevel++;
            this.loadCurrentLevelScene();
        } else {
            this.currentLevel = 0
            this.loadCurrentLevelScene()
        }
    }

}


