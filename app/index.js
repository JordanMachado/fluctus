import Webgl from './Webgl';
import raf from 'raf';
import dat from 'dat-gui';
import 'gsap';

let webgl;
let gui;

gui = new dat.GUI();
window.gui = gui;

// webgl settings
webgl = new Webgl(window.innerWidth, window.innerHeight, document.querySelector('canvas'));

document.body.appendChild(webgl.renderer.domElement);

// GUI settings

gui.add(webgl.params, 'usePostprocessing');

// handle resize
window.addEventListener('resize', resizeHandler);
window.addEventListener('mousemove', mouseMoveHandler);
webgl.analyser.load('medias/Veens-Girl.mp3');
// webgl.quadNoise.updateTimeScale(0.1);



new TimelineMax()
.to(['canvas', '.main'], 0.2, {
  autoAlpha: 1,
}, '0.2')
.from('.circle--first', 0.45, {
  strokeDashoffset: 285,
  ease: Power1.easeInOut,
}, '0.4')
.from('.circle--second', 0.45, {
  strokeDashoffset: 310,
  ease: Power1.easeInOut,
}, '0.65')
.from('.button text', 0.55, {
  autoAlpha: 0,
  ease: Power1.easeInOut,
}, '0.45')
.from('.button rect', 0.45, {
  scaleX: 0,
  x: '-50%',
  ease: Power1.easeInOut,
}, '0.65')
.from('.title__content', 0.55, {
  x: '100%',
  scaleX: 0.5,
  autoAlpha: 0,
  ease: Power1.easeInOut,
}, '0.65')




const tl = new TimelineMax({
  paused: true,
  onComplete:() => {
    console.log('complete');
    webgl.analyser.play();
    webgl.quadNoise.updateTimeScale(0.1);

    // setTimeout(()=> {
    //   console.log('log');
    //   tl.reverse()
    // }, 1000);
  }
});

tl.to('.circle--first', 0.45, {
  strokeDashoffset: 285,
  ease: Power1.easeInOut,
}, '0')
.to('.circle--second', 0.45, {
  strokeDashoffset: 310,
  ease: Power1.easeInOut,
}, '0.15')
.to('.button text', 0.55, {
  autoAlpha: 0,
  ease: Power1.easeInOut,
}, '0.05')
.to('.button rect', 0.45, {
  scaleX: 0,
  x: '-50%',
  ease: Power1.easeInOut,
}, '0.15')
.to('.title__content', 0.55, {
  x: '100%',
  scaleX: 0.5,
  autoAlpha: 0,
  ease: Power1.easeInOut,
}, '0.15')
.to('.main', 0.7, {
  backgroundColor: 'rgba(255, 255, 255, 0)',
  ease: Power1.easeInOut,
})


let start_btn = document.querySelector('.start');
start_btn.addEventListener('click', ()=> {
  console.log('start');

  tl.play();

});

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
