import { _decorator, Component, Label, Node } from 'cc';
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

    onLoad(){
        this.hideResults()
        this.currentScore.node.active = true
        console.log("Results loaded")
    }
   

    update(deltaTime: number) {
        if(!this.isOver){
        this.score += 0.01
        this.currentScore.string = "Score: " + this.score.toFixed(0)
        }
    }

    resetScore(){
        this.score = 0
        this.isOver = false 
        this.hideResults()
    }
    showScore(){
        this.isOver = true
        this.maxScore = Math.max(this.maxScore,this.score)
        this.yourScore.string = "Your Score: " + this.score.toFixed(0)
        this.highScore.string = "High Score: " + this.maxScore.toFixed(0)
        this.yourScore.node.active = true
        this.highScore.node.active = true
        this.tryAgain.node.active = true
    }

  

    hideResults(){
        this.yourScore.node.active = false
        this.highScore.node.active = false
        this.tryAgain.node.active = false
    }
}


