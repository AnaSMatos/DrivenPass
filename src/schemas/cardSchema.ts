import Joi from "joi"

const cardSchema = Joi.object({
    title: Joi.string().required(),
    type: Joi.string().required().valid('credit', 'debit', 'both'),
    expirationDate: Joi.string().required(),
    number: Joi.string().required(),
    name: Joi.string().required(),
    securityCode: Joi.string().required(),
    password: Joi.string().required(),
    isVirtual: Joi.bool()
})

export default cardSchema;