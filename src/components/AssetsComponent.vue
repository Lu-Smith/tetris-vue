<template>
    <div class="assets">
        <audio :src=Lost id="lose"></audio>
        <audio :src=Crack id="crack"></audio>
    </div>
</template>

<script setup lang="ts">
    import Crack from '../assets/media/crack.wav';
    import Lost from '../assets/media/lose.wav';
</script>