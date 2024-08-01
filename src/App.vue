<script setup lang="ts">
import { ref } from "vue";
import CanvasImage from "./components/CanvasImage.vue";
import img from "./assets/apple.png";

const data = ref({
  replaceContent: "g",
  fontSize: 10,
  font: "monospace",
  color: "#ffc0cb",
  radius: 0,
  source: img,
});
const canvasImage = ref<InstanceType<typeof CanvasImage> | null>(null);
</script>

<template>
  <CanvasImage
    ref="canvasImage"
    :source="data.source"
    :replace-content="data.replaceContent"
    :font-size="data.fontSize"
    :color="data.color"
  ></CanvasImage>

  <div v-for="(value, key) in data" :key="data.replaceContent">
    {{ key }} : {{ value }}
  </div>
</template>

<style scoped>
div {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
</style>
