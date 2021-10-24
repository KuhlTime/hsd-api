import { firestore } from 'firebase-admin'
import { db } from '@config/firebase'
import Course from '@/models/Course'

const collection = db.collection('courses')

async function getCourses(): Promise<Course[]> {
  const results = await collection.withConverter(Course.converter).get()
  return results.docs.map(doc => doc.data())
}

async function getCourse(id: string): Promise<Course | undefined> {
  const doc = await collection.doc(id).withConverter(Course.converter).get()
  return doc.data()
}

function courseChangeListener(
  changeCallback: (type: firestore.DocumentChangeType, document: Course) => void
): void {
  collection.withConverter(Course.converter).onSnapshot(snapshot => {
    snapshot.docChanges().forEach(change => {
      changeCallback(change.type, change.doc.data())
    })
  })
}

export { getCourses, getCourse, courseChangeListener }
