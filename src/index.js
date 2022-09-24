import './dom.js'
import VTemplate from './v-template.js'

const registerComponents = (app) => {
	app.component('v-template', VTemplate)
}

export { VTemplate, registerComponents }
