import { firestore } from 'firebase-admin'
import LocalizedString from './LocalizedString'
import ManagedFirestoreDocument from './ManagedFirestoreDocument'

class Degree extends ManagedFirestoreDocument {
  name: LocalizedString
  regulations: number
  semesters: number

  constructor(id: string, name: LocalizedString, regulations: number, semesters: number) {
    super(id)

    this.name = name
    this.regulations = regulations
    this.semesters = semesters
  }

  static converter: firestore.FirestoreDataConverter<Degree> = {
    toFirestore(course: Degree): firestore.DocumentData {
      return course
    },
    fromFirestore(snapshot: firestore.QueryDocumentSnapshot): Degree {
      const data = snapshot.data()
      return new Degree(snapshot.id, data.name, data.regulations, data.semesters)
    }
  }

  toJSON(): Record<string, unknown> {
    return {
      id: this.idURI,
      name: this.name,
      regulations: this.regulations,
      semesters: this.semesters
    }
  }

  get idURI(): string {
    return `/degrees/${this.id}`
  }
}

export default Degree
