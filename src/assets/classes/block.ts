import Game from './game';

export default class Block {
    game: Game;
    side: number;
    x: number;
    y: number;
    height: number;
    weight: number;

    constructor (game: Game) {
        this.game = game;
        this.side = 20;
        this.x = (this.game.canvas.width * 0.5 - this.side * 0.5);
        this.y = 25;
        this.height = this.game.background.scaledHeight + 62 - this.side;
        this.weight = this.game.background.scaledWidth * 0.5 - this.side;
        
    }
    update() {
        if (this.y < this.height) this.y += this.game.speed;
    }
    draw(context: CanvasRenderingContext2D){
        context.save();
        context.fillStyle = 'blue';
        context.lineWidth = 2;
        context.strokeStyle = 'black';
        context.fillRect(this.x, this.y, this.side, this.side);
        context.strokeRect(this.x, this.y, this.side, this.side);
        context.restore();
    }
    resize() {
        this.x = (this.game.canvas.width * 0.5 - this.side * 0.5);
        this.height = this.game.background.scaledHeight + 62 - this.side;
        this.weight = this.game.background.scaledWidth * 0.5 - this.side;
    }
}