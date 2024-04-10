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
        <canvas ref="gameCanvas"></canvas>
        <AssetsComponent /> 
    </div>
</template>

<script setup lang="ts">
import AssetsComponent from './AssetsComponent.vue';
import { ref } from 'vue';

const props = defineProps(['gameRunning']);
const emit = defineEmits(['toggleHome']);

const playing = ref(true);

const handleToggleHome = () => {
    emit('toggleHome');
}

const newGame = () => {
    playing.value = true;
}

if (props.gameRunning) {
    newGame();
}

const startGame = () => {
    playing.value = true;
}

const pauseGame = () => {
    playing.value = false;
}
</script>