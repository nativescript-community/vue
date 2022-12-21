# NativeScript Vue (Community ver.)

### **Quirks and hacks for Vue 3 to work with [DOMiNATIVE](https://github.com/SudoMaker/DOMiNATIVE) on [NativeScript](https://nativescript.org/)**

[Playground](https://stackblitz.com/edit/nativescript-dominative-vue-3?file=app/App.vue)

---

## Why?

This is an alternative version of Vue3 implementation for NativeScript. It might not be as feature rich as the official [NativeScript-Vue](https://nativescript-vue.org/), but if you'd like to catch up with upstream Vue development, this is still a good choice.

Be aware we got this Vue implementation working within an hour, instead of years.

## Installation

Via npm:

```shell
npm install @nativescript-community/vue @nativescript/core dominative undom-ng vue
```

**Note:** `@nativescript/core`, `dominative`, `undom-ng`, `vue` are peer dependencies, you have to install them manually. As the benefit for using peer dependencies, you'll be able to upgrade these dependencies directly from upstream, no need to wait for an update with `@nativescript-community/vue`.

---

## Usage

```js
import { Application } from '@nativescript/core'
import { createApp } from '@nativescript-community/vue'
import App from 'App.vue'

const app = createApp(App)

// Start the app
app.$run()

```

---

## License

MIT
