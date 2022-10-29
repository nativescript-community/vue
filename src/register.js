import VList from "./v-list.js"
import VTemplate from "./v-template.js"
import { installNavigation } from "./navigation.js"

const registeredPlugins = []

const usePlugin = (plugin, options) => {
	registeredPlugins.push({plugin, options})
}

const applyPlugins = (app) => {
	for (let {plugin, options} of registeredPlugins) {
		app.use(plugin, options)
	}
}

const registerComponents = (app) => {
	app.component("v-template", VTemplate)
	app.component("v-list", VList)
}

const registerAll = (app) => {
	registerComponents(app)
	installNavigation(app)
	applyPlugins(app)
}

export { registerComponents, registerAll, usePlugin, applyPlugins }
