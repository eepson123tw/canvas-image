import { DefineComponent, Plugin } from "vue";

declare const CanvasImage: DefineComponent<{}, {}, any> & {
  install: Exclude<Plugin["install"], undefined>;
};
export default CanvasImage;
