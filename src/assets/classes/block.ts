import Game from './game';

export default class Block {
    game: Game;
    x: number;
    y: number;
    positionX: number;
    positionY: number;
    color: string;

    constructor (game: Game, positionX: number, positionY: number, color: string) {
        this.game = game;
        this.x = 0;
        this.y = 0;
        this.positionX = positionX;
        this.positionY = positionY;
        this.color = color;
    }
    update(x: number, y: number) {
        this.x = x + this.positionX;
        this.y = y + this.positionY;
    } 
    draw(context: CanvasRenderingContext2D){
        context.save();
        context.fillStyle = this.color; 
        context.lineWidth = 2;
        context.strokeStyle = 'black';
        context.fillRect(this.x - this.game.blockSize * 0.5, this.y, this.game.blockSize, this.game.blockSize);
        context.strokeRect(this.x - this.game.blockSize * 0.5, this.y, this.game.blockSize, this.game.blockSize);
        context.restore();
    }
}