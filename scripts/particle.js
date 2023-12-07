class OctahedronParticles {
  constructor(instances, scale, height) {
    this.scale = scale;
    this.height = height; 
    this.instances = instances;
    this.calculateVertices();
    this.modes = {
      figure8: 0,
      spiral: 1,
      seaweed: 2,
      random: 3
    }
  }
  vertices = [];

  calculateVertices (){
    this.vertices = [];
    for (let i = 0; i < 8; i++){
      let scale = this.scale;
      let height = this.height;
      let sign = i % 2 ? 1 : -1;
      let triangle = i % 4;
      let u = i / 8;
      let v = triangle / 4;
      i < 4 ? this.vertices.push(new VertexInfo(0, scale + height, 0, u, v)) : this.vertices.push(new VertexInfo(0, -scale - height, u, v));
      triangle < 2 ? this.vertices.push(new VertexInfo(sign * scale, 0, sign * scale, u, v) ): this.vertices.push(new VertexInfo(-sign * scale, 0, sign * scale, u, v));
      triangle < 2 ? this.vertices.push(new VertexInfo(sign * scale, 0, -sign * scale, u, v)) : this.vertices.push(new VertexInfo(sign * scale, 0, sign * scale, u, v));
    }
  };
  updateInstances(){
    this.instances = gui.particleNumber.value();
  }
  remake(){
    this.height = gui.particleheight.value();
    this.scale = gui.particleSize.value();
    this.calculateVertices();
  }
  render() {
    push();
    shader(particleShader);
    particleShader.setUniform('uTime', frameCount * 0.01);
    particleShader.setUniform('uMode', this.modes[gui.particleBehaviour.value()]);
    particleShader.setUniform('uBox', gui.drawBox.checked());
    particleShader.setUniform('uIsColor', gui.chooseColour.checked());
    particleShader.setUniform('uColor', [red(gui.color.value())/255,green(gui.color.value())/255,blue(gui.color.value())/255]);
    beginShape(TRIANGLES);
    for (let i of this.vertices) {
      // not a good normal calculation
      normal(i.x, i.y, i.z);
      vertex(i.x + worldOffset.x, i.y + worldOffset.y, i.z + worldOffset.z, i.u, i.v);
    }
    endShape(CLOSE, this.instances);
    pop();
  }
}

class VertexInfo{
  constructor(x, y, z, u, v){
    this.x = x;
    this.y = y;
    this.z = z;
    this.u = u;
    this.v = v;
  }
}
  