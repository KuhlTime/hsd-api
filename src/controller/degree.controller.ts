import { firestore } from 'firebase-admin'
import { db } from '@config/firebase'
import Degree from '@/models/Degree'

const collection = db.collection('degrees')

async function getDegrees(): Promise<Degree[]> {
  const results = await collection.withConverter(Degree.converter).get()
  return results.docs.map(doc => doc.data())
}

async function getDegree(id: string): Promise<Degree | undefined> {
  const doc = await collection.doc(id).withConverter(Degree.converter).get()
  return doc.data()
}

function degreesChangeListener(
  changeCallback: (type: firestore.DocumentChangeType, document: Degree) => void
): void {
  collection.withConverter(Degree.converter).onSnapshot(snapshot => {
    snapshot.docChanges().forEach(change => {
      changeCallback(change.type, change.doc.data())
    })
  })
}

export { getDegrees, getDegree, degreesChangeListener }
