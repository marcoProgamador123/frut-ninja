var faca,faca_img,ET,ET_img;
var frutas,fruta1,fruta2,fruta3,fruta4;
var sortiando_frutas,sorteio;
var G_frutas,G_alien;
var som_fruta,som_perdeu;
var placar;
var posicao;
var game_over,game_img;
var botao,botao_img;
// estados de jogo
var JOGAR,FIM,estadoJogo;
function preload(){
  faca_img = loadImage("knife.png"); 
  fruta1 = loadImage("fruit1.png");
  fruta2 = loadImage("fruit2.png");
  fruta3 = loadImage("fruit3.png");
  fruta4 = loadImage("fruit4.png");
  som_fruta = loadSound("knifeSwoosh.mp3");
  som_perdeu = loadSound("gameover.mp3");
  ET_img = loadAnimation("alien1.png","alien2.png");
  game_img = loadImage("gameover.png");
  botao_img = loadImage("botão.jpg");
}



function setup() {
  createCanvas(600, 600);
  
  botao = createSprite(300,400,20,20);
  botao.addImage(botao_img);
  botao.scale = 0.3;
  botao.visible = false;
  //ciando faca e animando a faca
  faca = createSprite(300,300,20,20);
  faca.addImage("faca ninja",faca_img);
  faca.scale = 0.7;
  
  //Grupos
  G_frutas = new Group();
  G_alien = new Group();
  placar=0;
  
  game_over = createSprite(300,300,20,20);
  game_over.addImage("fim de jogo",game_img);
  game_over.scale = 2;
  game_over.visible = false;
  
  
  JOGAR = 1;
  FIM = 0 ;
  estadoJogo = JOGAR;
}

function draw() {
  background("lightblue");
  
  
  
  
  if(faca.isTouching(G_alien)){
    G_alien.destroyEach();
    som_perdeu.play();
    
    estadoJogo = FIM;
  }
  if(estadoJogo===JOGAR){
    //frutas voadoras e alienigenas
    fatia_fruta();
    alien();
    // marcando pontos
    if(faca.isTouching(G_frutas)){
    G_frutas.destroyEach();
    som_fruta.play();
    placar = placar+2;
  }
    //movendo faca ninja da justiça
    faca.y = mouseY;
    faca.x = mouseX;
  }
  if(estadoJogo===FIM){
    game_over.visible = true;
    botao.visible = true;
    if(mousePressedOver(botao)){
      resetar();
    }
    textSize(30);
    fill("green")
    text("clique aqui",230,530);
  }
  //funcões
  
  drawSprites();
  textSize(20);
  text("Pontuação: "+placar,250,50);
  
}
function fatia_fruta(){
  if(frameCount%80===0){
    frutas = createSprite(500,100);
    frutas.y = Math.round(random(100,500));
    frutas.velocityX = -(7+placar/4);
    frutas.scale = 0.2;
    sortiando_frutas = Math.round(random(1,4));
    switch(sortiando_frutas){
      case 1: frutas.addAnimation("que fruta é essa?",fruta1);
        break;
      case 2: frutas.addAnimation("que fruta é essa?",fruta2);
        break;
      case 3: frutas.addAnimation("que fruta é essa?",fruta3);
        break;
      case 4: frutas.addAnimation("que fruta é essa?",fruta4);
        break;  
  }
   posicao = Math.round(random(1,2));
   switch(posicao){
     case 1: frutas.x = 600;
       frutas.velocityX = -(7+placar/4);
       break;
     case 2: frutas.x = 0;
       frutas.velocityX = (7+placar/4);
       break;
   } 
   
  frutas.lifetime = 130;
  G_frutas.add(frutas);
    
  }
  
}
function alien(){
  if(frameCount%200===0){
    ET  = createSprite(500,100,20,20);
    ET.addAnimation("O.V.N.I",ET_img);
    ET.velocityX = -(8+placar/10);
    ET.y = Math.round(random(100,500));
    G_alien.add(ET);
    ET.lifetime=130;
    
  }
 
  
}
function resetar(){
    game_over.visible = false;
    botao.visible = false;
    G_frutas.lifetime = 130;
    G_alien.lifetime = 130;
    placar=0;
  estadoJogo = JOGAR;
}