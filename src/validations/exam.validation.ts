import Joi from 'joi'
import ExamType from '@/models/ExamType'

const examsSchema = Joi.object({
  degree: Joi.string(),
  from: Joi.date(),
  to: Joi.date(),
  types: Joi.array().items(Joi.string().valid(...Object.keys(ExamType))),
  limit: Joi.number()
})

type ExamQueryType = {
  degree?: string
  from?: Date
  to?: Date
  types?: string[]
  limit?: number
}

export { examsSchema, ExamQueryType }
