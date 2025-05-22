import { _decorator, CCInteger, Component, EventKeyboard, Input, input, KeyCode, Node } from 'cc';
import { Oracle } from './Oracle';
import { RockSpanwer } from './RockSpawner';
const { ccclass, property } = _decorator;

@ccclass('GameCtrl')
export class GameCtrl extends Component {
   @property({type: CCInteger, tooltip: "Game Speed"})
   public gameSpeed:number = 300;

   @property({type:Oracle})
   public oracle: Oracle

   // @property({type:RockSpanwer})
   // public rockSpawner: RockSpanwer

   onLoad(){
      this.initListener()
   }

   initListener(){
      input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this)
  
   }

   onKeyDown(event:EventKeyboard){
      switch(event.keyCode){
          case KeyCode.ARROW_UP:
              this.oracle.moveUp()
              break;
          case KeyCode.ARROW_DOWN:
              this.oracle.moveDown()
              break
      
      }
  }









}



   