import Game from './game';

export default class Block {
    game: Game;
    x: number;
    y: number;
    side: number;

    constructor (game: Game) {
        this.game = game;
        this.side = 10;
        this.x = (this.game.canvas.width * 0.5 - this.side * 0.5);
        this.y = 35;
        
    }
    draw(context: CanvasRenderingContext2D){
        context.save();
        context.fillStyle = 'white';
        context.fillRect(this.x, this.y, this.side, this.side);
        context.restore();
    }
    resize() {
        this.x = (this.game.canvas.width * 0.5 - this.side * 0.5);
    }
}