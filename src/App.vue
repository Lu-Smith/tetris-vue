<template>
  <div class="App">
    <header>
      <h1>Tetris</h1>
      <button class="mode" @click="toggleMode">
        <span v-if="darkMode" class="material-symbols-outlined">
        emoji_objects
        </span>
        <span v-if="!darkMode" class="material-symbols-outlined">
        nightlight
        </span>
      </button>
    </header>
    <DescriptionComponent v-if="!gameRunning" />
    <button @click="startNewGame" v-if="!gameRunning">Start</button>
    <MainGame v-if="gameRunning" :gameRunning="gameRunning" @toggleHome="toggleHome"/>
    <InstructionComponent v-if="!gameRunning" />
    <FooterComponent v-if="!gameRunning" />
  </div>
</template>

<script setup lang="ts">
  import FooterComponent from './components/FooterComponent.vue';
  import DescriptionComponent from './components/DescriptionComponent.vue';
  import InstructionComponent from './components/InstructionComponent.vue';
  import MainGame from './components/MainGame.vue';

  import { ref } from 'vue';

  const gameRunning = ref(false);
  const darkMode = ref(true);

  const startNewGame = () => {
    gameRunning.value = !gameRunning.value;
  }

  const toggleHome = () => {
    gameRunning.value = false;
  }

  const toggleMode = () => {
    darkMode.value = !darkMode.value;
  }
</script>

<style scoped>
  .App {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    height: 96vh;
    width: 100vw;
    overflow: hidden;
  }

  header {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    gap: 30px;
    height: 60px;
    width: 100vw;
    padding: 5px 20px;
  }
</style>
