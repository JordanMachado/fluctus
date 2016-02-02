import THREE from 'three';
const glslify = require('glslify');

export default class HeightMap extends THREE.Object3D {
  constructor() {
    super();
    this.startTime = Date.now();
    this.time = 0.0;
    this.timeScale = 0.0001;
    this.repeat = 1.3;



    this.uniforms = {
      time:{
        type:'f',
        value:this.time
      },
      timeScale:{
        type:'f',
        value:this.timeScale
      },
      tTexture: {
            type: 't',
            value: new THREE.Texture(512,512)
      },
      repeat:{
        type:'f',
        value:this.repeat
      }
    }

    var loader = new THREE.TextureLoader();

    loader.load('images/heightMap.jpg',(texture)=> {
      this.uniforms.tTexture.value = texture
    });

    this.mat = new THREE.ShaderMaterial( {
      uniforms: this.uniforms,
      vertexShader: glslify('../shaders/noise.vert'),
      fragmentShader:glslify('../shaders/noise.frag')
    });


    this.geo = new THREE.PlaneBufferGeometry( window.innerWidth, window.innerHeight );
    this.mesh = new THREE.Mesh(this.geo,this.mat);


    this.add(this.mesh);

  }
  addGUI(folder) {
      folder.add(this,'repeat').min(1.0).max(10.0)
        .listen()
        .onFinishChange(()=>{
          this.uniforms.repeat.value = this.repeat;
        });

        folder.add(this,'timeScale').min(.01).max(.5)
          .listen()
          .onFinishChange(()=>{
            this.uniforms.timeScale.value = this.timeScale;
          });
  }
  updateTimeScale(timeScale) {
    this.timeScale = timeScale;
    this.uniforms.timeScale.value = timeScale;

  }
  update() {
    this.uniforms.time.value = 0.0025*(Date.now() - this.startTime);
  }
}
