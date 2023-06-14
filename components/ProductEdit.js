import React, {
  useState,
  useImperativeHandle,
  useRef,
  forwardRef,
} from "react";
import { Field, Form, Formik } from "formik";
import CommonSideModal from "./CommonSideModal";
import axios from "axios";
import { useRouter } from "next/router";
import Portals from "./Portals";

const ProductEdit = ({ data, refresh }, forwardedRef) => {
  const modal = useRef();
  const router = useRouter();

  const defaultParams = {
    userid: "",
    title: "",
    price: "",
    quantity: "",
  };

  const [params, setParams] = useState(defaultParams);

  useImperativeHandle(forwardedRef, () => ({
    open() {
      modal?.current?.open();
      if (Object.keys(data).length) {
        setParams({ ...data });
      } else {
        setParams(defaultParams);
      }
    },
    close() {
      modal?.current?.close();
    },
  }));

  const formHandler = async (values) => {
    const token = localStorage.getItem("token");
    try {
      if (router.query.id) {
        const { data } = await axios.post(
          `http://localhost:3333/products/${router.query.id}`,
          values,
          {
            headers: {
              token: token,
            },
          }
        );
        refresh();
      } else {
        const { data } = await axios.post(
          "http://localhost:3333/products",
          values,
          {
            headers: {
              token: token,
            },
          }
        );
        refresh();
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <CommonSideModal ref={modal}>
        <Formik initialValues={params} onSubmit={formHandler}>
          {({ isSubmitting, submitCount, errors }) => (
            <Form className="h-full">
              <div className="flex h-full flex-col justify-between">
                <div className="space-y-4 xl:space-y-[30px]">
                  <h2 className="text-xl font-semibold">{`${
                    Object.keys(data).length ? "Edit" : "Add"
                  } Information`}</h2>
                  <h3 className="text-lg font-semibold text-black-dark">
                    Information
                  </h3>

                  <div className="space-y-5">
                    <div className="grid gap-4 sm:grid-cols-2 xl:gap-[30px]">
                    <label className="form-label">userId:-</label>
                      <Field
                        name="userid"
                        type="text"
                        className="form-input ml-3"
                        placeholder="userId..."
                      />
                      <label className="form-label">title:-</label>
                      <Field
                        name="title"
                        type="text"
                        className="form-input ml-3"
                        placeholder="title..."
                      />
                      <label className="form-label">Price:-</label>
                      <Field
                        name="price"
                        type="text"
                        className="form-input ml-3"
                        placeholder="Price..."
                      />
                      <label className="form-label">Quantity:-</label>
                      <Field
                        name="quantity"
                        type="text"
                        className="form-input ml-3"
                        placeholder="Quantity..."
                      />
                    </div>
                  </div>
                  <div className="mt-5">
                    <button type="submit" className="btn">
                      Save
                    </button>
                  </div>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </CommonSideModal>
      <Portals />
    </div>
  );
};

export default forwardRef(ProductEdit);
