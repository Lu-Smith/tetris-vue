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

    constructor (game: Game) {
        this.game = game;
        this.width = this.game.columns * this.game.blockSize;
        this.height = this.game.rows * this.game.blockSize;
        this.x = this.game.canvas.width * 0.5 - this.width * 0.5;
        this.y = -this.height;
        this.speedX = 0;
        this.speedY = 0;
        this.blocks= [];
        this.nextBlockTrigger = false;
        this.create();
    }
    render(context: CanvasRenderingContext2D) {
        if (this.y < this.game.background.scaledHeight - this.height) { 
            this.speedY = this.game.speed;
        } else if (this.y + this.height >= this.game.background.bottom) {
            this.speedY = 0;
            if (!this.nextBlockTrigger) {
                // const lastBlock = this.blocks[this.blocks.length - 1];
                // this.game.background.bottom = this.game.background.bottom - lastBlock.y  - this.game.blockSize;
                this.game.newBlock();
                this.nextBlockTrigger = true;
            }
        };
        if (this.x < 0 || this.x > 200)  {
            this.speedX *= -1;
        }
        this.x += this.speedX;
        this.y += this.speedY;
        this.blocks.forEach(block => {
            block.update(this.x, this.y);
            block.draw(context);
        })
    }
    create() {
        for (let y = 0; y < this.game.rows; y++ ) {
            for(let x = 0; x < this.game.columns; x++) {
                let blockX = x * this.game.blockSize;
                let blockY = y * this.game.blockSize;
                this.blocks.push(new Block(this.game, blockX, blockY));
            }
        } 
    }
    resize() {
        this.nextBlockTrigger = false;
        this.width = this.game.columns * this.game.blockSize;
        this.height = this.game.rows * this.game.blockSize;
        this.x = this.game.canvas.width * 0.5 - this.width * 0.5;
        this.speedY = 0;
        this.speedX = 0;
    }
}