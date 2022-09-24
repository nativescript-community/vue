import { document } from 'dominative'

global.window = global
global.document = document
global.Event = document.defaultView.Event
global.Element = document.defaultView.Element
global.SVGElement = class SVGElement extends global.Element {}

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

mapProp('Template', 'prop', 'key')
mapProp('Prop', 'prop', 'key')
