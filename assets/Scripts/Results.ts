import { _decorator, Component, director, find, Label, Node } from 'cc';
import { GameCtrl } from './GameCtrl';
const { ccclass, property } = _decorator;

@ccclass('Results')
export class Results extends Component {
    @property({type:Label})
    public currentScore: Label

    @property({type:Label})
    public yourScore: Label

    @property({type:Label})
    public highScore: Label

    @property({type:Label})
    public tryAgain: Label

    public maxScore: number = 0
    public score: number =0
    public isOver: boolean = false
    private totalTime: number = 0; 
    public gameCtrl

    onLoad(){
        this.gameCtrl = find("GameCtrl").getComponent(GameCtrl)
        this.hideResults()
        this.currentScore.node.active = true
    }
   

    update(deltaTime: number) {
        if(!this.isOver){
        this.totalTime += deltaTime;
        const minutes = Math.floor(this.totalTime/ 60);
        const seconds = Math.floor(this.totalTime % 60);

        const mm = minutes < 10 ? '0' + minutes : minutes.toString();
        const ss = seconds < 10 ? '0' + seconds : seconds.toString();
        this.currentScore.string = " Time: " + mm + ":" + ss
        if(this.totalTime > 60){
            director.loadScene("PlayNext")
        }
    }
}

    resetScore(){
        this.score = 0
        this.totalTime = 0
        this.isOver = false 
        this.hideResults()
    }
    showScore(){
        this.isOver = true
        this.yourScore.string = this.totalTime > 60 ? "You win" : "Game Over"
        this.yourScore.node.active = true
        this.tryAgain.node.active = true
    }

  

    hideResults(){
        this.yourScore.node.active = false
        this.highScore.node.active = false
        this.tryAgain.node.active = false
    }
}


