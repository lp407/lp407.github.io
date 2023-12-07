#version 300 es
precision mediump float;

out vec4 outColor;
in highp vec2 vTexCoord;
in vec3 vNormal;

void main(){
    float size = 0.003;
    if ((vTexCoord.x > size && vTexCoord.x < 1.0 - size )&& (vTexCoord.y > size && vTexCoord.y < 1.0 - size))
        discard;
    // if (vTexCoord.x > 0.95)
    //     color = vec4(1.0, 0.0, 0.0, 1.0);
    outColor = vec4(0.0,1.0,0.0,1.0);
}