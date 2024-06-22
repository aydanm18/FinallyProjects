const PizzaValidation=require('../validation/pizza.validate')

const pizza_post_middleware = (req, res, next) => {
    const { error } = PizzaValidation.validate(req.body);
    if (!error) {
        next();
    } else {
        const { details } = error;
        res.send({
            isValidate: false,
            message: details[0].message
        });
    }
};

module.exports=pizza_post_middleware