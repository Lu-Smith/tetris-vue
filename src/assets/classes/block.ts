import Game from './game';

export default class Block {
    game: Game;
    x: number;
    y: number;
    positionX: number;
    positionY: number;

    constructor (game: Game, positionX: number, positionY: number) {
        this.game = game;
        this.x = 0;
        this.y = 0;
        this.positionX = positionX;
        this.positionY = positionY;
        
    }
    update(x: number, y: number) {
        this.x = x + this.positionX;
        this.y = y + this.positionY;
        this.resize();
    }
    draw(context: CanvasRenderingContext2D){
        context.save();
        context.fillStyle = 'blue';
        context.lineWidth = 2;
        context.strokeStyle = 'black';
        context.fillRect(this.x, this.y, this.game.blockSize, this.game.blockSize);
        context.strokeRect(this.x, this.y, this.game.blockSize, this.game.blockSize);
        context.restore();
    }
    resize() {
   
    }
}