let WAGNER = require('@superguigui/wagner')
var InvertPass = require('@superguigui/wagner/src/passes/invert/InvertPass');

export default class AbstractWebgl {
    constructor(width, height) {
        this.abstractParams = {
            usePostprocessing: true,
            name: "Abstract"
        };
        this.mouse = new THREE.Vector2(0.5, 0.5);
        this._mouse = new THREE.Vector2(0, 0);
        this.raycaster = new THREE.Raycaster();

        this.scene = new THREE.Scene();

        this.camera = new THREE.PerspectiveCamera(50, width / height, 1, 1000000);
        this.camera.position.z = 500;

        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize(width, height);
        this.renderer.setClearColor(0x383838);

        this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);

        this.composer = null;
        this.initGui();
        this.initPostprocessing();

        this.fade = 1.0;

    }
    initGui() {
        let folder = window.gui.addFolder(this.abstractParams.name);
        folder.open();
        folder.add(this.abstractParams, 'usePostprocessing')
    }
    initPostprocessing() {
        if (!this.abstractParams.usePostprocessing) {
            return;
        }
        this.composer = new WAGNER.Composer(this.renderer);
        this.composer.setSize(window.innerWidth, window.innerHeight);
        window.composer = this.composer;
        this.invertPass = new InvertPass();

    }
    addPass() {

    }
    click(x, y, o_x, o_y) {
        this.mouse.x = x;
        this.mouse.y = y;
        this._mouse.x = o_x;
        this._mouse.y = o_y;


    }
    mousemove(x, y, o_x, o_y) {
        this.mouse.x = x;
        this.mouse.y = y;
        this._mouse.x = o_x;
        this._mouse.y = o_y;

    }
    keyDown(keyCode) {
        console.log(keyCode);
        switch (keyCode) {
            case 65:
                //space
                let fade = (this.fade > 0.0) ? 0.0 : 1.0;
                TweenLite.killTweensOf(this);
                TweenLite.to(this, 0.5, {
                    fade: fade
                })
                break;
            default:

        }
    }
    resize(width, height) {
        if (this.composer) {
            this.composer.setSize(width, height);
        }

        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();

        this.renderer.setSize(width, height);
    }
    rayCast() {
        this.raycaster.setFromCamera(this.mouse, this.camera);
        let intersects = this.raycaster.intersectObject(this.objectWave, true);
        if (intersects.length > 0) {

            if (intersects[0].object.id === this.objectWave.mesh.id) {
                // console.log(intersects[0].uv.x,intersects[0].uv.y);
                this.objectWave.updateMouseProjection(intersects[0].uv);
            }
        }
    }
    render() {
        if (this.abstractParams.usePostprocessing) {
            this.composer.reset();
            this.composer.render(this.scene, this.camera);
            this.addPass();

            // this.composer.pass(this.invertPass);


            this.composer.toScreen();

        } else {
            this.renderer.render(this.scene, this.camera);
        }
        this.controls.update();


    }
    destroy() {
        gui.removeFolder(this.abstractParams.name);
    }
}
