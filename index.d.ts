declare module "@dominative/vue" {
  import { App, Component, Element } from "vue";
  type Data = Record<String, unknown>;

  /**
     * Creates an application instance.
     * 
        Example:
        ```js
        import { createApp } from 'vue'
        import App from './App.vue'

        const app = createApp(App)

        app.$run(document.createElement("ContentView"));
     * ```
     */
  export function createApp(
    rootComponent: Component,
    props?: Data
  ): App<Element> & {
    /**
     * Renders the app instance.
     */
    $run(container: Element): void;
  };
}
