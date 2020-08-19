console.log('Flappy bird');

const sprites = new Image();

sprites.src = 'assets/sprites.png';

const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');

    const background = {
        spriteX: 390,
        spriteY: 0,
        width: 275,
        height: 204,
        X: 0,
        Y: canvas.height - 204,

        draw (){
            context.fillStyle = '#70c5ce'
            context.fillRect(0, 0, canvas.width, canvas.height)
            context.drawImage(
                sprites,
                background.spriteX, background.spriteY,
                background.width, background.height,
                background.X, background.Y,
                background.width, background.height
            );
            context.drawImage(
                sprites,
                background.spriteX, background.spriteY,
                background.width, background.height,
                (background.X + this.width), background.Y,
                background.width, background.height
            );
        }
            
    }

    const floor = {
        spriteX: 0,
        spriteY: 610,
        width: 224,
        height: 112,
        X: 0,
        Y: canvas.height - 112,
        
        draw (){
                context.drawImage(
                    sprites, 
                    floor.spriteX, floor.spriteY, // Sprite X e sprite Y
                    floor.width, floor.height, // Tamanho do crop na sprite
                    floor.X, floor.Y, // Posicionamento dentro do canvas
                    floor.width, floor.height, // Tamnanho da sprite no canvas
                    );
                context.drawImage(
                    sprites, 
                    floor.spriteX, floor.spriteY, // Sprite X e sprite Y
                    floor.width, floor.height, // Tamanho do crop na sprite
                    (floor.X + this.width), floor.Y, // Posicionamento dentro do canvas
                    floor.width, floor.height, // Tamnanho da sprite no canvas
                );
            }
    }

    const getReady = {
        spriteX: 134,
        spriteY: 0,
        width: 174,
        height: 152,
        X: (canvas.width / 2) - 174 / 2,
        Y: 80,
        draw (){
            context.drawImage(
                sprites,
                this.spriteX, this.spriteY, // Sprite X e sprite Y
                this.width, this.height, // Tamanho do crop na sprite
                this.X, this.Y, // Posicionamento dentro do canvas
                this.width, this.height, // Tamnanho da sprite no canvas
            )
        }
    }
        
    const flappyBird = {
        spriteX: 0,
        spriteY: 0,
        width: 33,
        height: 24,
        X: 10,
        Y: 240,
        speed: 0,
        gravity: 0.35,
        update() {
            this.speed = this.speed + this.gravity;
            flappyBird.Y = flappyBird.Y + this.speed;
        },
        draw (){
            context.drawImage(
                sprites, 
                flappyBird.spriteX, flappyBird.spriteY, // Sprite X e sprite Y
                flappyBird.width, flappyBird.height, // Tamanho do crop na sprite
                flappyBird.X, flappyBird.Y, // Posicionamento dentro do canvas
                flappyBird.width, flappyBird.height, // Tamnanho da sprite no canvas
            );
        }
    }

    let activateScreen = {};
    function changeScreen(newScreen) {
        activateScreen = newScreen;
    }

    const screen = {
        begin: {
            draw() {
                background.draw(); // Desenha a imagem de fundo
                floor.draw(); // Desenha o chao
                flappyBird.draw();
                getReady.draw();
            },
            update(){

            },
            click(){
                changeScreen(screen.game);
            }
        },
        game: {
            draw() {
                background.draw(); // Desenha a imagem de fundo
                floor.draw(); // Desenha o chao
                flappyBird.draw();
            },
            update() {
                flappyBird.update()
            }
        }
    };

    function loop(){
        
        activateScreen.draw();
        activateScreen.update();

        requestAnimationFrame(loop);
    }

    window.addEventListener('click', function(){
        if(activateScreen.click){
            activateScreen.click();
        }
    })

changeScreen(screen.begin);
loop();