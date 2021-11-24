import { firestore } from 'firebase-admin'
import ExamType from './ExamType'
import ManagedFirestoreDocument from './ManagedFirestoreDocument'

class CompactExam extends ManagedFirestoreDocument {
  code: number
  degree: string
  duration: number
  examiners: string[]
  examType: ExamType
  name: string
  regulations: number
  semester: number
  timestamp: Date
  week: number
  description?: string

  constructor(
    id: string,
    code: number,
    degree: string,
    duration: number,
    examiners: string[],
    examType: ExamType,
    name: string,
    regulations: number,
    semester: number,
    timestamp: Date,
    week: number,
    description?: string
  ) {
    super(id)

    this.code = code
    this.degree = degree
    this.duration = duration
    this.examiners = examiners
    this.examType = examType
    this.name = name
    this.regulations = regulations
    this.semester = semester
    this.timestamp = timestamp
    this.week = week
    this.description = description
  }

  static converter: firestore.FirestoreDataConverter<CompactExam> = {
    toFirestore(exam: CompactExam): firestore.DocumentData {
      return exam
    },
    fromFirestore(snapshot: firestore.QueryDocumentSnapshot): CompactExam {
      const data = snapshot.data()

      return new CompactExam(
        snapshot.id,
        data.code,
        data.degree,
        data.duration,
        data.examiners,
        data.examType,
        data.name,
        data.regulations,
        data.semester,
        data.timestamp,
        data.week,
        data.description
      )
    }
  }

  toJSON(): Record<string, unknown> {
    return {
      message: 'Not implemented'
    }
  }

  get idURI(): string {
    return `/exam/${this.id}`
  }
}

export default CompactExam
