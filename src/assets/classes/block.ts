import Game from './game';

export default class Block {
    game: Game;
    x: number;
    y: number;
    side: number;

    constructor (game: Game) {
        this.game = game;
        this.x = 0;
        this.y = 0;
        this.side = 10;
    }

    draw(context: CanvasRenderingContext2D){
        context.save();

        context.fillStyle = 'white';
        context.fillRect(this.x, this.y, this.side, this.side);
        context.restore();
    }
}