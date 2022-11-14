import { document, globalRegister, TextField, TextView, registerElement, registerDOMElement } from 'dominative'

const LIST_ITEM_HOLDER = 'dummy-list-item-holder-which-does-nothing'

registerDOMElement(LIST_ITEM_HOLDER)

// eslint-disable-next-line no-undef
if (typeof __UI_USE_EXTERNAL_RENDERER__ !== 'undefined' && __UI_USE_EXTERNAL_RENDERER__) {
	registerElement('TextField', TextField)
	registerElement('TextView', TextView)
}

globalRegister(global)

global.navigator = {
	userAgent: 'Chrome',
}

const mapEvent = (tagName, from, to) => {
	const element = document.defaultView[tagName]
	element.mapEvent(from, to)
}

const mapProp = (tagName, from, to) => {
	const element = document.defaultView[tagName]
	element.mapProp(from, to)
}

mapEvent('TextField', 'input', 'textChange')
mapProp('TextField', 'value', 'text')

mapEvent('TextView', 'input', 'textChange')
mapProp('TextView', 'value', 'text')

mapProp('ItemTemplate', 'prop', 'key')
mapProp('Prop', 'prop', 'key')

export { LIST_ITEM_HOLDER }
