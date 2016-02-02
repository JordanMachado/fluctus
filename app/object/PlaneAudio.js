import THREE from 'three';
const glslify = require('glslify');


export default class Plane extends THREE.Object3D {
  constructor(heightMap,audioData) {
    super();

    // this.geom = new THREE.CubeGeometry(50, 50,50,100,100);
    this.geom = new THREE.PlaneGeometry(100, 100,50,50);

    this.elevationScale = 0.2;
    this.startTime = Date.now();
    this.time = 0.0;

    this.uniforms = THREE.UniformsUtils.merge([
      THREE.UniformsLib[ "shadowmap" ],
      {
      elevationScale:{
        type:'f',
        value:this.elevationScale
      },
      time:{
        type:'f',
        value:this.time
      },
      lightPosition: {type: 'v3', value: new THREE.Vector3(0, 100, 100)},
      tHeightMap: {
            type: 't',
            value: heightMap
        },
        tAudioData: {
              type: 't',
              value: audioData
          },
    }]);


    function replaceThreeChunkFn(a, b) {
        return THREE.ShaderChunk[b] + '\n';
    }

    function shaderParse(glsl) {
        return glsl.replace(/\/\/\s?chunk\(\s?(\w+)\s?\);/g, replaceThreeChunkFn);
    }

    let vs = glslify('../shaders/planeAudio.vert');
    let fs = glslify('../shaders/planeAudio.frag');

    let vexterShader = shaderParse(vs);
    let fragmentShader = shaderParse(fs);



    this.mat = new THREE.ShaderMaterial( {

      vertexShader: vexterShader,
      fragmentShader:fragmentShader,
      uniforms: this.uniforms,
      side:THREE.DoubleSide,
      wireframe:true
    });
    this.mesh = new THREE.Mesh(this.geom, this.mat);
    this.mesh.rotation.x = Math.PI/180 * 110;
    this.mesh.rotation.z =  Math.PI/180 * 155;


    window.mesh = this.mesh;
    this.mesh.position.y = 20;
    this.mesh.castShadow = true;
    this.mesh.receiveShadow = false;

    this.mesh.customDepthMaterial = new THREE.ShaderMaterial({
       vertexShader: shaderParse(vs),
       fragmentShader: THREE.ShaderLib.depthRGBA.fragmentShader,
       uniforms:this.mat.uniforms
   });



    this.add(this.mesh);
  }
  addGUI(folder) {



      folder.add(this.mesh.material,'wireframe')

      folder.add(this,'elevationScale').min(.01).max(50.0)
        .listen()
        .onFinishChange(()=>{
          this.uniforms.elevationScale.value = this.elevationScale;
        });
  }


  update(heightMap,audioData,volume) {
    this.uniforms.elevationScale.value = volume;
    this.uniforms.tHeightMap.value = heightMap;
    this.uniforms.tAudioData.value = audioData;
    this.uniforms.time.value = 0.0025*(Date.now() - this.startTime);

    // this.rotation.x += 0.01;
    this.rotation.y += 0.001;
  }
}
