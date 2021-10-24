import { plainToClass } from 'class-transformer'
import { firestore } from 'firebase-admin'

abstract class ManagedFirestoreDocument {
  id: string

  constructor(id: string) {
    this.id = id
  }

  static converter: firestore.FirestoreDataConverter<ManagedFirestoreDocument> = {
    toFirestore(managedFirestoreDocument: ManagedFirestoreDocument): firestore.DocumentData {
      return managedFirestoreDocument
    },
    fromFirestore(snapshot: firestore.QueryDocumentSnapshot): ManagedFirestoreDocument {
      const data = snapshot.data()
      const object = {
        id: snapshot.id,
        ...data
      }

      return plainToClass(this.constructor(), object)
    }
  }
}

export default ManagedFirestoreDocument
