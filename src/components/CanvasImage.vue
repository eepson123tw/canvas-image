<template>
  <div class="container">
    <input
      type="file"
      accept="image/png, image/jpeg"
      @change="fileReadHandler"
    />
    <canvas id="target" ref="canvasRef"></canvas>
  </div>
</template>

<script setup lang="ts">
import { useFile } from "../composables/file";
import { onMounted, ref, withDefaults } from "vue";

export interface Props {
  replaceContent: string;
  fontSize?: number;
  font?: string;
  color?: string;
  radius?: number;
  source?: string;
  canvasWidth?: number;
  canvasHeight?: number;
}

const props = withDefaults(defineProps<Props>(), {
  replaceContent: "啊",
  font: "monospace",
  fontSize: 2,
  canvasHeight: 400,
  canvasWidth: 600,
});

const { readFile, fetchImageAsFile } = useFile();
const canvasRef = ref<HTMLCanvasElement | null>(null);

const fileReadHandler = async (e: Event) => {
  const target = e.target as HTMLInputElement;
  if (target && target.files) {
    const file = target.files[0];
    const fileURI = await readFile(file);
    drawCanvas(fileURI);
  }
};

const drawCanvas = (dataURI: string) => {
  if (!canvasRef.value) return;
  const img = new Image();
  img.onload = function () {
    const canvas = canvasRef.value!;
    const ctx = canvas.getContext("2d");
    canvas.width = img.width > props.canvasWidth ? props.canvasWidth : 600;
    canvas.height = img.height > props.canvasHeight ? props.canvasHeight : 400;
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas before drawing
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.font = `${props.fontSize}px ${props.font}`;
    ctx.fillStyle = props.color || "black";
    const threshold = 240;

    for (let y = 0; y < imageData.height; y += 4) {
      for (let x = 0; x < imageData.width; x += 4) {
        const index = (y * imageData.width + x) * 4; // Get the pixel index
        const r = imageData.data[index];
        const g = imageData.data[index + 1];
        const b = imageData.data[index + 2];
        const alpha = imageData.data[index + 3];

        // Check if the pixel is not transparent and not white
        if (alpha > 128 && (r < threshold || g < threshold || b < threshold)) {
          ctx.fillText(props.replaceContent, x, y); // Draw '1' at the pixel position
        }
      }
    }
  };
  img.src = dataURI;
};

onMounted(async () => {
  if (props.source) {
    const fileURI = await fetchImageAsFile(props.source);
    drawCanvas(fileURI);
  }
});
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
