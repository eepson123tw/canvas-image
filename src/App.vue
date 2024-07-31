<script setup lang="ts">
import CanvasImage from "./components/CanvasImage.vue";
import img from "./assets/apple.png";
</script>

<template>
  <CanvasImage :source="img" :replace-content="'a'"></CanvasImage>
</template>
