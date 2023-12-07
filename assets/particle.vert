#version 300 es
precision highp float;

in vec3 aPosition;
in vec3 aNormal;
in vec2 aTexCoord;

flat out int instanceID;
out highp vec2 vVertTexCoord;
out highp vec3 vNormal;
out vec3 vPosition;

uniform int uMode;
uniform mat3 uNormalMatrix;
uniform mat4 uProjectionMatrix;
uniform mat4 uModelViewMatrix;

// my Uniforms
uniform float uTime;

/*
    positionVec4.x += sin((float(instanceID))) * 2000.0;
    positionVec4.z += sin((float(instanceID) * 100.0)) * 20000.0;
    positionVec4.y += float(instanceID) *0.2 - 1000.0;
*/
vec4 displace(vec4 positionVec4) {
    switch (uMode){
    case 0: 
        positionVec4.x += sin(100.0 + float(instanceID)+ uTime) * 10000.0 + 100.0;
        positionVec4.z += sin((float(instanceID) * 100.0 + uTime)) * 2000.0;
        positionVec4.y += sin(float(instanceID) *2.0 + uTime) * 4000.0;
        break;
    case 1:
        positionVec4.x += sin((float(instanceID) + uTime)) * 200.0;
        positionVec4.z += sin((float(instanceID) + uTime)) * 20.0;
        positionVec4.xyz += vec3(0.0, float(instanceID) * 50.0 - 1000.0, 0.0);
        break;
    case 2:
        positionVec4.x += sin((float(instanceID)) * 1.0) * 2000.0;
        positionVec4.z += sin((float(instanceID) * 100.0)) * 20000.0;
        positionVec4.y -= float(instanceID) *0.2 - 1000.0;
        break;
    case 3:
        positionVec4.x += sin((float(instanceID))) * -200000.0;
        positionVec4.y += sin((float(instanceID) + uTime)) * 20.0 + cos(float(instanceID) * 0.1 + uTime/100.) * 100000.0;
        positionVec4.z += (float(instanceID)) * 5.0 - 100000.0;
            float dist = distance(positionVec4.xyz, vec3(0.0));
        if (dist < 1000.0) {
            positionVec4.xyz += sin(dist * 0.1 + uTime) * 100.0;
        }
        break;
    }
    
    return positionVec4;
}

void main(){
    instanceID = gl_InstanceID;
    vec4 positionVec4 = vec4(aPosition, 1.0);
    vVertTexCoord = aTexCoord;
    vNormal = normalize(aNormal);

    // vec3 normal = normalize(vec3( uNormalMatrix * aNormal ));
    // normal = displace(vec4(normal, 1.0)).xyz;
    // vNormal = normal;
    
    positionVec4 = displace(positionVec4);

    vPosition = positionVec4.xyz;
    gl_Position = uProjectionMatrix * uModelViewMatrix * positionVec4;
}