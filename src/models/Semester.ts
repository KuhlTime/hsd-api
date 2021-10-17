class Semester {
  year: number
  winter: boolean
  from: Date
  to: Date

  constructor(year: number, winter: boolean, from: Date, to: Date) {
    this.year = year
    this.winter = winter
    this.from = from
    this.to = to
  }
}

export default Semester
