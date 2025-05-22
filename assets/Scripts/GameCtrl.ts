import { _decorator, CCInteger, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('GameCtrl')
export class GameCtrl extends Component {
   @property({type: CCInteger, tooltip: "Game Speed"})
   public gameSpeed:number = 300;

   
}


