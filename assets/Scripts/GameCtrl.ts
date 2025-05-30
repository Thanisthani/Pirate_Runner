import { _decorator, CCInteger, Component, director, EventKeyboard, Input, input, KeyCode, Node } from 'cc';
import { Oracle } from './Oracle';
import { RockSpanwer } from './RockSpawner';
import { Results } from './Results';
import { OracleAudio } from './OracleAudio';
const { ccclass, property } = _decorator;

@ccclass('GameCtrl')
export class GameCtrl extends Component {
   @property({type: CCInteger, tooltip: "Game Speed"})
   public gameSpeed:number = 300;

   @property({type:Oracle})
   public oracle: Oracle

   @property({type:RockSpanwer})
   public rockSpawner: RockSpanwer

   @property({type:Results})
   public results: Results

   @property({type:OracleAudio})
   public oracleAudio: OracleAudio

   public isOver: boolean = false

   onLoad(){
      // this.initListener()
      this.oracleAudio.onAudioQueue(0)
      // this.node.on(Node.EventType.TOUCH_START, ()=>{
      //    if(this.isOver){
      //       this.resetGame()}
      // }, this);
   }

   initListener(){
      input.on(Input.EventType.KEY_DOWN, (event:EventKeyboard)=>{
         if(director.isPaused()){
            this.resetGame()
         }else{
            this.onKeyDown(event)
         }
      }, this)
  
   }

   onKeyDown(event:EventKeyboard){
      switch(event.keyCode){
          case KeyCode.ARROW_UP:
              this.oracle.moveUp()
              break;
          case KeyCode.ARROW_DOWN:
              this.oracle.moveDown()
              break  
          case KeyCode.KEY_R:
               this.resetGame()
               break
      }
  }

   startGame(){
    director.resume()
    this.oracle.resetOracle()
    this.oracle.oracleAnimation.play("Oracle_walking");  
   }

   gameOver(){
      this.isOver = true
      this.oracleAudio.onAudioQueue(1) 
      this.oracle.oracleAnimation.play("Oracle_falling");  
      this.scheduleOnce(() => {
         director.pause();
      }, 0.5);
   }

   gameWin(){

      director.loadScene("Play")
    
   }
   resetGame(){
      this.isOver = false
      this.rockSpawner.reset()
      this.startGame()
      this.results.resetScore()
   }

}



   