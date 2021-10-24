import { db } from '@config/firebase'
import Exam from '@/models/Exam'
import { ExamQueryType } from '@/validations/exam.validation'

async function getExams(q: ExamQueryType): Promise<Exam[]> {
  const results = await db.collection('exams').get()
  return results.docs.map(doc => doc.data() as Exam)
}

export { getExams }
