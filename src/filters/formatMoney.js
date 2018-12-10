export default function (val) {
    if (!val) return '-'
    let length = String(parseInt(val)).length
    if( length > 5) {
        if (length > 8) {
            return parseInt(val / 1000000) / 100 + '亿'
        } else {
            return parseInt(val / 100) / 100 + '万'
        }
    } else {
        return val
    }
}
