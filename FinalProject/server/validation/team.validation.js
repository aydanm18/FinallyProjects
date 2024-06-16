const Joi = require("joi");

const TeamValidation = Joi.object({
    image: Joi.string().uri().required(),
    title: Joi.string().min(3).required(),
    description: Joi.string().required(),
});

module.exports=TeamValidation