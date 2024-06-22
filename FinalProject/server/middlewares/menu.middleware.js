const MenuValidate=require('../validation/menu.validate')

const menu_post_middleware = (req, res, next) => {
    const { error } = MenuValidate.validate(req.body);
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

module.exports=menu_post_middleware