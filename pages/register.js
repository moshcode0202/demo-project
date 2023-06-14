import { Field, Form, Formik } from "formik";
import Link from "next/link";
import * as Yup from "yup";
import React, { useEffect, useState } from "react";
import axios, { HttpStatusCode } from "axios";

const defaultParams = {
  name: "",
  email: "",
  password: "",
  password_confirmation: "",
};

const Register = () => {
  const [params, setParams] = useState(defaultParams);

  const formHandler = async (values) => {
    try {
      const { data } = await axios.post(
        "http://localhost:3333/register",
        values
      );
      router.push("/login");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="min-h-screen">
      <div className="flex min-h-[calc(100vh-77px)] flex-col items-center justify-center p-4">
        <div className="mx-auto w-full max-w-[600px] space-y-[25px] rounded border border-white-light bg-white p-10">
          <h2 className="text-center text-xl font-semibold">Sign Up</h2>
          <Formik initialValues={params} onSubmit={formHandler}>
            {({ isSubmitting, submitCount, errors }) => (
              <Form className="space-y-4">
                <label className="form-label">First name</label>
                <div>
                  <Field
                    name="name"
                    type="text"
                    className="form-input"
                    placeholder="First name..."
                  />
                </div>

                <label className="form-label">Email address</label>
                <div>
                  <Field
                    name="email"
                    type="text"
                    className="form-input"
                    placeholder="Email address..."
                  />
                </div>

                <label className="form-label">Password</label>
                <div>
                  <Field
                    name="password"
                    type="password"
                    className="form-input"
                    placeholder="Password..."
                  />
                </div>

                <label className="form-label">Confirm Password</label>
                <div>
                  <Field
                    name="password_confirmation"
                    type="password"
                    className="form-input"
                    placeholder="Confirm password..."
                  />
                </div>
                <button type="submit" className="btn">Submit</button>
              </Form>
            )}
          </Formik>
          <p className="text-center">
            Already have account?{" "}
            <Link
              href="/login"
              className="font-semibold text-primary transition-all duration-300 hover:text-black-dark"
            >
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
