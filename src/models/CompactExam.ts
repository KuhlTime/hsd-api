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
    semester: number,
    timestamp: Date,
    week: number,
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
    this.semester = semester
    this.timestamp = timestamp
    this.week = week
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
        data.semester,
        data.timestamp,
        data.week,
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
      semester: this.semester,
      timestamp: this.timestamp,
      week: this.week,
      description: this.description,
      updated: this.updated
    }
  }

  get idURI(): string {
    return `/exams/${this.id}`
  }
}

export default CompactExam
