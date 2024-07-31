import { App, DefineComponent, Plugin } from "vue";

// Import vue component
import CanvasImage from "./components/CanvasImage.vue";

// Define typescript interfaces for installable component
type InstallableComponent = DefineComponent<{}, {}, any> & {
  install: Exclude<Plugin["install"], undefined>;
};

// Default export is installable instance of component.
// IIFE injects install function into component, allowing component
// to be registered via Vue.use() as well as Vue.component(),
export default /*#__PURE__*/ ((): InstallableComponent => {
  // Assign InstallableComponent type
  const installable = CanvasImage as unknown as InstallableComponent;

  // Attach install function executed by Vue.use()
  installable.install = (app: App) => {
    app.component("CanvasImage", installable);
  };
  return installable;
})();
