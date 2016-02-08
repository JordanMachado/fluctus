import Webgl from './Webgl';
import raf from 'raf';
import dat from 'dat-gui';
import domReady from 'domready';
import deviceType from 'ua-device-type';

import 'gsap';

let webgl;
let gui;
let device;


const tl = new TimelineMax({
  paused: true,
  onComplete:() => {
    // webgl.quadNoise.updateTimeScale(0.1);
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



const tlIntro = new TimelineMax()
.to(['canvas', '.main'], 0.5, {
  autoAlpha: 1,
}, '0.8')
.from('.circle--first', 0.45, {
  strokeDashoffset: 285,
  ease: Power1.easeInOut,
}, '0.9')
.from('.circle--second', 0.45, {
  strokeDashoffset: 310,
  ease: Power1.easeInOut,
}, '1.15')
.from('.button text', 0.55, {
  autoAlpha: 0,
  ease: Power1.easeInOut,
}, '0.95')
.from('.button rect', 0.45, {
  scaleX: 0,
  x: '-50%',
  ease: Power1.easeInOut,
}, '1.15')
.from('.title__content', 0.55, {
  x: '100%',
  scaleX: 0.5,
  autoAlpha: 0,
  ease: Power1.easeInOut,
}, '1.15')


domReady(function () {
  device = deviceType(navigator.userAgent)
  document.querySelector('html').classList.add(device);
  webgl = new Webgl(device,window.innerWidth, window.innerHeight, document.querySelector('canvas'));
  // window.webgl = webgl
  window.addEventListener('resize', resizeHandler);
  window.addEventListener('mousemove', mouseMoveHandler);
  window.addEventListener('touchmove', touchMoveHandler);

  let startBtn = document.querySelector('.start');
  let startBtnText = document.querySelector('.start text');

  webgl.audio.once('decoding', function (amount) {
    startBtnText.innerHTML = "LOADING"
  })
  webgl.audio.on('load', () => {
    startBtnText.innerHTML = "START";

    startBtn.addEventListener('click', ()=> {
      tl.play();
      webgl.audio.play()
      webgl.quadNoise.updateTimeScale(0.1);
    });
  });

  webgl.audio.on('ended', () => {
    tl.reverse();
    webgl.quadNoise.updateTimeScale(0.00001);
  });


  animate();

})


// gui = new dat.GUI();
// window.gui = gui;
// gui.add(webgl.params, 'usePostprocessing');
// webgl.quadNoise.updateTimeScale(0.1);

function resizeHandler() {
  webgl.resize(window.innerWidth, window.innerHeight);
}
function mouseMoveHandler(e) {
  webgl.mousemove(e.clientX, e.clientY);
}
function touchMoveHandler(e) {
  webgl.mousemove(e.touches[0].clientX,e.touches[0].clientY);
}
function animate() {
  raf(animate);
  webgl.render();
}
