#version 300 es
precision highp float;

in vec3 vNoise;
in vec2 vTexCoord;
in vec3 vPosition;
out vec4 outColor;

uniform bool uBox;


// numbers relate to the size of the box vs the plane
bool isInsideWorld(){
    return (vTexCoord.x > 3.5/9.0  && vTexCoord.x<5.5/9.0 
    && vTexCoord.y>3.5/9. && vTexCoord.y<5.5/9.);
}

void main(){
    if (uBox && !isInsideWorld()){
        discard;
    }
    outColor = vec4(vNoise, 1.0);
}