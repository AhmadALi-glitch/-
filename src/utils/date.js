
export function convertUtcToLocale(utcDateInMs) {
    // console.log("Converting : ", utcDateInMs)
    if(!utcDateInMs) return '';
    return {
        date: new Date(+utcDateInMs - ( new Date().getTimezoneOffset() * 60 * 1000 )).toISOString().split('T')[0],
        time: new Date(+utcDateInMs - ( new Date().getTimezoneOffset() * 60 * 1000 )).toISOString().split(/[T.]/g)[1],
        ms: new Date(+utcDateInMs - ( new Date().getTimezoneOffset() * 60 * 1000 )).valueOf()
    }
}

export function getMyTimeZone() {
    return Intl.DateTimeFormat().resolvedOptions().timeZone
}