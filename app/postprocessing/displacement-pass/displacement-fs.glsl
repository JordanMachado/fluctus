varying vec2 vUv;
uniform sampler2D tInput;
uniform sampler2D uDisplacement;
uniform vec2 resolution;
uniform float amount;

void main() {

  vec4 map =  texture2D(uDisplacement, vUv);

  // map -= 0.5;
  map.xy *= amount;
  gl_FragColor = texture2D(tInput, vec2(vUv.x + map.x, vUv.y + map.y));

}
