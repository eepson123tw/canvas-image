import "./style.css";
import component, * as namedExports from "./index.esm";

Object.entries(namedExports).forEach(([exportName, exported]) => {
  if (exportName !== "default") component[exportName] = exported;
});

export default component as typeof component &
  Exclude<typeof namedExports, "default">;
