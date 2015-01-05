var webgl, gui, stats, container;

window.onload = init;

function init(){
    container = document.querySelector('.three');

    webgl = new Webgl(window.innerWidth, window.innerHeight);
    container.appendChild(webgl.renderer.domElement);

    // dat gui
    gui = new dat.GUI();
    gui.close();

    // stats
    stats = new Stats();
    stats.setMode(0); // 0: fps, 1: ms
    stats.domElement.style.position = 'absolute';
    stats.domElement.style.left = '0px';
    stats.domElement.style.top = '0px';
    container.appendChild( stats.domElement );

    window.onresize = resizeHandler;

    animate();
}

function resizeHandler() {
    webgl.resize(window.innerWidth, window.innerHeight);
}

function animate() {
    requestAnimationFrame(animate);
    stats.update();
    webgl.render();
}