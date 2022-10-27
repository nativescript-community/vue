import { registerAll } from "./index.js"
import { Application } from "@nativescript/core"
import { createApp as createAppVue } from "vue"
import { install } from "./navigation"

const createApp = (rootComponent, props) => {
	const app = createAppVue(rootComponent, props)
	registerAll(app)
	install(app)

	let rendered = null

	app.$render = () => {
		if (rendered) return rendered.$el

		const container = document.createDocumentFragment()
		const ret = app.mount(container)
		rendered = ret
		return rendered.$el
	}

	// Shouldn't except this method to return
	// https://v7.docs.nativescript.org/core-concepts/application-lifecycle#application-run
	app.$run = () => Application.run({
		create: app.$render,
	})
}

export { createApp }
