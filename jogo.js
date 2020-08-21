console.log("Flappy bird");

const yRandomGetReady = (Math.random() + 1) * -150;
let frames = 0;

const sprites = new Image();
sprites.src = "assets/sprites.png";

const hitSound = new Audio();
hitSound.src = "assets/effects/hit_sound.mp3";

const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");

const background = {
  spriteX: 390,
  spriteY: 0,
  width: 275,
  height: 204,
  X: 0,
  Y: canvas.height - 204,

  draw() {
    context.fillStyle = "#70c5ce";
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.drawImage(
      sprites,
      background.spriteX,
      background.spriteY,
      background.width,
      background.height,
      background.X,
      background.Y,
      background.width,
      background.height
    );
    context.drawImage(
      sprites,
      background.spriteX,
      background.spriteY,
      background.width,
      background.height,
      background.X + this.width,
      background.Y,
      background.width,
      background.height
    );
  },
};

function createFloor() {
  const floor = {
    spriteX: 0,
    spriteY: 610,
    width: 224,
    height: 112,
    X: 0,
    Y: canvas.height - 112,
    update() {
      if (colision(globais.flappyBird, globais.floor)) {
        return;
      }
      const moviment = 1;
      const floorReset = floor.width / 2;
      floor.X = floor.X - moviment;
      if (floor.X <= -112) {
        floor.X = floor.X + floorReset;
      }
    },
    draw() {
      context.drawImage(
        sprites,
        floor.spriteX,
        floor.spriteY, // Sprite X e sprite Y
        floor.width,
        floor.height, // Tamanho do crop na sprite
        floor.X,
        floor.Y, // Posicionamento dentro do canvas
        floor.width,
        floor.height // Tamnanho da sprite no canvas
      );
      context.drawImage(
        sprites,
        floor.spriteX,
        floor.spriteY, // Sprite X e sprite Y
        floor.width,
        floor.height, // Tamanho do crop na sprite
        floor.X + this.width,
        floor.Y, // Posicionamento dentro do canvas
        floor.width,
        floor.height // Tamnanho da sprite no canvas
      );
    },
  };
  return floor;
}

const getReady = {
  spriteX: 134,
  spriteY: 0,
  width: 174,
  height: 152,
  X: canvas.width / 2 - 174 / 2,
  Y: 80,
  draw() {
    context.drawImage(
      sprites,
      this.spriteX,
      this.spriteY, // Sprite X e sprite Y
      this.width,
      this.height, // Tamanho do crop na sprite
      this.X,
      this.Y, // Posicionamento dentro do canvas
      this.width,
      this.height // Tamnanho da sprite no canvas
    );
  },
};

function colision(flappyBird, floor) {
  const colisionFloor = flappyBird.Y + flappyBird.height;

  if (colisionFloor >= floor.Y) {
    return true;
  }
}

function createFlappy() {
  const flappyBird = {
    spriteX: 0,
    spriteY: 0,
    width: 33,
    height: 24,
    X: 10,
    Y: 200,
    speed: 0,
    gravity: 0.35,
    jumpHeight: -4.6,
    moves: [
      { spriteX: 0, spriteY: 0 },
      { spriteX: 0, spriteY: 26 },
      { spriteX: 0, spriteY: 52 },
    ],
    currentFrame: 0,
    updateCurrentFrame() {
      const frameRetitionInterval = 10;
      const intervalReached = frames % frameRetitionInterval == 0;
      if (intervalReached) {
        const incrementBase = 1;
        const increment = incrementBase + flappyBird.currentFrame;
        const repeat = flappyBird.moves.length;
        flappyBird.currentFrame = increment % repeat;
      }
    },
    jump() {
      if (flappyBird.Y > 0) {
        this.speed = this.jumpHeight - 1.0;
      } else {
        console.log("Perdeu");
        return;
      }
    },
    update() {
      if (colision(flappyBird, globais.floor)) {
        console.log("Perdeu");
        //hitSound.play();

        setTimeout(() => {
          changeScreen(screen.begin);
        }, 500);
        return;
      }

      this.speed = this.speed + this.gravity;
      flappyBird.Y = flappyBird.Y + this.speed;
    },
    draw() {
      flappyBird.updateCurrentFrame();
      const { spriteX, spriteY } = flappyBird.moves[flappyBird.currentFrame];

      context.drawImage(
        sprites,
        spriteX,spriteY, // Sprite X e sprite Y
        flappyBird.width, flappyBird.height, // Tamanho do crop na sprite
        flappyBird.X, flappyBird.Y, // Posicionamento dentro do canvas
        flappyBird.width, flappyBird.height // Tamnanho da sprite no canvas
      );
    },
  };
  return flappyBird;
}

