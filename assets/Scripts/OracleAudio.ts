import { _decorator, AudioClip, AudioSource, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('OracleAudio')
export class OracleAudio extends Component {
  @property({type: AudioSource})
  public audioSource: AudioSource

  @property({type:[AudioClip]})
  public audioClips: AudioClip[] = []

  onAudioQueue(index: number){
    let clip = this.audioClips[index]

    if(index == 0){
  this.audioSource.clip = clip;
      this.audioSource.loop = true;
      this.audioSource.play();
    }else{

      if(clip){
        this.audioSource.playOneShot(clip)
      }
      else{
        console.error("Audio clip not found")
      }
    }
   
  }

}


