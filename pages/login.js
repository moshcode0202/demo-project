import axios from "axios";
import { Field, Form, Formik } from "formik";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";

const defaultParams = {
  email: "",
  password: "",
};

const Login = () => {
  const router = useRouter();

  const [params, setParams] = useState(defaultParams);

  const formHandler = async (values) => {
    try {
      const { data } = await axios.post("http://localhost:3333/login", values);
      localStorage.setItem('token', data.token);
      router.push("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="min-h-screen">
      <div className="flex min-h-[calc(100vh-77px)] flex-col items-center justify-center p-4">
        <div className="mx-auto w-full max-w-[600px] space-y-[25px] rounded border border-white-light bg-white p-10">
          <h2 className="text-center text-xl font-semibold">Sign In</h2>

          <Formik initialValues={params} onSubmit={formHandler}>
            {({ isSubmitting, submitCount, errors }) => (
              <Form className="space-y-4">
                <div className={submitCount && errors.email && "has-error"}>
                  <label className="form-label">Email address</label>
                  <div>
                    <Field
                      name="email"
                      type="text"
                      className="form-input"
                      placeholder="Email address..."
                    />
                  </div>
                </div>

                <div className={submitCount && errors.password && "has-error"}>
                  <label className="form-label">Password</label>
                  <div>
                    <Field
                      name="password"
                      type="password"
                      className="form-input"
                      placeholder="Password..."
                    />
                  </div>
                </div>

                <div>
                  <Link
                    href="/forgot-password"
                    className="text-sm font-semibold text-primary hover:text-black-dark"
                  >
                    Forgot Password?
                  </Link>
                </div>
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </Form>
            )}
          </Formik>
          <p className="text-center">
            Don&apos;t have account?{" "}
            <Link
              href="/register"
              className="font-semibold text-primary transition-all duration-300 hover:text-black-dark"
            >
              Sign up
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
