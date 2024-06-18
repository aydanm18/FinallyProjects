const Joi = require("joi");

const BlogValidation = Joi.object({
    description: Joi.string().required(),
    comments: Joi.array().default([]),
    src: Joi.string().uri().required(),
});
module.exports=BlogValidation