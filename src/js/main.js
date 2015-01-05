var webgl, gui;

window.onload = init;

function init(){
    webgl = new Webgl(window.innerWidth, window.innerHeight);
    document.querySelector('.three').appendChild(webgl.renderer.domElement);

    gui = new dat.GUI();
    gui.close();

    window.onresize = resizeHandler;

    animate();
}

function resizeHandler() {
    webgl.resize(window.innerWidth, window.innerHeight);
}

function animate() {
    requestAnimationFrame(animate);
    webgl.render();
}