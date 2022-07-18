import Joi from "joi"

const wifiSchema = Joi.object({
    title:Joi.string().required(),
    name: Joi.string().email().required(),
    password: Joi.string().required()
})

export default wifiSchema;