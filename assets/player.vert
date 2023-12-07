#version 300 es
precision highp float;

// Projection matricess from P5
uniform mat4 uModelViewMatrix;
uniform mat4 uProjectionMatrix;

// attributes from P5
in vec3 aPosition;
in vec3 aNormal;

// Varying to send to frag shader
out vec3 vPosition;
out vec3 vNormal;
out highp float vFresnel;

// my Uniforms
uniform float uFrameCount;
uniform float uAmplitude;
uniform float uSpeed;
uniform vec3 uCamPos;
uniform mat4 uModelMatrix;
uniform vec3 uForwards;

vec3 displace(vec3 pos){
    // // pos.z += sin((aPosition.y + uFrameCount) * uSpeed) * uAmplitude;
    // float displacement = sin((pos.x + uFrameCount) * uSpeed) * uAmplitude;
    // pos.y += displacement;
    // // pos += vec3(sin((pos.y*uFrameCount/100.0)),sin((pos.z*uFrameCount/100.0)), sin((pos.x*uFrameCount/100.0))) * aNormal;
    // return pos;
    float displacement = cos((dot(pos, uForwards) + uFrameCount) * uSpeed) * uAmplitude;
    // Apply the displacement to the y-coordinate of the position
    pos.y += displacement;

    return pos;
}

//
vec3 orthogonal(vec3 v) {
  return normalize(abs(v.x) > abs(v.z) ? vec3(-v.y, v.x, 0.0)
  : vec3(0.0, -v.z, v.y));
}

vec3 modifyNormals(vec3 modifiedPos){
  vec3 tangent, bitangent;
  vec3 neighbour1, neighbour2;
  vec3 displacedTangent, displacedBitangent;
  vec3 displacedNormal;

  tangent = orthogonal(aNormal);
  bitangent =  normalize(cross(aNormal, tangent));
  neighbour1 = displace(aPosition + tangent * 0.01);
  neighbour2 = displace(aPosition + bitangent * 0.01);
  displacedTangent = neighbour1 - modifiedPos;
  displacedBitangent = neighbour2 - modifiedPos;
  displacedNormal = normalize(cross(displacedTangent, displacedBitangent));

  return displacedNormal;
}

float getFresnel(vec3 pos, vec3 normal){
    vec4 worldPos = uModelMatrix * vec4(pos, 1.0);
    vec4 worldNorm = normalize(uModelMatrix * vec4(normal, 0.0));
    vec4 I = normalize(vec4(uCamPos, 1.0) - worldPos);
    float R = 2.8 * pow(1.0 - dot(I, worldNorm), 3.4); 
    return R;
}

void main() {
  vec3 modifiedPos;
  vec3 modifiedNormals;

  // distort the mesh & normals together
  modifiedPos = displace(aPosition);
  modifiedNormals = modifyNormals(modifiedPos);
  //send these to the fragment shader
  vPosition = modifiedPos;
  vNormal = modifiedNormals;
  vFresnel = getFresnel(modifiedPos, modifiedNormals);

  gl_Position = uProjectionMatrix * uModelViewMatrix * vec4(modifiedPos, 1.0);
}
