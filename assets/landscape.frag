#version 300 es
precision mediump float;

uniform sampler2D uTexture;
in vec2 vTexCoord;
out vec4 outColor;

void main(){
    vec2 uv = vTexCoord;
    uv *= 3.0;
    uv = fract(uv);
    vec4 tex = texture(uTexture, uv);
    outColor = tex;
}