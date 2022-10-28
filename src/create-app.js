import { document } from 'dominative'
import { registerAll } from "./register.js"
import { Application, ViewBase } from "@nativescript/core"
import { createApp as createAppVue } from "vue"

const installedPlugins = [];

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

	applyPlugins(app);

	// Shouldn't expect this method to return
	// https://v7.docs.nativescript.org/core-concepts/application-lifecycle#application-run
	app.$run = container => Application.run({
		create: () => app.$render(container)
	})

	return app
}

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

export { createApp }
