#version 300 es
precision mediump float;

// Projection matricess from P5
uniform mat4 uModelViewMatrix;
uniform mat4 uProjectionMatrix;

// in
in vec3 aPosition;
in vec2 aTexCoord;
// out
out vec2 vTexCoord;

void main() {
  vTexCoord = aTexCoord;
  gl_Position = uProjectionMatrix * uModelViewMatrix * vec4(aPosition, 1.0);
}