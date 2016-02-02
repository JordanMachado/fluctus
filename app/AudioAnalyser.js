// simple audio analyser
import Emitter from './Emitter';

export default class AudioAnalyser extends Emitter {
  constructor(bufferSize = 512) {
    super();
    // console.log(bufferSize);
    this.player = document.createElement('audio');
    this.player.id = 'audio-player';
    window.AudioContext = window.AudioContext || window.webkitAudioContext;
    this._context = new AudioContext();
    this._bufferSize = bufferSize;
    this._analyser = this._context.createAnalyser();
    this._analyser.fftSize = this._bufferSize;
    this.binCount = this._analyser.frequencyBinCount;

    this._dataFreqArray = new Uint8Array( this.binCount )
    this._binds = {}
    this._binds.onLoad = this._onLoad.bind( this )
  }
  load( url ) {
   this.url =url;
   this._request = new XMLHttpRequest()
   this._request.open( "GET", url, true )
   this._request.responseType = "arraybuffer"

   this._request.onload = this._binds.onLoad
   this._request.send()


 }
 _onLoad() {
    this._context.decodeAudioData( this._request.response, ( buffer ) => {
      // this._source = this._context.createBufferSource()
      this._source = this._context.createMediaElementSource(this.player)
      this._source.connect( this._analyser )
      this._source.buffer = buffer
      this._source.connect( this._context.destination )


      this.player.setAttribute('src', this.url);


      this.emit('loaded');
      window.source = this._source;
      // this.play();
      //
      // var gainNode = this._context.createGain();
      //
      // this._source.connect(gainNode);
      // gainNode.connect(this._context.destination);



      console.log('loaded');
    }, () => {
      console.log( "error" )
    } )
  }
  play() {
    this.player.volume = 0;
    this.player.play();
    this.ready = true;
    
    TweenLite.to(this.player,2.5,{
      volume:1
    })
  }
  destroy() {
    this.player.volume = 0;
    this.player.pause();
    this.player = null;
    // TweenLite.to(this.player,2.5,{
    //   volume:1
    // })
  }
  getData() {
     this._analyser.getByteFrequencyData( this._dataFreqArray );
     let _volume = 0;
    let _acuteAverage = 0;
     for (var i = 0; i < this._dataFreqArray.length; i++) {
       _volume += this._dataFreqArray[i];
       if(i> 174 - 5) {
          _acuteAverage += this._dataFreqArray[i];
        }
     }

     let volume = _volume/this._dataFreqArray.length;
     return {
      acuteAverage:_acuteAverage/(255*4),
      freq: this._dataFreqArray,
      volume:volume/15
    }
  }
}
