export default {
    // 时间格式化
    formatTime (date, format) {
        return formatTime(date, format)
    },
    // 时间格式化
    formatZh (date) {
        return formatZh(date)
    },
    // 获取今天
    showToDay () {
        return showToDay()
    },
    // 获取现在时间
    showNowTime () {
        return showNowTime()
    },
    // 获取本周的第一天
    showWeekFirstDay () {
        return showWeekFirstDay()
    },
    // 获取本周的最后一天
    showWeekLastDay () {
        return showWeekLastDay()
    },
    // 获取本月的第一天
    showMonthFirstDay () {
        return showMonthFirstDay()
    },
    // 获取本月的最后一天
    showMonthLastDay () {
        return showMonthLastDay()
    },
    /* 过去N天 */
    /**
     * @param {Number} [num] 正数为将来，负数为过去
     * @param {boolean} [time] 是否显示时分秒
     * @param {String} [date] 基准日期
     */
    showAgoDay (num, time, date) {
        return showAgoDay(num, time, date)
    },
    /* 最近N天 */
    /** 例如今天11月30号，最近7天就是11月24号0点 到 12月1号 0点
     * @param {Number} [num] 正数为将来，负数为过去
     * @param {String} [date] 基准日期
     */
    recentlyDay (num, date) {
        return recentlyDay(num, date)
    },
    /* 校正时间，单位秒 用于startTime类精确到秒的查询，得多1秒，不然查不到 */
    /**
     * @param {String} [date] 校正日期
     * @param {Number} [num] 正数为增加，负数为减少
     */
    reviseTime (date, num) {
        return reviseTime(date, num)
    },
    pickerTimeOptions: {
        shortcuts: [{
            text: '今天',
            onClick (picker) {
                const end = formatTime(new Date(), 'yyyy-MM-dd hh:mm:ss')
                const start = formatTime(new Date(), 'yyyy-MM-dd') + ' 00:00:00'
                picker.$emit('pick', [start, end])
            }
        }, {
            text: '昨天',
            onClick (picker) {
                const end = showAgoDay(1).end + ' 00:00:00'
                const start = showAgoDay(1).start + ' 00:00:00'
                picker.$emit('pick', [start, end])
            }
        }, {
            text: '本周',
            onClick (picker) {
                const end = formatTime(new Date(), 'yyyy-MM-dd hh:mm:ss')
                const start = showWeekFirstDay() + ' 00:00:00'
                picker.$emit('pick', [start, end])
            }
        }, {
            text: '本月',
            onClick (picker) {
                const end = formatTime(new Date(), 'yyyy-MM-dd hh:mm:ss')
                const start = showMonthFirstDay() + ' 00:00:00'
                picker.$emit('pick', [start, end])
            }
        }, {
            text: '全部',
            onClick (picker) {
                picker.$emit('pick', ['', ''])
            }
        }]
    },
    pickerSimpleOptions: {
        shortcuts: [{
            text: '昨天',
            onClick (picker) {
                const end = new Date()
                const start = new Date()
                start.setTime(start.getTime() - 3600 * 1000 * 24)
                end.setTime(end.getTime() - 3600 * 1000 * 24)
                picker.$emit('pick', [start, end])
            }
        }, {
            text: '前天',
            onClick (picker) {
                const end = new Date()
                const start = new Date()
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 2)
                end.setTime(end.getTime() - 3600 * 1000 * 24 * 2)
                picker.$emit('pick', [start, end])
            }
        }, {
            text: '全部',
            onClick (picker) {
                picker.$emit('pick', ['', ''])
            }
        }]
    },
    pickerDateOptions: {
        shortcuts: [{
            text: '昨天',
            onClick (picker) {
                const date = new Date()
                date.setTime(date.getTime() - 3600 * 1000 * 24)
                picker.$emit('pick', date)
            }
        }, {
            text: '一周前',
            onClick (picker) {
                const date = new Date()
                date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
                picker.$emit('pick', date)
            }
        }]
    }
}

function formatTime (date, format) {
    format || (format = 'yyyy-MM-dd') // hh:mm:ss
    if (date.toString() === 'Invalid Date') {
        return ''
    }
    let o = {
        'M+': date.getMonth() + 1,
        'd+': date.getDate(),
        'h+': date.getHours(),
        'm+': date.getMinutes(),
        's+': date.getSeconds(),
        'q+': Math.floor((date.getMonth() + 3) / 3),
        'S': date.getMilliseconds()
    }

    if (/(y+)/.test(format)) {
        format = format.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
    }

    for (let k in o) {
        if (new RegExp('(' + k + ')').test(format)) {
            format = format.replace(RegExp.$1, RegExp.$1.length === 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length))
        }
    }
    return format
}

