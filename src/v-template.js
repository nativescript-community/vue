import './dom.js'
import { document } from 'dominative'
import { h, render } from 'vue'

const VTemplate = {
	props: {
		prop: {
			type: String,
			default: 'itemTemplate'
		}
	},
	setup(props, ctx) {
		return () => {
			if (!ctx.slots.default) return

			let templateVNode = ctx.slots.default()[0]
			if (templateVNode.children.length) templateVNode = templateVNode.children[0]
			templateVNode = Object.assign({}, templateVNode)
			templateVNode.children = []

			return h('Template', {
				prop: props.prop,
				'on:createView': function (event) {
					const fragment = document.createDocumentFragment()
					render(Object.assign({}, templateVNode), fragment)
					event.view = fragment.firstElementChild
					event.view.__container = fragment
				},
				'on:itemLoading': function (event) {
					const { index } = event
					let currentVNode = ctx.slots.default()[0]
					if (currentVNode.children.length) currentVNode = currentVNode.children[index]
					render(currentVNode, event.view.__container)
				}
			})
		}
	}
}

export default VTemplate