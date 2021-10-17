import LocalizedString from './LocalizedString'

type Hours = {
  exercise: number
  lecture: number
  practical: number
  seminar: number
}

class Course {
  id: number
  name: LocalizedString
  description: LocalizedString
  instructors: string[]
  creditPoints: number
  weeklyHours: Hours

  constructor(
    id: number,
    name: LocalizedString,
    description: LocalizedString,
    instructors: string[],
    creditPoints: number,
    weeklyHours: Hours
  ) {
    this.id = id
    this.name = name
    this.description = description
    this.instructors = instructors
    this.creditPoints = creditPoints
    this.weeklyHours = weeklyHours
  }
}

export default Course
