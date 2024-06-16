const Joi = require("joi");

const BlogValidation = Joi.object({
    title: Joi.string().min(3).max(50).required(),
    description: Joi.string().required(),
    comments: Joi.array().default([]),
    src: Joi.string().uri().required(),
});
module.exports=BlogValidation