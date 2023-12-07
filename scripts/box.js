function drawBox(){
    if (gui.drawBox.checked()){
    push();
    shader(boxShader);
    box(2000);
    pop();
    }
}