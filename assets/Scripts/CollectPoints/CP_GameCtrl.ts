import { _decorator, CCInteger, Component, director, Node } from 'cc';
import { CP_Oracle } from './CP_Oracle';
import { CP_Results } from './CP_Results';
import { CoinSpawner } from './CoinSpawner';
import { CP_Audio } from './CP_Audio';
const { ccclass, property } = _decorator;

@ccclass('CP_GameCtrl')
export class CP_GameCtrl extends Component {
   @property({type:CP_Oracle})
   public oracle:CP_Oracle

   @property({type:CP_Results})
   public results:CP_Results

   @property({type:CoinSpawner})
   public coinSpawner:CoinSpawner

    @property({type:CCInteger})
    public speed:number = 250

    @property({type:CP_Audio})
    public cPAudio: CP_Audio

    public isOver:boolean

    public totalPoints:number = 0

    onLoad(){
        this.isOver = false
        this.cPAudio.onAudioQueue(0)
    }
  

    addPoint(num:number ){
        this.cPAudio.onAudioQueue(2)
        this.results.addScore(num)
    }

    decreasePoint(){
        this.cPAudio.onAudioQueue(1)
        this.results.decreaseScore()
    }

    addTotalPoints(num:number){
        this.totalPoints += num
    }                   

    resetGame(){
        this.isOver = false
        this.coinSpawner.resetCoin()
        this.results.resetScore()
        director.resume()
     }

  gameOver(){
    this.isOver = true
    director.pause();
  }

  jumbUp(){
    this.cPAudio.onAudioQueue(3)
  }
  jumbDown(){
    this.cPAudio.onAudioQueue(4)
  }

}


