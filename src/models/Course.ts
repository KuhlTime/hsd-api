import { firestore } from 'firebase-admin'
import env from '@env'
import LocalizedString from './LocalizedString'
import ManagedFirestoreDocument from './ManagedFirestoreDocument'
import PersistenceManager from './PersistenceMananger'

type SemesterOfDegree = {
  degree: firestore.DocumentReference
  semesters: number[]
}

class Course extends ManagedFirestoreDocument {
  creditPoints: number
  description?: LocalizedString
  instructors: string[]
  name: LocalizedString
  weeklyHours: {
    [type: string]: number
  }

  inSemesterOfDegree: SemesterOfDegree[]

  constructor(
    id: string,
    creditPoints: number,
    name: LocalizedString,
    instructors: string[],
    weeklyHours: {
      [type: string]: number
    },
    inSemesterOfDegree: SemesterOfDegree[],
    description?: LocalizedString
  ) {
    super(id)

    this.creditPoints = creditPoints
    this.name = name
    this.instructors = instructors
    this.weeklyHours = weeklyHours
    this.inSemesterOfDegree = inSemesterOfDegree
    this.description = description
  }

  static converter: firestore.FirestoreDataConverter<Course> = {
    toFirestore(course: Course): firestore.DocumentData {
      return course
    },
    fromFirestore(snapshot: firestore.QueryDocumentSnapshot): Course {
      const data = snapshot.data()
      return new Course(
        snapshot.id,
        data.creditPoints,
        data.name,
        data.instructors,
        data.weeklyHours,
        data.inSemesterOfDegree,
        data.description
      )
    }
  }

  toJSON(): Record<string, unknown> {
    return {
      id: this.idURI,
      creditPoints: this.creditPoints,
      description: this.description,
      instructors: this.instructors,
      name: this.name,
      weeklyHours: this.weeklyHours,
      inSemesterOfDegree: this.inSemesterOfDegree.map(d => {
        const degree = PersistenceManager.shared.getDegree(d.degree.id)

        return {
          degree: degree?.idURI,
          semesters: d.semesters
        }
      })
    }
  }

  get idURI(): string {
    return `/course/${this.id}`
  }
}

export default Course
