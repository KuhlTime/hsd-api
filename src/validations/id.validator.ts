import Joi from 'joi'

const IdSchema = Joi.object({
  id: Joi.string().required()
})

export default IdSchema
