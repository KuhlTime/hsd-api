import { db } from '@config/firebase'
import Exam from '@/models/Exam'

const collection = db.collection('exams')

async function getExams(): Promise<Exam[]> {
  const results = await collection.withConverter(Exam.converter).get()
  return results.docs.map(doc => doc.data())
}

async function getExam(id: string): Promise<Exam | undefined> {
  const result = await collection.doc(id).withConverter(Exam.converter).get()
  return result.data()
}

export { getExams, getExam }
