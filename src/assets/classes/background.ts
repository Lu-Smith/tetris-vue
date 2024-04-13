import Game from './game';

export default class Background {
    game: Game;
    scaledWidth: number;
    scaledHeight: number;
    gradient: CanvasGradient | null;
    bottom: number;

    constructor(game: Game) {
        this.game = game;
        this.scaledWidth = 18 * this.game.blockSize;
        this.scaledHeight = 26 * this.game.blockSize;
        this.gradient = null;
        this.bottom = this.game.canvas.height - (this.game.canvas.height - 63 - this.scaledHeight);
    } 
    drawGrid(context: CanvasRenderingContext2D) {
        context.save();
        context.fillStyle = '#fff';
        context.strokeStyle = '#fff'; 
        context.lineWidth = 1; 
        context.font = '8px Arial'; 
    
        // Draw vertical grid lines and display numbers
        for (let i = 0; i < this.game.grid.length; i++) {
            for (let j = 0; j < this.game.grid[i].length; j++) {
                // Calculate position to display number
                const x = (this.game.canvas.width * 0.5) - (this.scaledWidth * 0.5) + j * this.game.blockSize + this.game.blockSize / 2;
                const y = 65 + i * this.game.blockSize + this.game.blockSize / 2;
    
                // Draw number
                context.fillText(this.game.grid[i][j].toString(), x - 3, y + 4);
    
                // Draw vertical grid line
                context.beginPath();
                context.moveTo((this.game.canvas.width * 0.5) - (this.scaledWidth * 0.5) + j * this.game.blockSize, 65);
                context.lineTo((this.game.canvas.width * 0.5) - (this.scaledWidth * 0.5) + j * this.game.blockSize, this.scaledHeight + 65);
                context.stroke();
            }
        }
    
        // Draw horizontal grid lines
        for (let i = 0; i <= this.scaledHeight; i += this.game.blockSize) {
            context.beginPath();
            context.moveTo((this.game.canvas.width * 0.5) - (this.scaledWidth * 0.5), 65 + i);
            context.lineTo((this.game.canvas.width * 0.5) - (this.scaledWidth * 0.5) + this.scaledWidth, 65 + i);
            context.stroke();
        }
    
        context.restore();
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
        this.drawGrid(context);
        context.restore();
    }
    resize() {
        if (this.game.baseWidth >= this.game.canvas.width || this.game.baseHeight >= this.game.canvas.height) {
            this.scaledWidth = Math.min(this.game.baseWidth, this.game.canvas.width);
            this.scaledHeight = this.game.canvas.height * 0.78;
            this.bottom = this.game.canvas.height - (this.game.canvas.height - 63 - this.scaledHeight);
        } else {
            this.scaledWidth = this.game.baseWidth;
            this.scaledHeight = this.game.baseHeight;
            this.bottom = this.game.canvas.height - (this.game.canvas.height - 63 - this.scaledHeight);
        }
    }
}