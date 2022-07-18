import Joi from "joi"

const notesSchema = Joi.object({
    title: Joi.string().required().max(50),
    note: Joi.string().required().max(1000)
})

export default notesSchema;