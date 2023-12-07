#version 300 es
precision mediump float;

in vec3 aPosition;
in vec3 aNormal;
in vec2 aTexCoord;
out highp vec2 vTexCoord;
out vec3 vNormal;
uniform mat4 uModelViewMatrix;
uniform mat4 uProjectionMatrix;

void main(){
    vNormal = aNormal;
    vTexCoord = aTexCoord;
    gl_Position = uProjectionMatrix * uModelViewMatrix * vec4(aPosition, 1.0);
}