const BlogValidation=require('../validation/blok.validation')

const blok_post_middleware = (req, res, next) => {
    const { error } = BlogValidation.validate(req.body);
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

module.exports=blok_post_middleware