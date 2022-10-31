import "./dom.js"
import VList from "./v-list.js"
import VTemplate from "./v-template.js"
import { installNavigation } from "./navigation.js"
import { registerComponents, registerAll, addGlobalPlugin, applyPlugins } from './register.js'
import { createApp, createNativeView } from "./create-app.js"

export {
	VList,
	VTemplate,
	registerComponents,
	registerAll,
	addGlobalPlugin,
	applyPlugins,
	createApp,
	createNativeView,
	installNavigation,
}
