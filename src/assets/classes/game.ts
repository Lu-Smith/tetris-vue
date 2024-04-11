import Background from './background';
import Blocks from './blocks';

export default class Game {
    canvas: HTMLCanvasElement;
    width: number;
    height: number;
    baseWidth: number;
    baseHeight: number;
    ratioHeight: number;
    ratioWidth: number;
    //game logic
    gameOver: boolean;
    level: number;
    //background
    background: Background;
    //block
    blocks: Blocks[];
    blockSize: number;
    columns: number;
    rows: number;
    speed: number;
    //timer
    timer: number;
    eventTimer: number;
    eventInterval: number;
    eventUpdate: boolean;

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        this.width = this.canvas.width;
        this.height = this.canvas.height;
        this.baseHeight = 540;
        this.baseWidth = 380;
        this.ratioHeight = 0;
        this.ratioWidth = 0;
        //game logic
        this.gameOver = false;
        this.level = 1;
        //background
        this.background = new Background(this);
        //block 
        this.blocks = [];
        this.blocks.push(new Blocks(this));
        this.blockSize = 20 * this.ratioHeight;
        this.columns = 1;
        this.rows = 1;
        this.speed = 0;
        //timer
        this.timer = 0;
        this.eventTimer = 0;
        this.eventInterval = 100;
        this.eventUpdate = false;

        this.resize(window.innerWidth, window.innerHeight);

        window.addEventListener('resize', e => {
            const target = e.currentTarget as Window;
            if (target) {
                this.resize(target.innerWidth, target.innerHeight);
            }
        });
    }
    resize(width: number, height: number) {  
        this.canvas.width = width;
        this.canvas.height = height;
        this.width = this.canvas.width;
        this.height = this.canvas.height;
        this.ratioHeight = Number((this.height / this.baseHeight).toFixed(2));
        this.ratioWidth = Number((this.width / this.baseWidth).toFixed(2));
        this.timer = 0;
        this.background.resize();
        this.blockSize = 20 * this.ratioHeight;
        this.blocks.forEach(block => {
            block.resize();
        });
        this.columns = 1;
        this.rows = 1;
        this.speed = 2;
        this.blocks = [];
        if (this.blocks.length < 1) this.newBlock();
    }
    render(context: CanvasRenderingContext2D, deltaTime: number, playing: boolean) {
        //background
        this.background.draw(context);
        //block
        this.blocks.forEach(block => {
            block.render(context);
            if (this.gameOver) {
                this.blocks = [];
            }
        });
        this.speed = 2;
        //timer
        if (!this.gameOver && playing) {
            this.timer += deltaTime;
        }
        //text
        this.drawStatusText(context);
    }
    formatTimer() {
        let seconds = Math.floor(this.timer / 1000);
        let minutes = Math.floor(seconds / 60);
        seconds = seconds % 60;
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
    drawStatusText(context: CanvasRenderingContext2D) {
        context.save();
        context.font = 'bold 12px Roboto';
        context.fillStyle = '#1a1a1a';
        context.fillText('Timer: ' + this.formatTimer(), 38, 20); 
    
        if (this.gameOver) {
            context.textAlign = 'center';
            context.font = '50px Impact';
            context.fillStyle = 'white';
            context.fillText('Game Over!', this.width * 0.5, this.height * 0.4);
            context.font = '15px Impact';
            context.fillText('Your score: ' + ' - Level: ' + this.level, this.width * 0.5, this.height * 0.52);
        }
        context.restore();
    }
    newBlock() {
        this.blocks.push(new Blocks(this));
    }
}