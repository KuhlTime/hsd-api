import { firestore } from 'firebase-admin'
import ExamType from './ExamType'
import LocalizedString from './LocalizedString'
import ManagedFirestoreDocument from './ManagedFirestoreDocument'
import PersistenceManager from './PersistenceMananger'
import Semester from './Semester'

class Exam extends ManagedFirestoreDocument {
  course: firestore.DocumentReference
  degree: firestore.DocumentReference
  description?: LocalizedString
  duration: number
  examiners: string[]
  location?: LocalizedString
  timestamp: Date
  type: ExamType

  constructor(
    id: string,
    course: firestore.DocumentReference,
    degree: firestore.DocumentReference,
    duration: number,
    examiners: string[],
    timestamp: Date,
    type: ExamType,
    description?: LocalizedString,
    location?: LocalizedString
  ) {
    super(id)

    this.course = course
    this.degree = degree
    this.description = description
    this.duration = duration
    this.examiners = examiners
    this.location = location
    this.timestamp = timestamp
    this.type = type
  }

  static converter: firestore.FirestoreDataConverter<Exam> = {
    toFirestore(exam: Exam): firestore.DocumentData {
      return exam
    },
    fromFirestore(snapshot: firestore.QueryDocumentSnapshot): Exam {
      const data = snapshot.data()
      return new Exam(
        snapshot.id,
        data.course,
        data.degree,
        data.duration,
        data.examiners,
        (data.timestamp as firestore.Timestamp).toDate(),
        data.type,
        data.description,
        data.location
      )
    }
  }

  toJSON(): Record<string, unknown> {
    return {
      id: this.id,
      course: PersistenceManager.shared.getCourse(this.course.id),
      description: this.description,
      duration: this.duration,
      examiners: this.examiners,
      location: this.location,
      timestamp: this.timestamp,
      type: this.type,
      semester: new Semester(this.timestamp).toJSON()
    }
  }
}

export default Exam
