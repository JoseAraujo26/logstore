export class DateGenerate {
  get fullDate(): string {
    const date: Date = new Date()
    const [year, mounth, day, hour, minute, second]: Array<number> = [
      date.getFullYear(),
      date.getMonth() + 1,
      date.getDate(),
      date.getHours(),
      date.getMinutes(),
      date.getSeconds()
    ]
    return `${year}-${mounth}-${day} ${hour}:${minute}:${second}`
  }
}