import { Frame } from "@nativescript/core"
import { isRef } from "@vue/runtime-core"
import { createApp } from "./create-app.js"

/**
 * @internal
 */
export function install(app) {
	app.config.globalProperties.$navigateTo = $navigateTo
	app.config.globalProperties.$navigateBack = $navigateBack
}

function resolveFrame(frame) {
	if (!frame) {
		return Frame.topmost()
	}

	if (frame instanceof Frame) {
		return frame
	}

	// todo: check if refs work this way or not
	if (isRef(frame)) {
		return frame.value
	}

	// todo: either change core Frame to add frames to the stack when they are created
	// or do as we did in 2.x - handle a Map of frames.
	// right now, empty frames can't be navigated as they are not recognized by `getFrameById`
	return Frame.getFrameById(frame)
}

export async function $navigateTo(target, options = {}) {
	try {
		const frame = resolveFrame(options.frame)

		if (!frame) {
			throw new Error("Failed to resolve frame. Make sure your frame exists.")
		}

		const navigationApp = createApp(target, options.props)
		const targetPage = navigationApp.$render(options.target)
		const handler = (args) => {
			if (args.isBackNavigation) {
				targetPage.off("navigatedFrom", handler)
				navigationApp.unmount()
			}
		}
		targetPage.on("navigatedFrom", handler)

		const dispose = targetPage.disposeNativeView
		targetPage.disposeNativeView = () => {
			navigationApp.unmount()
			dispose.call(targetPage)
		}

		frame.navigate({
			...options,
			create: () => targetPage,
		})
		return targetPage
	} catch (e) {
		console.error("[$navigateTo] Failed to navigate:\n\n")
		console.error(e)
		throw e
	}
}

export async function $navigateBack(options = {}) {
	const frame = resolveFrame(options.frame)

	if (!frame) {
		throw new Error("Failed to resolve frame. Make sure your frame exists.")
	}

	if (!frame.canGoBack()) {
		return
	}

	frame.goBack()
}
