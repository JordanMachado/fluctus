
varying vec2 vUv;
uniform float time;
uniform float repeat;



void main(){

	vec4 p = vec4(position,1.0);
  vUv = uv * repeat;
	gl_Position = projectionMatrix * modelViewMatrix * p;

}
