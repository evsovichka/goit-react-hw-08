import { ErrorMessage, Field, Form, Formik } from "formik";
import { useId } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../redux/auth/operations";
import * as Yup from "yup";
import style from "./LoginForm.module.css";

const initialValues = {
  email: "",
  password: "",
};

const loginSchema = Yup.object().shape({
  email: Yup.string().email("Not valid").required("Required"),
  password: Yup.string()
    .min(4, "Too short")
    .max(16, "Too long")
    .required("Required"),
});

export default function LoginForm() {
  const id = useId();
  const dispatch = useDispatch();

  const handleSubmit = (values, actions) => {
    dispatch(login(values));
    actions.resetForm();
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={loginSchema}
    >
      <Form className={style.form}>
        <div className={style.formField}>
          <label className={style.label} htmlFor={`email-${id}`}>
            Email
          </label>
          <Field
            className={style.input}
            type="email"
            name="email"
            id={`email-${id}`}
            placeholder="Enter your email"
          />
          <ErrorMessage name="email" component="span" />
        </div>
        <div className={style.formField}>
          <label className={style.label} htmlFor={`password-${id}`}>
            Password
          </label>
          <Field
            className={style.input}
            type="password"
            name="password"
            id={`password-${id}`}
            placeholder="Enter your password"
          />
          <ErrorMessage name="password" component="span" />
        </div>
        <button className={style.btn} type="submit">
          Log in
        </button>
      </Form>
    </Formik>
  );
}
