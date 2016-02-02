import Webgl from './Webgl';
import raf from 'raf';
import dat from 'dat-gui';
import 'gsap';

let webgl;
let gui;

gui = new dat.GUI();
window.gui = gui;

// webgl settings
webgl = new Webgl(window.innerWidth, window.innerHeight);
webgl.analyser.load('medias/Veens-Girl.mp3');

document.body.appendChild(webgl.renderer.domElement);

// GUI settings

gui.add(webgl.params, 'usePostprocessing');

// handle resize
window.addEventListener('resize', resizeHandler);
window.addEventListener('mousemove', mouseMoveHandler);


let start_btn = document.querySelector('.start');
start_btn.onclick = ()=> {
  console.log('start');
}

// let's play !
animate();

function resizeHandler() {
  webgl.resize(window.innerWidth, window.innerHeight);
}
function mouseMoveHandler(e) {
  webgl.mousemove(e.clientX, e.clientY);

}
function animate() {
  raf(animate);

  webgl.render();
}
