import Game from './game';
import Block from './block';

export default class Blocks {
    game: Game;
    x: number;
    y: number;
    height: number;
    width: number;
    blocks: Block[];
    speedX: number;
    speedY: number;
    nextBlockTrigger: boolean;
    rows: number;
    columns: number

    constructor (game: Game) {
        this.game = game;
        this.rows = this.game.rows;
        this.columns = this.game.columns;
        this.width = this.columns * this.game.blockSize;
        this.height = this.rows * this.game.blockSize;
        this.x = this.game.canvas.width * 0.5;
        this.y = -this.height;
        this.speedX = 0;
        this.speedY = 0;
        this.blocks= [];
        this.nextBlockTrigger = false;
        this.create();
    }
    update() {
        if ((this.game.keys.indexOf('Enter') > -1 && this.speedY !== 0)) {
            this.game.rotation += 1;
            //rotation
            if (this.game.rotation % 2 === 0) {
                this.rows = this.game.rows;
                this.columns = this.game.columns;
            } else {
                this.rows = this.game.columns;
                this.columns = this.game.rows;
            }
            this.blocks = []; 
            this.width = this.columns * this.game.blockSize;
            this.height = this.rows * this.game.blockSize;
            this.create();
        }
        //horizontal movement
        if (this.speedY !== 0) {
            if ((this.game.keys.indexOf('ArrowLeft') > -1)) {
                 this.speedX = -this.game.blockSize;
            } else if ((this.game.keys.indexOf('ArrowRight') > -1)) {
                 this.speedX = this.game.blockSize;
            } else {
                this.speedX = 0;
            }
            if (this.game.left === 1) {
                 this.speedX = -this.game.left;
            } else if (this.game.right === 1) {
                 this.speedX = this.game.right; 
            }
            this.x += this.speedX;
            //horizontal boundries
            if (this.x <= this.game.canvas.width * 0.5 - this.game.background.scaledWidth * 0.5 + this.game.blockSize) {
                this.x = this.game.canvas.width * 0.5 - this.game.background.scaledWidth * 0.5 + this.game.blockSize;
            } else if (this.x >= this.game.canvas.width * 0.5 + this.game.background.scaledWidth * 0.5 - this.width + this.game.blockSize) {
                this.x = this.game.canvas.width * 0.5 + this.game.background.scaledWidth * 0.5 - this.width + this.game.blockSize;
            }
        }
    }
    render(context: CanvasRenderingContext2D) {
        //veritcal movement
        if (this.y < this.game.background.bottom - this.height) { 
            if ((this.game.keys.indexOf('ArrowDown') > -1))   {
                    this.speedY = 10 * this.game.speed;
            } else {
                this.speedY = this.game.speed;
            }
            this.y += this.speedY;
        //vertical boundries
        } else if (this.y >= this.game.background.bottom - this.height) {
            this.y = this.game.background.bottom - this.height;
            this.speedY = 0;
            if (!this.nextBlockTrigger) {
                setTimeout(() => {
                    this.game.newBlock();
                }, 1000)
                this.nextBlockTrigger = true;
            }
        };

        this.blocks.forEach(block => {
            block.update(this.x, this.y);
            block.draw(context);
        })
    }
    create() {
        for (let y = 0; y < this.rows; y++ ) {
            for(let x = 0; x < this.columns; x++) {
                let blockX = x * this.game.blockSize - this.game.blockSize * 0.5;
                let blockY = y * this.game.blockSize;
                let color = ''; 
                if (this.game.rows === 1) {
                    color = 'blue';
                } else if (this.game.rows === 2) {
                    color = 'orange';
                } else if (this.game.rows === 3) {
                    color = 'green';
                } else {
                    color = 'yellow';
                }
                this.blocks.push(new Block(this.game, blockX, blockY, color));
            }
        } 
    }
    resize() {
        this.nextBlockTrigger = false;
        this.width = this.columns * this.game.blockSize;
        this.height = this.rows * this.game.blockSize;
        this.x = this.game.canvas.width * 0.5;
        this.speedY = 0;
        this.speedX = 0;
    }
}