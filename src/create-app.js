import { document } from 'dominative'
import { registerAll } from "./register.js"
import { Application } from "@nativescript/core"
import { createApp as createAppVue } from "vue"

const createApp = (rootComponent, props) => {
	const app = createAppVue(rootComponent, props)
	registerAll(app)

	let rendered = null

	app.$render = () => {
		if (rendered) return rendered.$el

		const container = document.createDocumentFragment()
		rendered = app.mount(container)
		return rendered.$el
	}

	// Shouldn't except this method to return
	// https://v7.docs.nativescript.org/core-concepts/application-lifecycle#application-run
	app.$run = () => Application.run({
		create: app.$render,
	})

	return app
}

export { createApp }
