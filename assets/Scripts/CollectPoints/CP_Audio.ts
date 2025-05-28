import { _decorator, AudioClip, AudioSource, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('CP_Audio')
export class CP_Audio extends Component {
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