function formatZh (string) {
    string = string.replace(/-/g, '/')
    let date = new Date(string)
    let week = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
    return {
        Y: date.getFullYear() + '年',
        M: date.getMonth() + 1 + '月',
        D: date.getDate() + '日',
        W: week[date.getDay()],
        h: date.getHours() + '时',
        m: date.getMinutes() + '分',
        s: date.getSeconds() + '秒'
    }
}

function showToDay () {
    return formatTime(new Date(), 'yyyy-MM-dd')
}

function showNowTime () {
    return formatTime(new Date(), 'yyyy-MM-dd hh:mm:ss')
}

function showWeekFirstDay () {
    let WeekFirstDay = new Date(new Date() - (new Date().getDay() - 1) * 86400000)
    return formatTime(WeekFirstDay, 'yyyy-MM-dd')
}

function showWeekLastDay () {
    let _date = new Date()
    let WeekFirstDay = new Date(_date - (_date.getDay() - 1) * 86400000)
    let WeekLastDay = new Date((WeekFirstDay / 1000 + 6 * 86400) * 1000)
    return formatTime(WeekLastDay, 'yyyy-MM-dd')
}

function showMonthFirstDay () {
    let _date = new Date()
    let MonthFirstDay = new Date(_date.getFullYear(), _date.getMonth(), 1)
    return formatTime(MonthFirstDay, 'yyyy-MM-dd')
}

function showMonthLastDay () {
    let _date = new Date()
    let MonthNextFirstDay = new Date(_date.getFullYear(), _date.getMonth() + 1, 1)
    let MonthLastDay = new Date(MonthNextFirstDay - 86400000)
    return formatTime(MonthLastDay, 'yyyy-MM-dd')
}

function showAgoDay (num, time, date) {
    date && (date = date.replace(/-/g, '/'))
    let _date = date ? new Date(date) : new Date()
    let resultDate = new Date(_date.getTime() - num * 86400000)
    if (num < 0) {
        return {
            start: time ? formatTime(_date, 'yyyy-MM-dd hh:mm:ss') : formatTime(_date, 'yyyy-MM-dd'),
            end: time ? formatTime(resultDate, 'yyyy-MM-dd hh:mm:ss') : formatTime(resultDate, 'yyyy-MM-dd')
        }
    } else {
        return {
            start: time ? formatTime(resultDate, 'yyyy-MM-dd hh:mm:ss') : formatTime(resultDate, 'yyyy-MM-dd'),
            end: time ? formatTime(_date, 'yyyy-MM-dd hh:mm:ss') : formatTime(_date, 'yyyy-MM-dd')
        }
    }
}

function recentlyDay (num, date) {    // 暂未处理time = true的情况，若有需要，后面再添加
    date && (date = date.replace(/-/g, '/'))
    let _date = date ? new Date(date) : new Date()
    let start = new Date(_date.getTime() - (num - 1) * 86400000) // 最近n天的下一天开始统计
    let end = new Date(_date.getTime() + 86400000) // 目标日期的下一天开始统计
    let startDate = start.getFullYear() + '-' + ((start.getMonth() + 1) < 10 ? '0' : '') + (start.getMonth() + 1) + '-' + (start.getDate() < 10 ? '0' : '') + start.getDate()
    let endDate = end.getFullYear() + '-' + ((end.getMonth() + 1) < 10 ? '0' : '') + (end.getMonth() + 1) + '-' + (end.getDate() < 10 ? '0' : '') + end.getDate()
    if (num < 0) {
        return {
            start: formatTime(end, 'yyyy-MM-dd') + ' 00:00:00',
            end: formatTime(start, 'yyyy-MM-dd') + ' 00:00:00'
        }
    } else {
        return {
            start: formatTime(start, 'yyyy-MM-dd') + ' 00:00:00',
            end: formatTime(end, 'yyyy-MM-dd') + ' 00:00:00'
        }
    }
}

function reviseTime (date, num) {
    let _date = date ? new Date(date) : new Date()
    let resultDate = new Date(_date.getTime() + num * 1000)
    return formatTime(resultDate, 'yyyy-MM-dd hh:ss:mm')
}
