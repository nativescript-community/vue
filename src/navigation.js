import { registerComponents } from ".";
import { Frame } from "@nativescript/core";
import { isRef } from "@vue/runtime-core";
import { createApp } from "vue";

/**
 * @internal
 */
export function install(app) {
  app.config.globalProperties.$navigateTo = $navigateTo;
  app.config.globalProperties.$navigateBack = $navigateBack;
}

function resolveFrame(frame) {
  if (!frame) {
    return Frame.topmost();
  }

  if (frame instanceof Frame) {
    return frame;
  }

  // todo: check if refs work this way or not
  if (isRef(frame)) {
    //@ts-ignore
    return frame.value;
  }

  //   if (frame instanceof NSVElement) {
  //     return frame.nativeView;
  //   }

  // todo: either change core Frame to add frames to the stack when they are created
  // or do as we did in 2.x - handle a Map of frames.
  // right now, empty frames can't be navigated as they are not recognized by `getFrameById`
  return Frame.getFrameById(frame);
}

export async function $navigateTo(target, options) {
  options = Object.assign({}, options);
  try {
    const frame = resolveFrame(options.frame);

    if (!frame) {
      throw new Error("Failed to resolve frame. Make sure your frame exists.");
    }

    const navigationApp = createApp(target, options?.props);
    registerComponents(navigationApp);
    const targetPage = navigationApp.mount(
      document.createDocumentFragment()
    ).$el;
    const handler = (args) => {
      if (args.isBackNavigation) {
        targetPage.off("navigatedFrom", handler);
        navigationApp.unmount();
      }
    };
    targetPage.on("navigatedFrom", handler);

    const dispose = targetPage.disposeNativeView;
    targetPage.disposeNativeView = () => {
      navigationApp.unmount();
      dispose.call(targetPage);
    };

    frame.navigate({
      ...options,
      create: () => targetPage,
    });
    return targetPage;
  } catch (e) {
    console.log("[$navigateTo] Failed to navigate:\n\n");
    console.log(e);
    throw e;
  }
}

export async function $navigateBack(options) {
  const frame = resolveFrame(options ? options.frame : undefined);

  if (!frame) {
    throw new Error("Failed to resolve frame. Make sure your frame exists.");
  }

  if (!frame.canGoBack()) {
    return;
  }

  frame.goBack();
}
