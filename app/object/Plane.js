import THREE from 'three';
const glslify = require('glslify');


export default class Plane extends THREE.Object3D {
  constructor(heightMap,audioData) {
    super();

    this.geom = new THREE.CubeGeometry(50, 50,50,100,100);
    this.geom = new THREE.PlaneGeometry(1000, 1000,1,1);

    this.mat = new THREE.MeshPhongMaterial( {
      side:THREE.DoubleSide,
      wireframe:false
    });
    this.mesh = new THREE.Mesh(this.geom, this.mat);

    this.mesh.position.set(0,-50,0);
    this.mesh.rotation.x = Math.PI/180 * -90;

    this.mesh.castShadow = true;
    this.mesh.receiveShadow = true;

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


  update() {

  }
}
