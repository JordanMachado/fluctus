'use strict';

var THREE = require('three');
var glslify = require('glslify');
var Pass = require('@superguigui/wagner/src/Pass');
var vertex = glslify('@superguigui/wagner/src/shaders/vertex/basic.glsl');
var fragment = glslify('./displacement-fs.glsl');

function Displacement(options) {
  Pass.call(this);
  this.setShader(vertex, fragment);
  this.params.amount = 0.0005;
  this.params.uDisplacement = new THREE.Texture(512,512);
}

module.exports = Displacement;

Displacement.prototype = Object.create(Pass.prototype);
Displacement.prototype.constructor = Displacement;


Displacement.prototype.run = function(composer) {

  this.shader.uniforms.uDisplacement.value = this.params.uDisplacement;

  this.shader.uniforms.amount.value = this.params.amount;

  composer.pass(this.shader);
};
