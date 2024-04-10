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

    constructor (game: Game) {
        this.game = game;
        this.width = this.game.columns * this.game.blockSize;
        this.height = this.game.rows * this.game.blockSize;
        this.x = this.game.canvas.width * 0.5 - this.width * 0.5;
        this.y = -this.height;
        this.speedX = 0;
        this.speedY = this.game.speed;
        this.blocks= [];
        this.create();
    }
    render(context: CanvasRenderingContext2D) {
        if (this.y < 200) this.speedY += this.game.speed;
            this.speedY = 0;
        if (this.x < 0 || this.x > 200)  {
            this.speedX *= -1;
            this.speedY = this.game.blockSize;
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
        this.width = this.game.columns * this.game.blockSize * 0.75;
        this.height = this.game.rows * this.game.blockSize * 0.75;
        this.x = this.game.canvas.width * 0.5 - this.width * 0.5;
    }
}