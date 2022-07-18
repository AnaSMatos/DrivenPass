import Joi from "joi"

const credentialSchema = Joi.object({
    title: Joi.string().email().required(),
    password: Joi.string().required(),
    url: Joi.string().uri().required(),
    username: Joi.string().required()
})

export default credentialSchema;