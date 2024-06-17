import * as Yup from "yup";

const userValidation = Yup.object().shape({
  username: Yup.string().min(2).required(),
  password: Yup.string()
    .matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, "password type invalid")
    .required(),
  repeat_password: Yup.string().oneOf(
    [Yup.ref("password"), null],
    "Passwords must match"
  ),
  email: Yup.string().email().required(),
  src: Yup.mixed()
    .test({
      message: "Please provide a supported file type",
      test: (file, context) => {
        const isValid = file?.type.includes('image/');
        if (!isValid) context?.createError();
        return isValid;
      },
    })
    .test({
      message: `File too big, can't exceed ${2_000_000}`,
      test: (file) => {
        const isValid = file?.size < 2_000_000;
        return isValid;
      },
    }),
});

export default userValidation;