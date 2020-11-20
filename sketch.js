//variables
var fairy,fairyImg;
var coin,coinImg;
var coin2,coin2Img;
var star,starImg;
var meteor,meteorImg;
var backgroungImg,sky;
var score=0;
var obstacleGroup,coingroup,stargroup,coin2group;
var gamestate="START";

function preload(){
  //loading images
  backgroundImg=loadImage("sky.jpg");
  fairyImg=loadImage("tinkerbell.png");
  coinImg=loadImage("coin.png");
  starImg=loadImage("star.jpg");
  meteorImg=loadImage("meteor.jpg");
  coin2Img=loadImage("coin.png");
}

function setup(){
  //creating canvas
  createCanvas(650,350);
  
  //creating a fairy
  fairy = createSprite(150,200,10,70);
  fairy.addImage(fairyImg);
  fairy.scale=0.3;
  fairy.debug=false;
  fairy.setCollider("circle",40,-10,50);
  
  //making a starry sky
  sky = createSprite(300,300,600,600);
  sky.addImage(backgroundImg);
  sky.velocityX=-(2+score/2);
  
  //increasing the fairy's depth
  fairy.depth=sky.depth;
  fairy.depth=fairy.depth+1;
 
  //creating groups
  obstacleGroup =new Group();
  coingroup=new Group();
  stargroup=new Group();
  coin2group=new Group();
}
function draw(){
  //setting the backgroun color
  background("black");
  if(gamestate==="START"){
    fill("white");
    textSize(18);
    text("Press space to start",30,340);
    fill("yellow");
    textSize(20);
    text("Captain hook,the Pirate, has thrown all of Peter Pan's Treasure in",30,100);
    text("Space. So his companion, Tinkerbell the fairy, is tasked to bring all",30,125);
    text("the Treasure back to NeverLand. While Peter is Battlng Hook, help ",30,147);
    text("Tinkerbell to fly using up and down arrow keys. Collect all the coins",30,170);
    text("and touch all of stars to boost Tinkerbell's energy. But make sure",30,195);
    text("she doesn't hit the falling meteors.",30,220);
    fill("white");
    text("Coins = 2 Points",450,315);
    text("Stars = 5 Points",450,340);
    if(keyDown("space")){
      gamestate="PLAY";
    }
  }
  else if(gamestate==="PLAY"){
    
 //calling functions
  points();
  meteors();

    //making sky reset
  if (sky.x<500){
    sky.x=sky.width/2
  }
  
  //making fairy move
  if (keyDown("up_arrow")){
    
    fairy.y=fairy.y-4;
  }
  
   if (keyDown("down_arrow")){
    fairy.y=fairy.y+4;
  }
   if(coingroup.isTouching(fairy)){
    coingroup.destroyEach();
    score=score+2;
  }
   if(coin2group.isTouching(fairy)){
    coin2group.destroyEach();
    score=score+2;
  }
    if(stargroup.isTouching(fairy)){
    stargroup.destroyEach();
    score=score+5;
  }
   if(obstacleGroup.isTouching(fairy)){
     gamestate="END";
  }
      
  drawSprites();
  }else if(gamestate==="END"){
    textSize(24);
    fill("yellow");
    text("Game over you lost",230,180);
    textSize(18);
    fill("white");
    text("Press space to replay",250,220);
    if(keyDown("space")){
      gamestate="PLAY";
      score=0
    }
  }
  
  //printing score
  textSize(20);
  fill("yellow");
  text("score:"+score,560,30);
}
 //function for coins and stars
function points(){
   if (frameCount%350===0){
     coin = createSprite(650,200,10,70);
     coin.addImage(coinImg);
     coin.scale=0.1;
     coin.velocityX=-(2+score/10);
     coin.y=Math.round(random(50,300))
     coingroup.add(coin);
   }
  if (frameCount%300===0){
     coin2 = createSprite(650,200,10,70);
     coin2.addImage(coin2Img);
     coin2.scale=0.1;
     coin2.velocityX=-(2+score/10);
     coin2.y=Math.round(random(50,300))
     coin2group.add(coin2);
   }
  if(frameCount%400===0){
    star = createSprite(650,100,10,70);
    star.addImage(starImg);
    star.scale=0.2;
    star.velocityX=-(2+score/10);
    star.y=Math.round(random(50,300))
    stargroup.add(star);
  }
}

//function for obstacles
function meteors(){
  if(frameCount%600===0){
  meteor=createSprite(650,100,10,70);
  meteor.addImage(meteorImg);
  meteor.scale=0.2;
  meteor.velocityX=-(4+score/100);
  meteor.y=Math.round(random(50,300));
  obstacleGroup.add(meteor);
  }
}