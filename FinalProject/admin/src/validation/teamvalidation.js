import * as Yup from "yup";

const TeamValidation = Yup.object().shape({
    image: Yup.string().url().required(),
    title: Yup.string().min(3).required(),
    description: Yup.string().min(10).required(),
  
});

export default TeamValidation;