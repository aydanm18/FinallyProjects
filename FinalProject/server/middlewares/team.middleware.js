const TeamValidation=require('../validation/team.validation')

const team_post_middleware = (req, res, next) => {
    const { error } = TeamValidation.validate(req.body);
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
module.exports=team_post_middleware;