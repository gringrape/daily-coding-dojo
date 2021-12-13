export default class CustomDate extends Date {
  getMonth(): number {
    return super.getMonth() + 1;
  }

  getWeekDay(): string {
    const weekDay = ['일', '월', '화', '수', '목', '금', '토'];
    return weekDay[this.getDay()];
  }

  toString(): string {
    return `${this.getFullYear()} 년 ${this.getMonth()} 월 ${this.getDate()} 일`;
  }

  toDate(): Date {
    return new Date(super.toString());
  }

  static from(date: Date): CustomDate {
    return new CustomDate(date.toString());
  }
}
