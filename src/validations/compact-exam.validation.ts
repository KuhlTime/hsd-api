import Joi from 'joi'
import ExamType from '@/models/ExamType'

const CompactExamSchema = Joi.object({
  id: Joi.string().required(),
  code: Joi.number().required(),
  degree: Joi.string().required(),
  duration: Joi.number().required(),
  examiners: Joi.array().items(Joi.string()).min(1).required(),
  examType: Joi.string()
    .allow(...Object.values(ExamType))
    .required(),
  name: Joi.string().required(),
  regulations: Joi.number().required(),
  semester: Joi.number().required(),
  timestamp: Joi.string().isoDate().required(),
  week: Joi.number().required()
})

export default CompactExamSchema
