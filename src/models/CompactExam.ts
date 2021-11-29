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
  semester?: string
  timestamp: Date
  week: number
  description?: string
  updated: Date

  constructor(
    id: string,
    code: number,
    degree: string,
    duration: number,
    examiners: string[],
    examType: ExamType,
    name: string,
    regulations: number,
    timestamp: Date,
    week: number,
    semester?: string,
    description?: string,
    updated?: Date
  ) {
    super(id)

    this.code = code
    this.degree = degree
    this.duration = duration
    this.examiners = examiners
    this.examType = examType
    this.name = name
    this.regulations = regulations
    this.timestamp = timestamp
    this.week = week
    this.semester = semester
    this.description = description
    this.updated = updated || new Date()
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
        data.timestamp,
        data.week,
        data.semester,
        data.description,
        data.updated
      )
    }
  }

  toJSON(): Record<string, unknown> {
    return {
      id: this.idURI,
      code: this.code,
      degree: this.degree,
      duration: this.duration,
      examiners: this.examiners,
      examType: this.examType,
      name: this.name,
      regulations: this.regulations,
      timestamp: this.timestamp,
      week: this.week,
      semester: this.semester,
      description: this.description,
      updated: this.updated
    }
  }

  get idURI(): string {
    return `/exams/${this.id}`
  }
}

export default CompactExam
