import { document, register } from 'dominative'

register(global)

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
