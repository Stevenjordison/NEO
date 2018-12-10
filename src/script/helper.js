export function debounce (func, wait, immediate) {
    let time
    if (typeof func !== 'function') {
        throw new TypeError('Expected a function')
    }
    let debounced = function () {
        let context = this

        time && clearTimeout(time)
        if (immediate) {
            let callNow = !time
            callNow && func.apply(context, arguments)
            time = setTimeout(() => {time = null}, wait)
        } else {
            time = setTimeout(() => {
                func.apply(context, arguments)}, wait)
        }
    }
    debounce.cancel = function () {
        clearTimeout(time)
        time = null
    }
    return debounced
}
