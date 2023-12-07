class Player{
    constructor(){
      this.playerCamera = createCamera();
      this.playerCamera.perspective(PI / 3.0, width / height, 0.1, 1000000);

      this.forwards = createVector(1, 0, 0);
      // this is necessary in order to get the fresnel effect as p5 combines ModelViewMatrix
      this.modelMatrix = new p5.Matrix;
      this.modelMatrix.set([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]);
      this.shader = playerShader;
    }
    resetCamera(){
      this.playerCamera = createCamera();
      if (gui.highDraw.checked())
        this.playerCamera.perspective(PI / 3.0, width / height, 0.1, 1000000);
    }
    updateForwardsDirection(){
      let turnSpeed = 0.05;

      let currentForwards = this.forwards;
      let cameraPos = createVector(this.playerCamera.eyeX, this.playerCamera.eyeY, this.playerCamera.eyeZ);
      let cameraForward = createVector(0,0,0).sub(cameraPos).normalize();
      let targetForwards = cameraForward;
      this.forwards.set(lerp(currentForwards.x, targetForwards.x, turnSpeed), lerp(currentForwards.y, targetForwards.y, turnSpeed), lerp(currentForwards.z, targetForwards.z, turnSpeed));
    }
    input(){
      let inputX = 0;
      let inputY = 0;
      let inputZ = 0;
      let speed = gui.playerSpeed.value();
      if (keyIsDown(87)){ // W
        inputX += this.forwards.x * -speed;
        inputY += this.forwards.y * -speed;
        inputZ += this.forwards.z * -speed;
        this.updateForwardsDirection();
      }
      if (keyIsDown(83)){ // D
        inputX += this.forwards.x * speed;
        inputY += this.forwards.y * speed;
        inputZ += this.forwards.z * speed;
      }
      if (keyIsDown(65)){ // A
        inputX += this.forwards.z * -speed;
        inputY += this.forwards.y * -speed;
        inputZ += this.forwards.x * speed
  
      }
      if (keyIsDown(68)){ // S
        inputX += this.forwards.z * speed;
        inputY += this.forwards.y * speed;
        inputZ += this.forwards.x * -speed;
      }
      let input = createVector(inputX, inputY, inputZ);
      worldOffset.add(input);
    }
    setUniforms(){
      this.shader.setUniform('uModelMatrix', this.modelMatrix.mat4);
      this.shader.setUniform("uCamPos", [this.playerCamera.eyeX, this.playerCamera.eyeY, this.playerCamera.eyeZ]);
      this.shader.setUniform("uFrameCount", frameCount/100);
      this.shader.setUniform("uSeethrough", gui.seethroughCheckbox.checked() ? true : false);
      this.shader.setUniform("uSpeed", gui.speedShiftSlider.value());
      this.shader.setUniform("uAmplitude", gui.ampSlider.value());
      this.shader.setUniform("uForwards", [this.forwards.x, this.forwards.y, this.forwards.z]);
    }
    render(){
      // this.getCameraValues();
      push();
      // this.updateForwardsDirection();
      applyMatrix(...this.modelMatrix.mat4);
      shader(this.shader);
      this.setUniforms();
      noStroke();
      // translate(this.x, this.y, this.z);
      sphere(50, 400, 400);
      pop();
    }
  }