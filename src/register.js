import VList from "./v-list.js"
import VTemplate from "./v-template.js"
import { install } from "./navigation.js"

const registerComponents = (app) => {
	app.component("v-template", VTemplate)
	app.component("v-list", VList)
}

const registerAll = (app) => {
	registerComponents(app)
	install(app)
}

export { registerComponents, registerAll }
