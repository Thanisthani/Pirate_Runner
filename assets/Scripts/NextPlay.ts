import { _decorator, Button, Component, find, Node } from 'cc';
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
    }
}



