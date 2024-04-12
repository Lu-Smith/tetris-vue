import Background from './background';
import Blocks from './blocks';

export default class Game {
    canvas: HTMLCanvasElement;
    width: number;
    height: number;
    baseWidth: number;
    baseHeight: number;
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
    //mobile-keyboard
    keys: string[];
    touchStartX: number;
    swipeDistance: number;
    left: number;
    right: number;

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        this.width = this.canvas.width;
        this.height = this.canvas.height;
        this.blockSize = 20;
        this.baseWidth =  18 * this.blockSize;
        this.baseHeight = 26 * this.blockSize;
        //game logic
        this.gameOver = false;
        this.level = 1;
        //background
        this.background = new Background(this);
        //block 
        this.blocks = [];
        this.blocks.push(new Blocks(this));
        this.rows = 1;     
        this.columns = 1;
        this.speed = 0;
        //timer
        this.timer = 0;
        this.eventTimer = 0;
        this.eventInterval = 100;
        this.eventUpdate = false;
        //mobile-keybord
        this.keys = [];
        this.touchStartX = 0;
        this.swipeDistance = 50;
        this.left = 0;
        this.right = 0;

        this.resize(window.innerWidth, window.innerHeight);

        window.addEventListener('resize', e => {
            const target = e.currentTarget as Window;
            if (target) {
                this.resize(target.innerWidth, target.innerHeight);
            }
        });

      // Keyboard controls
window.addEventListener('keydown', e => {
    if (this.keys.indexOf(e.key) === -1) this.keys.push(e.key);
    this.blocks.forEach(block => {
        block.update();
    });
});

window.addEventListener('keyup', e => {
    const index = this.keys.indexOf(e.key);
    if (index > -1) this.keys.splice(index, 1);
});

// Touch controls
this.canvas.addEventListener('touchstart', e => {
    this.touchStartX = e.changedTouches[0].pageX;
});

this.canvas.addEventListener('touchmove', e => {
    e.preventDefault();
});

this.canvas.addEventListener('touchend', e => {
    if (!this.gameOver) {
        const touchEndX = e.changedTouches[0].pageX;
        const swipeDistance = touchEndX - this.touchStartX;

        if (Math.abs(swipeDistance) > (this.swipeDistance * 2)) {
            if (swipeDistance > 0) {
                this.right = this.blockSize;
                this.left = 0;
            } else {
                this.left = this.blockSize;
                this.right = 0;
            }
        }
    }
});

    }
    resize(width: number, height: number) {  
        this.canvas.width = width;
        this.canvas.height = height;
        this.width = this.canvas.width;
        this.height = this.canvas.height;
        this.timer = 0;
        this.background.resize();
        this.blockSize = 20;
        this.blocks.forEach(block => {
            block.resize();
        });
        // this.columns = 1;
        // this.rows = 1;
        this.speed = 1;
        this.blocks = [];
        if (this.blocks.length < 1) this.newBlock();
    }
    render(context: CanvasRenderingContext2D, deltaTime: number, playing: boolean) {
        //background
        this.background.draw(context);
        //block
        this.speed = 1;
        this.blocks.forEach(block => {
            block.render(context);
            if (this.gameOver) {
                this.blocks = [];
            }
        });
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
        this.rows = Math.floor(Math.random() * 3 + 2);
        this.blocks.push(new Blocks(this));
    }
}