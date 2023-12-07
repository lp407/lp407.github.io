#version 300 es
precision mediump float;

in highp vec3 vNormal;
in vec3 vPosition;
out vec4 outColor;
flat in int instanceID;

uniform bool uBox;
uniform bool uIsColor;
uniform vec3 uColor;

bool isInsideWorld(){
    return (abs(vPosition.x )<1000.0 &&
            abs(vPosition.y )<1000.0 &&
            abs(vPosition.z )<1000.0);
}

void main() {
    if (uBox && !isInsideWorld()) {
        discard;
    }
    if (uIsColor) {
        outColor = vec4(uColor, 1.0);
    }
    else{
        outColor = vec4(vNormal, 1.0);
    }  
}