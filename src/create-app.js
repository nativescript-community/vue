import { registerComponents } from ".";
import { Application } from "@nativescript/core";
import { createApp as createAppVue } from "vue";
import { install } from "./navigation";

export function createApp(rootComponent, props) {
  const app = createAppVue(rootComponent, props);
  registerComponents(app);
  install(app);
  app._mount = app.mount;
  app.mount = () => {
    Application.run({
      create: () => {
        document.documentElement.actionBarHidden = true;
        return document;
      },
    });
    return app._mount(document);
  };
  return app;
}
