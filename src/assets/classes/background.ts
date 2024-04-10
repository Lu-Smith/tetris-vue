import Game from './game';

export default class Background {
    game: Game;
    scaledWidth: number;
    scaledHeight: number;
    gradient: CanvasGradient | null;

    constructor(game: Game) {
        this.game = game;
        this.scaledWidth = 400;
        this.scaledHeight = 560;
        this.gradient = null;
    }   
    draw(context: CanvasRenderingContext2D){
        context.save();
        context.clearRect(0, 0, this.game.width, this.game.height);

        //main background
        if (this.game.baseWidth >= this.game.canvas.width || this.game.baseHeight >= this.game.canvas.height) {
            this.gradient = context.createRadialGradient(this.game.canvas.width/2, this.scaledHeight/4, 20, this.game.canvas.width/2, this.scaledHeight/2, 200);
        } else {
            this.gradient = context.createRadialGradient(this.game.canvas.width/2, this.scaledHeight/4, 50, this.game.canvas.width/2, this.scaledHeight/2, 200);
        }
       
        this.gradient.addColorStop(0, '#141010');
        this.gradient.addColorStop(0.2, '#680747');
        this.gradient.addColorStop(0.4, '#c3195d');
        this.gradient.addColorStop(0.8, '#680747');
        this.gradient.addColorStop(1, '#141010');

        if (this.game.level % 2 === 0) {
            context.fillStyle = 'rgb(14, 1, 14)';
        } else {
            context.fillStyle = this.gradient;
        }

        context.fillRect((this.game.canvas.width * 0.5) - (this.scaledWidth * 0.5), 65, this.scaledWidth, this.scaledHeight);
        context.restore();
    }
    resize() {
        if (this.game.baseWidth >= this.game.canvas.width || this.game.baseHeight >= this.game.canvas.height) {
            this.scaledWidth = Math.min(this.game.baseWidth, this.game.canvas.width);
            this.scaledHeight = this.game.canvas.height * 0.78;
        } else {
            this.scaledWidth = this.game.baseWidth;
            this.scaledHeight = this.game.baseHeight;
        }
    }
}