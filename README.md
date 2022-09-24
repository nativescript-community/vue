# DOMiNATIVE-Vue

### **Quirks and hacks for Vue 3 to work with [DOMiNATIVE](https://github.com/SudoMaker/DOMiNATIVE) on [NativeScript](https://nativescript.org/)**

[Playground](https://stackblitz.com/edit/nativescript-dominative-vue-3?file=app/App.vue)

---

## Installation

Via npm:

```shell
npm install dominative-vue dominative @utls/undom-ef vue
```

**Note:** `dominative`, `@utls/undom-ef`, `vue` are peer dependencies, you have to install them manually.

---

## Usage

```js
import { Application } from '@nativescript/core'
import { document } from 'dominative'
import { VTemplate, registerComponents } from 'dominative-vue'
// Remember to import dominative-vue first, vue relies on some hacks to load
import { createApp } from 'vue'
import App from 'App.vue'

const app = createApp(App)

// Register helper components
app.component('v-template', VTemplate)
// or
registerComponents(app)

Application.run({
	create: () => {
		// document is already registered globally
		const frame = document.createElement('Frame')
		app.mount(frame)
		return frame
	}
})

```

---

## License

MIT