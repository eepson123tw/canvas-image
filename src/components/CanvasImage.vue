<template>
  <div class="container">
    <input type="file" accept="image/png, image/jpeg" />
    <canvas id="target"></canvas>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  src?: string;
  replaceContent?: string;
  isGray?: boolean;
  raduis?: number;
  source?: {
    image: string;
  };
}>();

console.log(props);
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
}
canvas {
  border: 1px solid #000;
  margin-top: 20px;
}
</style>
