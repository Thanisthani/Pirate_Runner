import { _decorator, Button, Component, director, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Play')
export class Play extends Component {
    @property({type: Button})
    play: Button = null

    onLoad(){
        this.play.node.on(Button.EventType.CLICK,()=>{
            director.loadScene("EndlessRunner")
        })
    }
}


