function msToTime(timeInMS) {
    const units = ['milliseconds', 'seconds', 'minutes', 'hours'],
        thresholds = [1000, 60, 60];
    let remaining = timeInMS;
    let amounts = {};
    for (let i = 0; i < thresholds.length; i++) {
        amounts[units[i]] = remaining % thresholds[i];
        remaining = Math.floor((remaining - amounts[units[i]]) / thresholds[i]);
    }
    amounts[units[thresholds.length]] = remaining;
    return amounts;
}

function msToTimeString(timeInMs, include=['hours', 'minutes', 'seconds']) {
    const amounts = msToTime(timeInMs);
    const abbreviations = {hours: 'hr', minutes: 'min', seconds: 's', milliseconds: 'ms'};
    return include.map(unit => amounts[unit] + abbreviations[unit]).join(' ');
}

function msToTimeStringFull(timeInMs, include=['hours', 'minutes', 'seconds']) {
    const amounts = msToTime(timeInMs);
    return include.map(unit => amounts[unit] + " " + unit).join(', ');
}

function monthOrDayAbbreviationToFull(input) {
    const abbrvToFull = {
        'Mon': 'Monday', 'Tue': 'Tuesday', 'Wed': 'Wednesday', 'Thu': 'Thursday', 'Fri': 'Friday', 'Sat': 'Saturday', 'Sun': 'Sunday',
        'Jan': 'January', 'Feb': 'February', 'Mar': 'March', 'Apr': 'April', 'May': 'May', 'Jun': 'June',
        'Jul': 'July', 'Aug': 'August', 'Sep': 'September', 'Oct': 'October', 'Nov': 'November', 'Dec': 'December'
    }
    return abbrvToFull[input];
}

function dateToFullDateString(date) {
    date = date.toDateString().split(' ');
    date[0] = monthOrDayAbbreviationToFull(date[0]) + ",";
    date[1] = monthOrDayAbbreviationToFull(date[1]);
    return date.join(' ');
}

function msToTimeDisplayString(timeInMS) {
    const amounts = msToTime(timeInMS);
    return `${amounts.hours.toString().padStart(2, '0')} ∶ ${amounts.minutes.toString().padStart(2, '0')} ∶ ${amounts.seconds.toString().padStart(2, '0')}`;
}

export { msToTime, msToTimeString, msToTimeStringFull, dateToFullDateString, msToTimeDisplayString };