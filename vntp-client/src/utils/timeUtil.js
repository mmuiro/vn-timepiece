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

export { msToTime, msToTimeString };