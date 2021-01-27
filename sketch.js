var canvas, backgroundImage;

var gameState = 0;
var playerCount;
var allPlayers;
var distance = 0;
var database;
var cycle1img,cycle2img,cycle3img,cycle4img;
var form, player, game;
var cycles;
var cycle1,cycle2,cycle3,cycle4;
var track;
var ground;
function preload(){
  cycle1img=loadImage("cyc1.png");
  cycle2img=loadImage("cyc2.jpg");
  cycle3img=loadImage("cyc3.jpg")
  cycle4img=loadImage("cyc4.jpg");
  track=loadImage("track.jpg");
  
  ground=loadImage("ground.png");


}


function setup(){
  canvas = createCanvas(displayWidth - 20, displayHeight-30);
  database = firebase.database();
  game = new Game();
  game.getState();
  game.start();
}


function draw(){
  
  if(playerCount === 4){
    game.update(1);
  }
  if(gameState === 1){
    clear();
    game.play();
  }
  if(gameState===2){
    game.end();
  }
}
