function drawLandscape(){
  if (gui.drawTerrainCheckbox.checked()){
    push();
      translate(0, 2000 + worldOffset.y, 0);
      rotateX(PI/2);
      shader(landscapeShader);
      landscapeShader.setUniform('uTexture', noisetxt);
      landscapeShader.setUniform('uBox', gui.drawBox.checked() ? true : false);
      landscapeShader.setUniform('uWorldOffset', [worldOffset.x, worldOffset.y, worldOffset.z]);
      landscapeShader.setUniform('uPlayerSpeed', gui.playerSpeed.value());
      plane(9000, 9000 ,600, 600);
    pop();
  }
}