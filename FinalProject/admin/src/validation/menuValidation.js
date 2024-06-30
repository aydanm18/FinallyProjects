import * as Yup from "yup";

const ProductValidation = Yup.object().shape({
    title: Yup.string().required(),
    description: Yup.string().min(10).required(),
    image: Yup.string().url().required(),
    price: Yup.number().required(),
    category: Yup.string().required(),

});

export default ProductValidation;