import { firestore } from 'firebase-admin'
import LocalizedString from './LocalizedString'
import ManagedFirestoreDocument from './ManagedFirestoreDocument'
import PersistenceManager from './PersistenceMananger'

type DegreeReference = {
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

  degrees: DegreeReference[]

  constructor(
    id: string,
    creditPoints: number,
    name: LocalizedString,
    instructors: string[],
    weeklyHours: {
      [type: string]: number
    },
    degrees: DegreeReference[],
    description?: LocalizedString
  ) {
    super(id)

    this.creditPoints = creditPoints
    this.name = name
    this.instructors = instructors
    this.weeklyHours = weeklyHours
    this.degrees = degrees
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
        data.degrees,
        data.description
      )
    }
  }

  toJSON(): Record<string, unknown> {
    return {
      id: this.id,
      creditPoints: this.creditPoints,
      description: this.description,
      instructors: this.instructors,
      name: this.name,
      weeklyHours: this.weeklyHours,
      degrees: this.degrees.map(d => {
        return {
          degree: PersistenceManager.shared.getDegree(d.degree.id)?.toJSON(),
          semesters: d.semesters
        }
      })
    }
  }
}

export default Course
