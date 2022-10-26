import './dom.js'
import { document } from 'dominative'
import { h, render } from 'vue'

const VList = {
	props: {
		items: null,
		itemTemplateSelector: {
			type: null,
			default: '"__default__"'
		},
		props: Object
	},
	setup(componentProps, ctx) {
		return () => {
			const {items, itemTemplateSelector, props} = componentProps

			const itemTemplates = Object.keys(ctx.slots).map((key) => {
				const itemTemplate = document.createElement('ItemTemplate')
				itemTemplate.key = key

				itemTemplate.addEventListener('createView', (event) => {
					const container = document.createDocumentFragment()
					const vNode = h('WrapLayout')
					render(vNode, container)
					event.view = container.firstElementChild
					event.view.__container = container
				})

				itemTemplate.addEventListener('itemLoading', (event) => {
					const { index, item, view } = event
					const vNode = h('WrapLayout', null, ctx.slots[key] && ctx.slots[key]({index, item}) || [])

					if (view && view.__container) {
						render(vNode, view.__container)
					}
				})

				return itemTemplate
			})

			if (itemTemplates.length === 1 && itemTemplates[0].key === 'default') itemTemplates[0].key = '__default__'

			return h('ListView', {
				...props,
				items,
				itemTemplateSelector,
				itemTemplates
			})
		}
	}
}

export default VList