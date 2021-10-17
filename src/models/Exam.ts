import Degree from './Degree'
import ExamType from './ExamType'
import LocalizedString from './LocalizedString'

class Exam {
  id: number
  degree: Degree
  description?: LocalizedString
  duration: number
  examType: ExamType
  examinationDate: Date
  location: LocalizedString
  examiners: string[]

  constructor(
    id: number,
    degree: Degree,
    duration: number,
    examType: ExamType,
    examinationDate: Date,
    location: LocalizedString,
    examiners: string[],
    description?: LocalizedString
  ) {
    this.id = id
    this.degree = degree
    this.description = description
    this.duration = duration
    this.examType = examType
    this.examinationDate = examinationDate
    this.location = location
    this.examiners = examiners
  }
}

export default Exam
