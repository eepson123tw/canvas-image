import "./style.css";
import CanvasImage from "./components/CanvasImage.vue";
import { App as Application } from "vue";

const install = (app: Application) => {
  app.component("CanvasImage", CanvasImage);
};

const library = {
  install,
  CanvasImage,
};

export default library;
export { CanvasImage };
