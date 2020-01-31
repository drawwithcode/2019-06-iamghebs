//variables to manage the images
var geni, lamp, lib0, lib1, ora, bianco, wrong, vinto;

//variables to manage the sprites
var genio, lampada, libreria, orologio;

//flag for the questions and the arrat to store the DOM selection
var domande = 0, dom;

//variables to manage the questions
var dom1, dom2, dom3;

function preload() {
  adlib = loadFont('assets/adlib.ttf');
  geni = loadImage("assets/55genio.png");
  lamp = loadImage("assets/55lamp.png");
  lib0 = loadImage("assets/55lib0.png");
  lib1 = loadImage("assets/55lib1.png");
  ora = loadImage("assets/55orologio.png");
  bianco = loadImage("assets/bianco.png");
  wrong = loadImage("assets/wrong.png")
  vinto = loadImage("assets/vinto.png")
}

function setup() {
  var myCanvas = createCanvas(windowWidth, windowHeight);

  //every sprite is positioned and shown
  lampada = new Sprite(lamp, width / 2 - lamp.width / 2, 3 / 4 * height - lamp.height / 2);
  lampada.show();

  orologio = new Sprite(ora, 100, 100);
  orologio.show();

  libreria = new Sprite(lib0, width - 600, 150);
  libreria.show();

  //unless the genie's one who has to be called
  genio = new Sprite(geni, (width + geni.width) / 2 - 20, (height - geni.height) / 2 - 75);

  //div element for the text and the questions
  var titolo = createElement('h1', "Come realizzare i tuoi sogni?");
  titolo.style("user-select: none; position: absolute; top: 5%; left: 50%; transform: translate(-50%); color: black; text-align: center; font-family: adlib; font-size: 3vh");

  dom1 = createDiv("Viaggia in tutto il mondo");
  dom1.addClass("domanda");
  dom1.style("user-select: none; position: absolute; top: 20%; left: 36%; padding: 2vh 2vh 2vh 2vh; transform: translate(-50%); color: black; text-align: center; font-family: adlib; font-size: 3vh; background-color: #cccccc");
  dom2 = createDiv("Vivere in una capanna in riva al lago");
  dom2.addClass("domanda");
  dom2.style("user-select: none; position: absolute; top: 30%; left: 36%; padding: 2vh 2vh 2vh 2vh; transform: translate(-50%); color: black; text-align: center; font-family: adlib; font-size: 3vh; background-color: #cccccc");
  dom3 = createDiv("Parlare molte lingue");
  dom3.addClass("domanda");
  dom3.style("user-select: none; position: absolute; top: 40%; left: 36%; padding: 2vh 2vh 2vh 2vh; transform: translate(-50%); color: black; text-align: center; font-family: adlib; font-size: 3vh; background-color: #cccccc");

  //hiding all the questions
  dom = selectAll(".domanda");
  for (i = 0; i < dom.length; i++) {
    dom[i].hide();
  }
}

function draw() {
  //clickng on the lamp the genie will appear
  lampada.clicked(comparsaGenio);

  //if the questiong flag is toggled each element of the array is shown
  if (domande == 1) {
    for (i = 0; i < dom.length; i++) {
    dom[i].show();
  }
    //every click is wrong besides the one on the shelf
    dom1.mouseClicked(mostraX);
    dom2.mouseClicked(mostraX);
    dom3.mouseClicked(mostraX);
    orologio.clicked(mostraX);
    genio.clicked(mostraX);
    libreria.clicked(mostraV);
  }
}

function Sprite(_img, _x, _y) {
  //initializing the sprite with its avatar and position
  this.img = _img;
  this.x = _x;
  this.y = _y;

  //clicked inside of the object lets you manage different functions
  this.clicked = function(_funz) {
    var d = dist(mouseX, mouseY, this.x + this.img.width / 2, this.y + this.img.height / 2)
    if (d < 150 && mouseIsPressed) {
      print("clicked");
      _funz();
    }
  }

  //general spawning function
  this.show = function() {
    image(this.img, this.x, this.y);
  }
}

//when the genie appears a small change happens to the library
function comparsaGenio() {
  genio.show();
  libreria.img = lib1;
  libreria.show();
  //toggling questions' flag too
  domande = 1;
}

//if the answer is wrong an x appear and the page refresh after 3s
function mostraX() {
  image(wrong, (width - wrong.width) / 2, (height - wrong.height) / 2);
  print("XXX");
  setTimeout(location.reload(), 3000);
}

//otherwise it will stay still and it will show the final message
function mostraV() {
  image(vinto, (width - wrong.width) / 2, (height - wrong.height) / 2);
  print("VVV");
  var vittoria = createDiv("Bravo! Solamente studiando ed imparando <BR> potrai realizzare i tuoi desideri!");
  vittoria.style("user-select: none; position: absolute; top: 6%; left: 50%; transform: translate(-50%); color: black; text-align: center; font-family: adlib; font-size: 3vh; background-color: white;");
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
} 
