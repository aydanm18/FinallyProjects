const Joi = require("joi");

const BlogValidation = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().min(10).required(),
    comments: Joi.array().default([]),
    src: Joi.string().uri().required(),
});
module.exports=BlogValidation