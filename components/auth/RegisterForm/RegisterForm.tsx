"use client";

import Link from "next/link";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import styles from "./RegisterForm.module.css";

interface RegisterFormValues {
  name: string;
  email: string;
  password: string;
  repeatPassword: string;
}

const initialValues: RegisterFormValues = {
  name: "",
  email: "",
  password: "",
  repeatPassword: "",
};

const validationSchema = Yup.object({
  name: Yup.string()
    .trim()
    .min(2, "Name must be at least 2 characters")
    .max(32, "Name must be no more than 32 characters")
    .required("Name is required"),

  email: Yup.string()
    .email("Enter a valid email address")
    .max(64, "Email must be no more than 64 characters")
    .required("Email is required"),

  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .max(64, "Password must be no more than 64 characters")
    .required("Password is required"),

  repeatPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Please repeat your password"),
});

export default function RegisterForm() {
  const handleSubmit = async (values: RegisterFormValues) => {
    console.log(values);
  };

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>Register</h1>

      <p className={styles.description}>
        Join our community of mindfulness
        <br />
        and wellbeing!
      </p>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className={styles.form}>
            <div className={styles.field}>
              <label htmlFor="name">Enter your name</label>

              <Field
                id="name"
                name="name"
                type="text"
                placeholder="Max"
                className={styles.input}
              />

              <ErrorMessage
                name="name"
                component="span"
                className={styles.error}
              />
            </div>

            <div className={styles.field}>
              <label htmlFor="email">Enter your email address</label>

              <Field
                id="email"
                name="email"
                type="email"
                placeholder="email@gmail.com"
                className={styles.input}
              />

              <ErrorMessage
                name="email"
                component="span"
                className={styles.error}
              />
            </div>

            <div className={styles.field}>
              <label htmlFor="password">Create a strong password</label>

              <Field
                id="password"
                name="password"
                type="password"
                placeholder="********"
                className={styles.input}
              />

              <ErrorMessage
                name="password"
                component="span"
                className={styles.error}
              />
            </div>

            <div className={styles.field}>
              <label htmlFor="repeatPassword">Repeat your password</label>

              <Field
                id="repeatPassword"
                name="repeatPassword"
                type="password"
                placeholder="********"
                className={styles.input}
              />

              <ErrorMessage
                name="repeatPassword"
                component="span"
                className={styles.error}
              />
            </div>

            <button
              type="submit"
              className={styles.submitButton}
              disabled={isSubmitting}
            >
              Create account
            </button>
          </Form>
        )}
      </Formik>

      <p className={styles.loginText}>
        Already have an account?{" "}
        <Link href="/login" className={styles.loginLink}>
          Log in
        </Link>
      </p>
    </div>
  );
}