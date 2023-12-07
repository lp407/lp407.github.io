class GUI{
  constructor(){
    this.gui = createDiv('')
    .position(0, 0)
    .size(185, 420)
    .style('font-size', '16px')
    .style('background', 'black')
    .style('z-index', '100')
    .style('border', '1px solid #00aaaa')
    .style('display', 'none')

    createDiv('OPTIONS')
      .parent(this.gui)
      .style('background', 'cyan')
      .style('padding', '2px')
      .style('text-align', 'center')
      .style('font-family', 'monospace');
    
    this.character = createDiv('character')
      .parent(this.gui)
      this.textStyle(this.character);
      this.ampSlider = createSlider(0, 0.8, 0.4, 0.01)
      .style('cursor', 'pointer')
      .size(80, 5)
      .parent(this.gui);
      this.speedShiftSlider = createSlider(0, 14.0, 3.0, 0.01)
      .style('cursor', 'pointer')
      .size(80, 5)
      .parent(this.gui);
      this.playerSpeed = createSlider(0, 80.0, 10.0, 0.01)
      .style('cursor', 'pointer')
      .size(80, 5)
      .parent(this.gui);
      this.seethroughCheckbox = createCheckbox('seethrough', false)
      .parent(this.gui)
      .style('cursor', 'pointer')
      .style('text-align', 'left')

    this.particles = createDiv('particles')
      .parent(this.gui)
      this.textStyle(this.particles);
      this.particleBehaviour = createSelect("particle behaviour")
        .parent(this.gui)
        .style('cursor', 'pointer')
        .style('margin', '2px')
        this.particleBehaviour.option('seaweed')
        this.particleBehaviour.option('figure8')
        this.particleBehaviour.option('random')
        this.particleBehaviour.option('spiral')
      this.particleNumber = createSlider(1, 1000000, 1000000, 1)
      .style('cursor', 'pointer')
      .size(180, 5)
      .parent(this.gui);
      this.numberofParticles = createDiv("amount: " + this.particleNumber.value())
      .parent(this.gui)
      this.textStyle(this.numberofParticles);
      this.particleSize = createSlider(0.1, 800.0, 30, 0.1)
      .style('cursor', 'pointer')
      .size(80, 5)
      .parent(this.gui);
      this.particleheight = createSlider(0.1, 800.0, 0.5, 0.1)
      .style('cursor', 'pointer')
      .style('margin', '5px')
      .size(80, 5)
      .parent(this.gui);
      this.color = createColorPicker('#ffffff')
      .parent(this.gui)
      .style('cursor', 'pointer')
      .size(160, 50)
      this.chooseColour = createCheckbox('choose colour', false)
      .parent(this.gui)

      
      this.terrain = createDiv('terrain')
      .parent(this.gui)
      this.textStyle(this.terrain);
      this.drawTerrainCheckbox = createCheckbox('draw terrain', false)
      .parent(this.gui)
      .style('cursor', 'pointer')

      this.box = createDiv('box')
      .parent(this.gui)
      this.textStyle(this.box);
      this.drawBox = createCheckbox('draw box', false)
      .parent(this.gui)
      .style('cursor', 'pointer')

      this.high = createDiv('high draw distance')
      .parent(this.gui)
      this.textStyle(this.high);
      this.highDraw = createCheckbox('draw distance', true)
      .parent(this.gui)
      .style('cursor', 'pointer')

      this.fps = createDiv('fps' + frameRate())
        .parent(this.gui)
        this.textStyle(this.fps);

      this.particleheight.changed(() => {
        particleEffect.remake();
      })
      this.particleSize.changed(() => {
        particleEffect.remake();
      })
      this.highDraw.changed(() => {
        player.resetCamera();
      })
      this.particleNumber.changed(() => {
        this.numberofParticles.html("amount: " + this.particleNumber.value());
        particleEffect.updateInstances();
      })
      this.hidden = true;
    }
    textStyle(div){
      div.style('color', 'white')
      .style('font-family', 'monospace')
      .style('font-size', '12px')
      .style('padding', '2px')
      .style('text-align', 'center')
    }
    update(){
      this.fps.html('fps: ' + int(frameRate()));
    }
  show(){
    if(this.hidden){
      this.gui.style('display', 'block');
      this.hidden = false;  
    }
    else{
      this.gui.style('display', 'none');
      this.hidden = true;
    }
  }
}



/*
  options are
  -amp (character)
  -speed (character)
  -seethrough (boolean character)
  -culling box
  -particle behaviour
  -draw terrain
  
  */