import './dom.js'
import { document } from 'dominative'
import { h, render, onBeforeUpdate } from 'vue'

const VTemplate = {
	props: {
		prop: {
			type: String,
			default: 'itemTemplate'
		}
	},
	setup(props, ctx) {
		let currentVNode = null

		onBeforeUpdate(() => {
			currentVNode = ctx.slots.default()[0]
		})

		return () => {
			if (!ctx.slots.default) return

			let templateVNode = ctx.slots.default()[0]
			if (templateVNode.children.length) templateVNode = templateVNode.children[0]
			templateVNode = Object.assign({}, templateVNode)
			templateVNode.children = []

			return h('ItemTemplate', {
				prop: props.prop,
				'on:createView': function (event) {
					const fragment = document.createDocumentFragment()
					render(Object.assign({}, templateVNode), fragment)
					event.view = fragment.firstElementChild
					if (!event.view) return
					event.view.__container = fragment
				},
				'on:itemLoading': function (event) {
					if (!currentVNode) return
					const { index, view } = event
					if (currentVNode.children.length) render(currentVNode.children[index], view.__container)
					else render(currentVNode, view.__container)
				}
			})
		}
	}
}

export default VTemplate
