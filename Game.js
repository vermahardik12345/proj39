class Game {
  constructor(){
   
    

  }

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }

    cycle1 = createSprite(100,200);
    cycle1.addImage(cycle1img);
    cycle1.scale=0.2;
    cycle2 = createSprite(300,200);

    cycle2.addImage(cycle2img);
    cycle2.scale=0.2;
    cycle3 = createSprite(500,200);
    
    cycle3.addImage(cycle3img);
    cycle3.scale=0.2;
    cycle4 = createSprite(700,200);
    
    cycle4.addImage(cycle4img);
    cycle4.scale=0.2;
    cycles = [cycle1, cycle2, cycle3, cycle4];
  }

  play(){
    form.hide();

    Player.getPlayerInfo();
    
    if(allPlayers !== undefined){
      //var display_position = 100;
      background(ground);
      image(track,0,-displayHeight*4,displayWidth,displayHeight*5);
      //index of the array
      var index = 0;

      //x and y position of the cars
      var x = 180;
      var y;

      for(var plr in allPlayers){
        //add 1 to the index for every loop
        index = index + 1 ;

        //position the cars a little away from each other in x direction
        x = x + 200;
        //use data form the database to display the cars in y direction
        y = displayHeight - allPlayers[plr].distance;
        cycles[index-1].x = x;
        cycles[index-1].y = y;

        if (index === player.index){
          cycles[index - 1].shapeColor = "red";
          camera.position.x = displayWidth/2;
          camera.position.y = cycles[index-1].y
        }
       
        //textSize(15);
        //text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position)
      }

    }

    if(keyIsDown(UP_ARROW) && player.index !== null){
      player.distance +=10
      player.update();

    }
    if(player.distance>4080){
    gameState=2;
    }

    drawSprites();
  }
  end(){
    console.log("GAMEENDED");
  }
}
