class Util {
    static addMinutes(date, minutes) {
        return new Date(date.getTime() + minutes * 60000);
    }

    static formatMinutesSecondsString(date) {
        return `${date.getMinutes()}:${date.getSeconds()}`;
    }
}

export default Util;