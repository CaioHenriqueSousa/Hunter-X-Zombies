var bg,bgImg;
var player, shooterImg, shooter_shooting;
var zombie, zombieIMG, zombies
var heart1,heart1IMG,heart2,heart2IMG,heart3,heart3IMG
var vida = 3
var gameState = "PLAY"
var balaGroup
var bala
var nBalas = 20
var score = 0
var lose, win, explosion

function preload(){
  
  shooterImg = loadImage("assets/shooter_2.png")
  shooter_shooting = loadImage("assets/shooter_3.png")

  bgImg = loadImage("assets/bg.jpeg")
  zombieIMG = loadImage("assets/zombie.png")
  heart1IMG = loadImage("assets/heart_1.png")
  heart2IMG = loadImage("assets/heart_2.png")
  heart3IMG = loadImage("assets/heart_3.png")

  lose = loadSound("assets/lose.mp3")
  win = loadSound("assets/win.mp3")
  explosion = loadSound("assets/explosion.mp3")
}

function setup() {

  
  createCanvas(windowWidth,windowHeight);

  //adicionando a imagem de fundo
  bg = createSprite(displayWidth/2-20,displayHeight/2-40,20,20)
bg.addImage(bgImg)
bg.scale = 1.1
  

//criando o sprite do jogador
player = createSprite(displayWidth-1150, displayHeight-300, 50, 50);
 player.addImage(shooterImg)
   player.scale = 0.3
   player.debug = true
   player.setCollider("rectangle",0,0,300,300)

 balaGroup = new Group()

 zombies = new Group()

  heart1 = createSprite(width-100, height/2 - 300)
  heart1.addImage(heart1IMG)
  heart1.scale = 0.2
  heart1.visible = false
 
  heart2 = createSprite(width-100,height/2 - 300)
  heart2.addImage(heart2IMG)
  heart2.scale = 0.2
  heart2.visible = false

  heart3 = createSprite(width-100,height/2 - 300)
  heart3.addImage(heart3IMG)
  heart3.scale = 0.2
  heart3.visible = true
}

function draw() {
  background(0); 
  
 

  //movendo o jogador para cima e para baixo e tornando o jogo compatível com dispositivos móveis usando toques
if(keyDown("UP_ARROW")||touches.length>0){
  player.y = player.y-30
}
if(keyDown("DOWN_ARROW")||touches.length>0){
 player.y = player.y+30
}

if(player.isTouching(zombies)){
  vida -=1
  zombie.destroy()
}
if(vida == 2){
 heart3.visible = false
 heart2.visible = true
}

if(vida == 1){
  heart2.visible = false
  heart1.visible = true
}

if(vida == 0){
  heart1.visible = false
  gameOver()
}
//solte balas e mude a imagem do atirador para a posição de tiro quando a tecla de espaço for pressionada
if(keyWentDown("space")){
 
  player.addImage(shooter_shooting)
 
}

//o jogador volta à imagem original quando pararmos de pressionar a barra de espaço
else if(keyWentUp("space")){
  player.addImage(shooterImg)
}
zombieGroup()


if(keyWentDown("space")){

  bala = createSprite(displayWidth-1150, player.y,20,15)
  bala.velocityX = 20
  balaGroup.add(bala)
  nBalas -=1
  explosion.play()
}

if(zombies.isTouching(balaGroup)){
  zombie.destroy()
  balaGroup.destroyEach()
  score += 10
}
if( score >= 190){
  victory()
}
if(nBalas == 0){
  gameOver()
}
drawSprites();

textSize(20)
fill("white")
text("Balas:"+nBalas,width-600,height/2 - 300 )

textSize(20)
fill("white")
text("Pontos:"+score,width-1000,height/2 - 300 )
}

function zombieGroup() {
  if(frameCount %90 == 0) {
    zombie = createSprite(Math.round(random(width/2 +450,width/2 + 550)),Math.round(random(height/2 +50,height/2 + 200)))
    zombie.addImage(zombieIMG)
    zombie.velocityX = -10
    zombie.scale = 0.15
    zombie.lifetime = 1000
    zombies.add(zombie) 
    
  }
}

function gameOver(){
  background("black")
  bg.destroy()
  textSize(20)
 fill("red")
 text("Infelizmente você perdeu, mas não se preocupe, pode tentar novamente",width/2-200,height/2)
 lose.play()
 zombies.destroyEach()
 player.destroy()
 

 
}

function victory(){
  bg.destroy()
  textSize(20)
  fill("white")
  stroke("yellow")
  text("Wow, você é um bom caçador, Parabéns!!!",width/2-200,height/2)
  win.play()
  zombies.destroyEach()
 player.destroy()
}