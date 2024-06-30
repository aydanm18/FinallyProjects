import * as Yup from "yup";

const BlogValidation = Yup.object().shape({
    title: Yup.string().required(),
    description: Yup.string().min(10).required(),
    src: Yup.string().url().required(),

});

export default BlogValidation;