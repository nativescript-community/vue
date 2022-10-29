import { document } from 'dominative'
import { registerAll } from "./register.js"
import { Application, ViewBase } from "@nativescript/core"
import { createApp as createAppVue } from "vue"

const installedPlugins = [];

const applyPlugins = (app) => {
	// Use ._use internally to add plugins to not add duplicates to installedPlugins
	app._use = app.use;
	app.use = (plugin, options) => {
		installedPlugins.push({plugin, options})
		app._use(plugin, options)
	}

	if (installedPlugins.length > 0) {
		installedPlugins.forEach((plugin) => {
			app._use(plugin.plugin, plugin.options)
		})
	}
}

const createApp = (rootComponent, props) => {
	const app = createAppVue(rootComponent, props)
	registerAll(app)

	app.$render = (container) => {
		if (!container) {
			container = document.createDocumentFragment()
			const { $el } = app.mount(container)
			if (!($el instanceof ViewBase)) {
				throw new Error('[DOMiVUE] App root can only have one element! Provide a container or use only one root element entry.')
			}
			return $el
		}

		app.mount(container)
		return container
	}

	// Shouldn't expect this method to return
	// https://v7.docs.nativescript.org/core-concepts/application-lifecycle#application-run
	app.$run = container => Application.run({
		create: () => app.$render(container)
	})

	return app
}

const createNativeView = (rootComponent, props, container) => {
	const app = createApp(rootComponent, props)
	return app.$render(container)
}

export { createApp, createNativeView }
