class Util {
    static addMinutes(date, minutes) {
        return new Date(date.getTime() + minutes * 60000);
    }

    static getTimeToExpire(date, maxLifeSpan) {
        const expiringDate = Util.addMinutes(new Date(date), maxLifeSpan);
        const currentDate = new Date();
        return expiringDate - currentDate;
    }
}

export default Util;