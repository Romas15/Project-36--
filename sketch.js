// var dog, happyDog, dogIM, database, foodS, foodStock;
// var foodObj, foodCount, fedTime, lastFed, feed, time;

// var milk1, milk2, milk3, milk4, milk5, milk6, milk7, milk8, milk9;

// var milk10,
//   milk11milk12,
//   milk13,
//   milk14,
//   milk15,
//   milk16,
//   milk17,
//   milk18,
//   milk19,
//   milk20;

// function preload() {
//   dogIM = loadImage("Dog.png");
//   happyDog = loadImage("happydog.png");
//   milkImg = loadImage("Milk.png");
// }

// function setup() {
//   createCanvas(800, 500);

//   database = firebase.database();

//   dog = createSprite(500, 280, 30, 20);
//   dog.addImage(dogIM);
//   dog.scale = 0.2;

//   foodObj = new Food();

//   foodStock = database.ref("Food");
//   foodStock.on("value", readStock);

//   addFood = createButton("Add food");
//   addFood.position(470, 45);
//   addFood.mousePressed(addFoods);

//   input = createInput("Your Dog's Name");
//   input.position(250, 70);

//   feed = createButton("Feed your Dog");
//   feed.position(550, 45);
//   feed.mousePressed(feedDog);
// }

// function draw() {
//   background(46, 139, 87);

//   // if ((mouseX = feed.position.x)) {
//   //   writeStock(foodStock);
//   //   dog.addImage(happyDog);
//   // }

//   drawSprites();
//   textSize(15);
//   fill("blue");
//   stroke("red");
//   text("Note: Press the Up Arrow to Feed Drago Milk!!", 380, 70);
//   text("Food Remaining : " + foodStock, 420, 200);

//   textSize(15);
//   fill("white");
//   stroke(5);
//   if (fedTime >= 12) {
//     text("Last Fed: " + (fedTime % 12) + " PM", 150, 60);
//   } else if (fedTime === 0) {
//     text("Last Fed: 12 AM", 150, 60);
//   } else {
//     text("Last Fed: " + time + " AM", 150, 60);
//   }
// }

// function readStock(data) {
//   foodStock = data.val();
// }

// function writeStock(x) {
//   if (x <= 0) {
//     x = 0;
//   } else {
//     x = x - 1;
//   }

//   database.ref("/").update({
//     Food: x,
//   });
// }

// // function feedDog() {
// //   dog.addImage(happyDog);

// //   writeStock(foodStock);
// //   dog.addImage(happyDog);

// //   foodObj.updateFoodStock(foodObj.getFoodStock() - 1);
// //   database.ref("/").update({
// //     FoodStock: foodObj.getFoodStock(),
// //     LastFed: hour(),
// //   });
// // }

// // function feedDog() {
// //   dog.addImage(happyDog);
// //   milk1.visible = false;

// //   time = hour();
// //   foodObj.updateFoodStock(foodObj.getFoodStock() - 1);
// //   database.ref("/").update({
// //     Food: foodObj.getFoodStock(),
// //     //FeedTime: hour(),
// //   });
// // }
// //function to update food stock and last fed time
// function feedDog() {
//   dog.addImage(happyDog);

//   foodObj.updateFoodStock(foodObj.getFoodStock());
//   database.ref("/").update({
//     Food: foodObj.getFoodStock(),
//     FeedTime: hour(),
//   });
// }

// //function to add food in stock
// function addFoods() {
//   foodS++;
//   database.ref("/").update({
//     Food: foodObj.getFoodStock(),
//   });
// }
//Create variables here
var dog, sadDog, happyDog, database;
var foodS, foodStock;
var fedTime, lastFed;
var feed, addFood;
var foodObj;

function preload() {
  sadDog = loadImage("Dog.png");
  happyDog = loadImage("happyDog.png");
}

function setup() {
  database = firebase.database();
  createCanvas(800, 400);

  foodObj = new Food();

  foodStock = database.ref("Food");
  foodStock.on("value", readStock);

  dog = createSprite(600, 200, 150, 150);
  dog.addImage(sadDog);
  dog.scale = 0.15;

  input = createInput();
  input.position(350, 45);

  button = createButton("submit");
  button.position(500, 45, 65);
  button.mousePressed(greet);

  greeting = createElement("h3", " ");
  greeting.position(590, 180);

  feed = createButton("Feed the dog");
  feed.position(600, 95);
  feed.mousePressed(feedDog);

  addFood = createButton("Add Food");
  addFood.position(700, 95);
  addFood.mousePressed(addFoods);
}

function draw() {
  background("green");
  foodObj.display();

  fedTime = database.ref("FeedTime");
  fedTime.on("value", function (data) {
    lastFed = data.val();
  });

  fill("blue");
  textSize(15);

  text("Your Dog's Name!! ", 350, 40);
  if (lastFed >= 12) {
    text("Last Feed At : " + (lastFed % 12) + " PM", 160, 60);
  } else if (lastFed == 0) {
    text("Last Fed At : 12 AM", 160, 60);
  } else {
    text("Last Fed At : " + lastFed + " AM", 160, 60);
  }

  drawSprites();
}

//function to read food Stock
function readStock(data) {
  foodS = data.val();
  foodObj.updateFoodStock(foodS);
}

//function to update food stock and last fed time
function feedDog() {
  dog.addImage(happyDog);

  foodObj.updateFoodStock(foodObj.getFoodStock() - 1);
  database.ref("/").update({
    Food: foodObj.getFoodStock(),
    FeedTime: hour(),
  });
}

//function to add food in stock
function addFoods() {
  if (foodObj.foodStock < 20 || foodObj.foodStock > 0) {
    foodS++;
    database.ref("/").update({
      Food: foodS,
    });
  }
}
function greet() {
  const name = input.value();
  greeting.html(" It's " + name + " ! ");
  input.value("");

  for (let i = 0; i < 200; i++) {
    push();
    fill("red");
    translate(random(width), random(height));
    rotate(random(2 * PI));
    text(name, 0, 0);
    pop();
  }
}
