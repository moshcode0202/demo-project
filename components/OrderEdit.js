import React, {
  useRef,
  useState,
  useImperativeHandle,
  forwardRef,
} from "react";
import CommonSideModal from "./CommonSideModal";
import { useRouter } from "next/router";
import { Field, Form, Formik } from "formik";
import Portals from "./Portals";
import axios from "axios";

const OrderEdit = ({ data, refresh }, forwardedRef) => {
  const modal = useRef();
  const router = useRouter();

  const defaultParams = {
    userid: "",
    orderdetails: "",
    orderquantity: "",
    orderamount: "",
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
      const { data } = await axios.post(
        "http://localhost:3333/orders",
        values,
        {
          headers: {
            token: token,
          },
        }
      );
      refresh();
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
                      <label className="form-label">UserId:-</label>
                      <Field
                        name="userid"
                        type="text"
                        className="form-input ml-3"
                        placeholder="UserId..."
                      />
                      <label className="form-label">OrderDetails:-</label>
                      <Field
                        name="orderdetails"
                        type="text"
                        className="form-input ml-3"
                        placeholder="OrderDetails..."
                      />
                      <label className="form-label">OrderAmount:-</label>
                      <Field
                        name="orderamount"
                        type="text"
                        className="form-input ml-3"
                        placeholder="OrderAmount..."
                      />
                      <label className="form-label">OrderQuantity:-</label>
                      <Field
                        name="orderquantity"
                        type="text"
                        className="form-input ml-3"
                        placeholder="OrderQuantity..."
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

export default forwardRef(OrderEdit);
