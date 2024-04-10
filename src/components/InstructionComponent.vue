<template>
    <div :class="showInfo ? 'instructionsContainer' : 'instructionsContainerShow'">
        <button @click="showInstructions" v-if="!showInfo" class="infoButton">Instructions</button>
        <button @click="showInstructions" v-if="showInfo" class="infoButton">X </button>
        <div v-if="showInfo">
            <h3>Instructions</h3>
            <ol>
                <li>
                    <h4>Press <span>Enter</span> or <span>Tap</span> to go rotate the block.</h4>
                </li>
                <li> 
                    <h4>Press <span>Space</span> key or <span>Swipe Down</span> to go faster.</h4>
                </li>
                <li> 
                    <h4>Press <span>Left Arrow</span> or <span>Swipe Left</span> to move left.</h4>
                </li>
                <li> 
                    <h4>Press <span>Right Arrow</span> or <span>Swipe Right</span> to move right.</h4>
                </li>
            
                <li> 
                    <h4>Press <span>Play Again</span> to restart.</h4>
                </li>
            </ol>
        </div>
    </div>
</template>

<script setup lang='ts'>
import { ref } from 'vue';

const showInfo = ref(false);

const showInstructions = () => {
    showInfo.value = !showInfo.value;
}
</script>