export {
    debounce,
    colorMap,
    isDot,
    sum
}

const colorMap = {
    blue: ['#0fdbe0', '#15abbe', '#0f8891', '#e1ffff','#18cada'],
    rainbow: ['#fdfd55', '#5b9bef', '#8cfb82', '#74a9f8', '#7fd0f8', '#87e6f0', '#8efbb3', '#d4fb81'],
    pie1: ['#00a7ff', '#0076d0', '#11e7e8', '#f94d5b', '#ffbf02', '#7665ff', '#ee47ff', '#00f6ff'],
    pie2: ['#00ffff','#00cfff','#006ced','#ffe000','#ffa800','#ff5b00','#ff3000']
}

function debounce (func, wait, immediate) {
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
                func.apply(context, arguments)
            }, wait)
        }
    }
    debounce.cancel = function () {
        clearTimeout(time)
        time = null
    }
    return debounced
}

function isDot(num) {
    let result = (num.toString()).indexOf(".");
    return result !== -1;
}

function sum(arr) {
    return arr.reduce((prev, curr, idx, arr) => {
        return prev + curr;
    });
}
