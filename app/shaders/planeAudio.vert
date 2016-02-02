

varying vec2 vUv;
uniform sampler2D tHeightMap;
uniform sampler2D tAudioData;
uniform float elevationScale;
uniform float time;


// chunk(shadowmap_pars_vertex);

void main() {



    vec3 pos = position;
    vUv = uv;
    float elevation = 10. + elevationScale;
    vec3 texture = texture2D(tHeightMap,uv).rbg;
    vec3 textureAudio = texture2D(tAudioData,uv).rbg;

    pos.z += texture.r * elevation ;
    pos.z -= textureAudio.r * elevation;


    vec4 worldPosition = modelMatrix * vec4(pos, 1.0);
    // chunk(shadowmap_vertex);


    gl_Position = projectionMatrix * viewMatrix * worldPosition;

}
