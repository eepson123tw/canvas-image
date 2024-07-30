import { defineCustomElement } from "vue";
import CanvasImage from "@/components/CanvasImage.vue";

export const CanvasImage = defineCustomElement(CanvasImage);

declare module "vue" {
  export interface GlobalComponents {
    CanvasImage: typeof CanvasImage;
  }
}
