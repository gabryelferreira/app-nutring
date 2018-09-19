export class DateTimeSQL {
    date:Date
    constructor(date:Date){
        this.date = date;
    }

    public getSqlDateTime(){
        return this.date.getFullYear() + "-" + this.twoDigits(1 + this.date.getUTCMonth()) + "-" + this.twoDigits(this.date.getDate()) + " " + this.twoDigits(this.date.getHours()) + ":" + this.twoDigits(this.date.getMinutes());
    }

    private twoDigits(d):string {
        if(0 <= d && d < 10) return "0" + d.toString();
        if(-10 < d && d < 0) return "-0" + (-1*d).toString();
        return d.toString();
    }

}