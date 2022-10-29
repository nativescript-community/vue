import './dom.js'
import { document } from 'dominative'
import { h, render, onBeforeUpdate, ref } from 'vue'

const VList = {
	props: {
		itemTemplateSelector: {
			type: null,
			default: '"__default__"'
		},
		wrapper: {
			type: null,
			default: 'WrapLayout'
		},
		capture: null
	},
	setup(props, ctx) {
		const { wrapper } = props

		const renderChildren = typeof wrapper === 'string'

		const listView = ref()

		onBeforeUpdate(() => {
			if (listView.value) listView.value.refresh()
		})

		const itemTemplateCache = {}

		const getItemTemplate = (key) => {
			if (itemTemplateCache[key]) return itemTemplateCache[key]

			const itemTemplate = document.createElement('ItemTemplate')
			itemTemplate.key = key

			const createView = (event, props, children) => {
				const container = document.createDocumentFragment()
				const vNode = h(wrapper, props, children)
				render(vNode, container)
				event.view = container.firstElementChild
				event.view.__container = container

				if (process.env.NODE_ENV !== 'production' && !renderChildren && event.view.nextElementSibling) {
					console.warn(`[DOMiVUE] v-list wrapper '${wrapper.__name}' can only have one root element!`)
				}
			}

			const itemLoading = (event) => {
				const { index, item, view } = event

				const renderSlot = () => ctx.slots[key] && ctx.slots[key]({index, item}) || []
				const children = renderChildren && renderSlot() || renderSlot
				const props = { index, item }
				if (!view || !view.__container) return createView(event, props, children)

				const vNode = h(wrapper, props, children)
				render(vNode, event.view.__container)
			}

			itemTemplate.addEventListener('createView', event => createView(event))
			itemTemplate.addEventListener('itemLoading', event => itemLoading(event))

			itemTemplateCache[key] = itemTemplate

			return itemTemplate
		}

		return () => {
			const {itemTemplateSelector} = props

			const itemTemplates = ctx.attrs.itemTemplates || Object.keys(ctx.slots).map(getItemTemplate)

			if (itemTemplates.length === 1 && itemTemplates[0].key === 'default') itemTemplates[0].key = '__default__'

			return h('ListView', {
				...ctx.attrs,
				ref: listView,
				itemTemplateSelector,
				itemTemplates
			})
		}
	}
}

export default VList
