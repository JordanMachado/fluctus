varying vec2 vUv;
uniform float time;
uniform float timeScale;
uniform sampler2D tTexture;
uniform float repeat;

#pragma glslify: snoise2 = require(glsl-noise/simplex/2d)

void main(){

  vec3 texture = texture2D(tTexture,vUv / repeat).rbg;

  vec2 position = vec2(vUv.x+time*timeScale,vUv.y+time*timeScale);
  float noise = snoise2(position);
  //noise = smoothstep(.2, .3, noise);
  noise += texture.r;

  vec3 color = vec3(noise,noise * 1.5,noise * 1.2);
  color.r += 0.5;

  gl_FragColor =   vec4(color,1.0);



}
