import Joi from 'joi'

const IdSchema = Joi.object({
  Id: Joi.string().required()
})

export default IdSchema
