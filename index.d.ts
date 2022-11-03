import { ListView, ViewBase } from "@nativescript/core";
import {
	Document,
	Element,
	ExtractEventNames,
	HTMLElement,
	HTMLElementTagNameMap,
	ItemTemplate,
	NSComponentsMap,
	NSComponentsWithTypeOfMap,
} from "dominative";
import {
	Component as VueComponent,
	ComponentPublicInstance,
	DefineComponent,
} from "vue";

export type Filter<
	Set,
	Needle extends string
> = Set extends `${Needle}${infer _X}` ? never : Set;

export type MapNativeViewEvents<T, C> = {
	[K in ExtractEventNames<T> as `on${Capitalize<K>}`]: (object: C) => void;
};

type NSComponentEventsMap = {
	[K in keyof NSComponentsMap]: MapNativeViewEvents<
		typeof NSComponentsWithTypeOfMap[K],
		NSComponentsMap[K]
	>;
};

export type IgnoredKeys =
	| "layout"
	| "requestLayout"
	| "measure"
	| "cssType"
	| "layoutNativeView"
	| "goBack"
	| "replacePage"
	| "firstElementChild"
	| "lastElementChild"
	| "children"
	| "childNodes"
	| "append"
	| "insertBefore"
	| "replaceChild"
	| "appendChild"
	| "textContent"
	| "removeChild"
	| "childElementCount"
	| "innerHTML"
	| "outerHTML"
	| "insertBefore"
	| "setAttribute"
	| "getAttribute"
	| "removeAttribute"
	| "removeAttributeNS"
	| "setAttributeNS"
	| "namespaceURI"
	| "dispatchEvent"
	| "getAttributeNS"
	| "localName"
	| "nodeName"
	| "tagName"
	| "attributes"
	| "hasChildNodes"
	| "firstChild"
	| "lastChild"
	| "replaceWith"
	| "cloneNode"
	| "remove"
	| "parentNode"
	| "height"
	| "width"
	| "appendData";

export type PickedNSComponentKeys<T> = Omit<
	T,
	Filter<
		keyof T,
		| "_"
		| "set"
		| "get"
		| "has"
		| "change"
		| "each"
		| "can"
		| "create"
		| "send"
		| "perform"
		| "go"
	>
>;

type OverrideProperties = {
	style: any;
	height: string | number;
	width: string | number;
};

export type DefineNSComponent<T> = DefineComponent<
	Omit<
		Partial<T>,
		| keyof ComponentPublicInstance
		| IgnoredKeys
		| keyof OverrideProperties
		| keyof PickedNSComponentKeys<T>
	>
>;

declare global {
	var document: Document;
}

declare module "@vue/runtime-core" {
	type NSDefaultComponents = {
		[K in keyof HTMLElementTagNameMap]: DefineNSComponent<
			HTMLElementTagNameMap[K] & NSComponentEventsMap[K]
		> &
			OverrideProperties;
	};
	export interface GlobalComponents extends NSDefaultComponents {
		"v-list": DefineNSComponent<
			ListView & {
				itemTemplateSelector: string;
				wrapper: VueComponent;
			} & NSComponentEventsMap["ListView"]
		> &
			OverrideProperties;
		"v-template": DefineNSComponent<
			ItemTemplate & {
				prop: string;
			}
		>;
	}
}

declare module "@dominative/vue" {
	import { App, Component, ComponentPublicInstance, Plugin } from "vue";

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
		$render(container?: HTMLElement): ComponentPublicInstance;

		/**
		 * Start the app as main entry
		 *
		 * **NOTE:** This method won't return! Codes below call to this function
		 * are not likely to run.
		 */
		$run(container?: HTMLElement): void;
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
	export function createNativeView<T = HTMLElement<ViewBase>>(
		rootComponent: Component,
		props?: Data,
		container?: element
	): T;
}
