import { _decorator, Button, Component, find, Label, Node } from 'cc';
import { GameManager } from './GameManager';
const { ccclass, property } = _decorator;

@ccclass('NextPlay')
export class NextPlay extends Component {
    @property({type: Button})
    play: Button = null

    public gameManager

    onLoad(){
        this.gameManager = find("GameManager").getComponent(GameManager)

        this.play.node.on(Button.EventType.CLICK,()=>{
           this.gameManager.goToNextLevel()
        })

            if(this.gameManager.currentLevel == this.gameManager.levelConfig.length - 1){
                this.play.node.getComponent(Label).string = "Play Again"
            }
            else{
                this.play.node.getComponent(Label).string = "Next Level"
            }
    }
}



