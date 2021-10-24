class Semester {
  winter: boolean
  year: number

  static wsBounds = {
    startMonth: 10,
    endMonth: 4
  }

  constructor(date: Date) {
    this.winter =
      date.getMonth() > Semester.wsBounds.startMonth ||
      date.getMonth() <= Semester.wsBounds.endMonth
    this.year = date.getFullYear()
  }

  toJSON(): Record<string, unknown> {
    return {
      winter: this.winter,
      year: this.year
    }
  }
}

export default Semester
