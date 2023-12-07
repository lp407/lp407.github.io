#version 300 es
precision highp float;

// Projection matricess from P5
uniform mat4 uModelViewMatrix;
uniform mat4 uProjectionMatrix;

// in
in vec3 aPosition;
in vec2 aTexCoord;
in vec3 aNormal;

// out
out vec2 vTexCoord;
out vec3 vNoise;
out vec3 vPosition;

//uniform
uniform sampler2D uTexture;
uniform vec3 uWorldOffset;
uniform float uPlayerSpeed;



void main() {
  vec4 positionVec4 = vec4(aPosition, 1.0);
  vec2 uv = aTexCoord;
  uv *= 0.3;
  uv -= uWorldOffset.xz/300000.0*uPlayerSpeed;
  uv = fract(uv);
  vTexCoord = uv;
  vec4 noise = texture(uTexture, uv);
  vNoise = noise.rgb;
  positionVec4.xyz += noise.rgb * aNormal * 1500.0; 
  vPosition = positionVec4.xyz;
  vTexCoord = aTexCoord;
  gl_Position = uProjectionMatrix * uModelViewMatrix * positionVec4;
}