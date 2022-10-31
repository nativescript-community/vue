declare module "@dominative/vue" {
	import { App, Component, Plugin } from "vue";
	import { View, ViewBase } from "@nativescript/core";

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
		 * Renders the application instance.
		 */
		$run(container?: Element): void;
	};

	/**
   * Registers a plugin to be used across app instances. It is recommended
   * to use this method instead of `app.use` so that different screens &
   * layouts will share plugins.
   * 
   * Example:
   * 
   * ```js
   import {createApp, addGlobalPlugin} from '@dominative/vue';
   import App from './App.vue';

   import {createPinia} from "pinia";
   const pinia = createPinia()

   addGlobalPlugin(pinia)
    
   const app = createApp(App);

   app.$run();
   ```
   */
	export function addGlobalPlugin(plugin: Plugin, ...options: any[]);

	/**
	 * Creates an app instance from a Vue component and
	 * returns the NativeScript View.
	 */
	export function createNativeView<T = ViewBase | Element>(
		rootComponent: Component,
		props?: Data,
		container?: element
	): T;
}
