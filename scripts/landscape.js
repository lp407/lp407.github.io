function drawLandscape(){
  if (gui.drawTerrainCheckbox.checked()){
    push();
      translate(0 + worldOffset.x, 1003 + worldOffset.y, 0 + worldOffset.z);
      rotateX(PI/2);
      shader(landscapeShader);
      landscapeShader.setUniform('uTexture', noisetxt);
      plane(9000);
    pop();
  }
}