const globais = {};

let activateScreen = {};

function changeScreen(newScreen) {
  activateScreen = newScreen;

  if (activateScreen.incialize) {
    activateScreen.incialize();
  }
}

function createPipes() {
  const pipes = {
    width: 52,
    height: 400,
    floor: {
      spriteX: 0,
      spriteY: 169,
    },
    heaven: {
      spriteX: 52,
      spriteY: 169,
    },
    space: 80,
    draw(){
    pipes.pair.forEach(function(pair) {

            yRandom  = pair.y;
    
            const pipeHeaveX = pair.x;
            const pipeHeaveY = yRandom;

            //Heave pipes
            context.drawImage(
                sprites,
                pipes.heaven.spriteX, pipes.heaven.spriteY,
                pipes.width, pipes.height,
                pipeHeaveX, pipeHeaveY,
                pipes.width, pipes.height
            );
    
            const pipeFloorX = pair.x;
            const pipefloorY = pipes.height + pipes.space + yRandom;
    
            //Floor pipes
            context.drawImage(
                sprites,
                pipes.floor.spriteX, pipes.floor.spriteY,
                pipes.width, pipes.height,
                pipeFloorX, pipefloorY,
                pipes.width, pipes.height
            ),

            pair.pipeHeaven = {
              x: pipeHeaveX,
              y: pipes.height + pipeHeaveY
            },
            pair.pipeFloor = {
              x: pipeFloorX,
              y: pipefloorY
            }
        })
    },
    colisionDetection(pair){
      const flappyHead = globais.flappyBird.Y;
      const flappyFoot = globais.flappyBird.Y + globais.flappyBird.height;

      if(globais.flappyBird.X >= pair.x){          
          if(flappyHead <= pair.pipeHeaven.y) {
            return true
          }
          if(flappyFoot >= pair.pipeFloor.y) {
            return true
          }
      }
      return false 
    },
    pair: [],
    update() {
            if(activateScreen == screen.game){                
                const frameMarker = frames % 100 == 0;
                if(frameMarker){
                    console.log("Passaram 100 frames")
                    pipes.pair.push(
                        {
                            x: canvas.width,
                            y: (Math.random() + 1) * -150,
                        }
                    )
                }
    
                pipes.pair.forEach(function(pair) {
                    pair.x = pair.x - 2;

                    if (pipes.colisionDetection(pair)){
                        changeScreen(screen.begin);
                    }
    
                    if(pair.x <= -50){
                        pipes.pair.shift()
                    }
                })
            }else {
                pipes.pair.push({
                    x: canvas.width - 55,
                    y: yRandomGetReady
                })
            }
        }
    };
  return pipes;
}

const screen = {
  begin: {
    incialize() {
      globais.flappyBird = createFlappy();
      globais.floor = createFloor();
      globais.pipe = createPipes();
    },
    draw() {
      background.draw(); // Desenha a imagem de fundo
      globais.pipe.draw();
      globais.floor.draw(); // Desenha o chao
      globais.flappyBird.draw();
      getReady.draw();
    },
    click() {
      changeScreen(screen.game);
    },
    keypress() {
      changeScreen(screen.game);
    },
    update() {
      globais.floor.update();
      globais.pipe.update()
    },
  },
  game: {
    draw() {
      background.draw(); // Desenha a imagem de fundo
      globais.pipe.draw();
      globais.floor.draw(); // Desenha o chao
      globais.flappyBird.draw();
    },
    click() {
      globais.flappyBird.jump();
    },
    keypress() {
      globais.flappyBird.jump();
    },
    update() {
      globais.flappyBird.update();
      globais.floor.update();
      globais.pipe.update()
    },
  },
};

function loop() {
  activateScreen.draw();
  activateScreen.update();

  frames = frames + 1;
  requestAnimationFrame(loop);
}

window.addEventListener("click", function () {
  if (activateScreen.click) {
    activateScreen.click();
  }
});

window.addEventListener("keypress", function () {
  if (activateScreen.keypress) {
    activateScreen.keypress();
  }
});

changeScreen(screen.begin);
loop();
