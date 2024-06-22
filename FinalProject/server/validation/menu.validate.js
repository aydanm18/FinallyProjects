const Joi = require("joi");

const MenuValidate = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().min(10).required(),
    image: Joi.string().uri().required(),
    price: Joi.number().required(),
    category: Joi.string().required(),
});
module.exports=MenuValidate