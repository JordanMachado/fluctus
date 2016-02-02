// fragment shader


varying vec3 vWorldPosition;

uniform vec3 lightPosition;

varying vec2 vUv;
uniform sampler2D tHeightMap;
uniform sampler2D tAudioData;


// chunk(shadowmap_pars_fragment);

void main(void) {

    vec3 lightDirection = normalize(lightPosition);

    vec3 outgoingLight = vec3(1.0);

    vec3 textureHeightMap = texture2D(tHeightMap,vUv ).rbg;
    vec3 textureAudio = texture2D(tAudioData,vUv ).rbg;

    // chunk(shadowmap_fragment);

    // simpliest hardcoded lighting ^^
    float c = 0.35 + max(0.0, dot(vec3(0.), lightDirection)) * 0.4 ;
    vec3 colorshadow = vec3(c);
    vec3 color = mix(textureHeightMap,textureAudio,0.5);

    gl_FragColor = vec4(color+c, 1.0);
}
