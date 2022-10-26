import './dom.js'
import VList from './v-list.js'
import VTemplate from './v-template.js'

const registerComponents = (app) => {
	app.component('v-template', VTemplate)
	app.component('v-list', VList)
}

const registerAll = (app) => {
	registerComponents(app)
}

export { VList, VTemplate, registerComponents, registerAll }
