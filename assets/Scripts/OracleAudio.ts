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
    if(clip){
      this.audioSource.playOneShot(clip)
    }
    else{
      console.error("Audio clip not found")
    }
  }

}


