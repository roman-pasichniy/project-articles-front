"use client";

import { ErrorMessage, Field, Form, Formik } from "formik";
import Link from "next/link";
import { useState } from "react";
import * as Yup from "yup";

import Button from "@/components/common/Button/Button";
import styles from "./LoginForm.module.css";

type LoginFormValues = {
  email: string;
  password: string;
};

const initialValues: LoginFormValues = {
  email: "",
  password: "",
};

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Enter a valid email address")
    .required("Email is required"),

  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
});

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (values: LoginFormValues) => {
    console.log(values);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      <Form className={styles.form}>
        <h1 className={styles.title}>Login</h1>

        <div className={styles.field}>
          <label htmlFor="email" className={styles.label}>
            Enter your email address
          </label>

          <Field
            id="email"
            name="email"
            type="email"
            placeholder="email@gmail.com"
            className={styles.input}
          />

          <ErrorMessage
            name="email"
            component="p"
            className={styles.error}
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="password" className={styles.label}>
            Enter a password
          </label>

          <div className={styles.passwordWrapper}>
            <Field
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="********"
              className={`${styles.input} ${styles.passwordInput}`}
            />

            <button
              type="button"
              className={styles.eyeButton}
              onClick={() => setShowPassword((prev) => !prev)}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
                /* Eye off */
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    d="M3 3L21 21"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                  <path
                    d="M10.6 10.6A2 2 0 0 0 13.4 13.4"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                  <path
                    d="M9.9 4.24A9.8 9.8 0 0 1 12 4C17.5 4 21 9 21 12C20.65 13.23 19.99 14.42 19.08 15.47"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                  <path
                    d="M6.61 6.61C4.82 7.81 3.55 9.67 3 12C4 16 7.5 20 12 20C13.32 20 14.55 19.66 15.65 19.08"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              ) : (
                /* Eye */
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    d="M2.5 12C4 7.5 7.5 5 12 5C16.5 5 20 7.5 21.5 12C20 16.5 16.5 19 12 19C7.5 19 4 16.5 2.5 12Z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                  <circle
                    cx="12"
                    cy="12"
                    r="3"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                </svg>
              )}
            </button>
          </div>

          <ErrorMessage
            name="password"
            component="p"
            className={styles.error}
          />
        </div>

        <Button type="submit" variant="fill" size="md" fullWidth>
          Login
        </Button>

        <p className={styles.registerText}>
          Don&apos;t have an account?{" "}
          <Link href="/register" className={styles.registerLink}>
            Register
          </Link>
        </p>
      </Form>
    </Formik>
  );
}