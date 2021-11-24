import { firestore } from 'firebase-admin'
import { db } from '@config/firebase'
import CompactExam from '@/models/CompactExam'

const collection = db.collection('exams-compact')

async function getCompactExams(): Promise<CompactExam[]> {
  const results = await collection.withConverter(CompactExam.converter).get()
  return results.docs.map(doc => doc.data())
}

async function getCompactExam(id: string): Promise<CompactExam | undefined> {
  const doc = await collection.doc(id).withConverter(CompactExam.converter).get()
  return doc.data()
}

async function addCompactExam(
  exam: CompactExam
): Promise<firestore.DocumentReference<firestore.DocumentData>> {
  return collection.add(exam)
}

async function upsertCompactExam(exam: CompactExam): Promise<firestore.WriteResult> {
  return collection.doc(exam.id).set(exam)
}

async function updateCompactExam(exam: CompactExam): Promise<firestore.WriteResult> {
  return collection.doc(exam.id).update(exam)
}

async function deleteCompactExam(id: string): Promise<firestore.WriteResult> {
  return collection.doc(id).delete()
}

function compactExamChangeListener(
  changeCallback: (type: firestore.DocumentChangeType, document: CompactExam) => void
): void {
  collection.withConverter(CompactExam.converter).onSnapshot(snapshot => {
    snapshot.docChanges().forEach(change => {
      changeCallback(change.type, change.doc.data())
    })
  })
}

export {
  getCompactExams,
  getCompactExam,
  addCompactExam,
  updateCompactExam,
  upsertCompactExam,
  deleteCompactExam,
  compactExamChangeListener
}
