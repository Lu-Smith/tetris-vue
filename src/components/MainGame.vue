<template>
    <div class="gameContainer">
        <div class="buttonsContainer">
            <button 
            v-if="!playing"
            @click="startGame"
            class="go">Go</button>
            <button 
            v-if="playing"
            @click="pauseGame">Pause</button>
            <button 
            v-if="!playing"
            @click="newGame">Play Again</button>
            <button 
            v-if="!playing"
            @click="handleToggleHome"
            class="homeButton">
                <span class="material-symbols-outlined">
                home
                </span>
            </button>
        </div>
        <canvas ref="gameCanvas" :class="changeBackground ? 'canvas2' : 'canvas1'"></canvas>
        <AssetsComponent /> 
    </div>
</template>

<script setup lang="ts">
import AssetsComponent from './AssetsComponent.vue';
import Game from '../assets/classes/game';
import { ref, nextTick } from 'vue';

const animationFrameId: { value?: number } = {};
let game: Game | null = null;   
const gameCanvas = ref<HTMLCanvasElement | null>(null);

const props = defineProps(['gameRunning']);
const emit = defineEmits(['toggleHome']);

const playing = ref(true);
const changeBackground = ref(false);

const handleToggleHome = () => {
    emit('toggleHome');
}

const animate = (playingValue: boolean) => {
    let lastTimeStamp = performance.now();
    const context = gameCanvas.value?.getContext('2d');

    const loop = () => {
        const currentTimeStamp = performance.now();
        const deltaTime = playingValue ? currentTimeStamp - lastTimeStamp : 0;
        lastTimeStamp = currentTimeStamp;
 
        if (props.gameRunning && game) {
            if (context) game.render(context, deltaTime, playingValue);
            if (playing.value) {
                animationFrameId.value = requestAnimationFrame(loop);
            }
            if (game.gameOver) {
                playing.value = false;
            }
        }  
        if (game && game.level % 2 === 0) {
            changeBackground.value = true;
        } else {
            changeBackground.value = false;
        }
    }   
    if (playingValue) {
        animationFrameId.value = requestAnimationFrame(loop);
    }
}

const initializeCanvasAndAnimate = () => {
    if (gameCanvas.value) {
        gameCanvas.value.width = window.innerWidth * 0.9;
        gameCanvas.value.height = window.innerHeight;
        game = new Game(gameCanvas.value);
        game.resize(gameCanvas.value.width, gameCanvas.value.height)
    }
    animate(playing.value);
}

const newGame = () => {
    playing.value = true;
    nextTick(initializeCanvasAndAnimate);
}

if (props.gameRunning) {
    newGame();
}

const startGame = () => {
    playing.value = true;
    animate(playing.value);
}

const pauseGame = () => {
    playing.value = false;
    if (animationFrameId.value !== undefined) {
        cancelAnimationFrame(animationFrameId.value);
    }
    animate(playing.value);
}
</script>