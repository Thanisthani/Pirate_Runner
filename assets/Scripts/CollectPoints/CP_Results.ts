import { _decorator, Component, director, find, Label } from 'cc';
import { CP_GameCtrl } from './CP_GameCtrl';
const { ccclass, property } = _decorator;

@ccclass('CP_Results')
export class CP_Results extends Component {
   @property({type:Label})
   private currentScore: Label

   @property({type:Label})
   private timeLabel: Label

   @property({type:Label})
   private finalScore: Label

   @property({type:Label})
   private tryAgain: Label

   @property({type:Label})
   private loss: Label

   public score: number =0
   public totalTime: number =0
   public isOver: boolean = false

   public gameCtrl

   onLoad(){
    this.hideResults()
    this.gameCtrl = find("GameCtrl").getComponent(CP_GameCtrl)
   }

   update(deltaTime: number){
    if(!this.isOver){
        this.totalTime += deltaTime
        const minutes = Math.floor(this.totalTime/ 60);
        const seconds = Math.floor(this.totalTime % 60);

        const mm = minutes < 10 ? '0' + minutes : minutes.toString();
        const ss = seconds < 10 ? '0' + seconds : seconds.toString();
        this.timeLabel.string = "Time: " + mm + ":" + ss
        this.currentScore.string = "Score: "+this.score 
        if(this.totalTime > 60){
        if(this.score > this.gameCtrl.totalPoints * 0.6){
            director.loadScene("PlayNext")
            }
            else{
                this.gameCtrl.gameOver()
                this.showResults()
            }

        }
   }
   }

   addScore(num:number){
    this.score += num
   }

   decreaseScore(){
    this.score -= 1
   }

   resetScore(){
    this.score = 0
    this.totalTime = 0
    this.isOver = false
    this.hideResults()
    }
    

   showResults(){
    this.isOver = true
    this.finalScore.string = this.score +" / "+ (this.gameCtrl.totalPoints*0.6).toFixed(0)
    this.finalScore.node.active = true
    this.tryAgain.node.active = true
    this.loss.node.active = true
    this.currentScore.node.active = false
    this.timeLabel.node.active = false
   }

   hideResults(){
    this.finalScore.node.active = false
    this.tryAgain.node.active = false
    this.loss.node.active = false
    this.timeLabel.node.active = true
    this.currentScore.node.active = true
   }
}



