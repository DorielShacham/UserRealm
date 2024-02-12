export function delay(msec: number = 2000, controller?: AbortController) {
    return (new Promise((resolve, reject) => {
        const timeout = window.setTimeout(resolve, msec);
        if (controller) {
            controller.signal.addEventListener('abort', () => {
                window.clearTimeout(timeout);
                reject('canceled');
            });
        }
    }));
}