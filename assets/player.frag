#version 300 es
precision highp float;

in vec3 vNormal;
in highp float vFresnel;
uniform bool uSeethrough;
out vec4 outColor;

uniform vec3 uCamPos;

void main() {
    vec3 objectColor = mix(vec3(0.2), vec3(1.0), vFresnel);
    if (uSeethrough){    
        if (vFresnel < 0.1 )
        discard;
        if (dot(vNormal, uCamPos) < 0.0)
        discard;
    }
    outColor = vec4(objectColor, 1.0);
}

