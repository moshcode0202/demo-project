import ProductEdit from "@/components/ProductEdit";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useState, useEffect, useRef } from "react";

const Product = () => {
  const router = useRouter();
  const infoModal = useRef();

  const productId = router.query.id;
  const [productInfo, setProductInfo] = useState({});
  const [basicInfo, setBasicInfo] = useState({});

  useEffect(() => {
    if (router.query.id) {
      getData();
    }
  }, [router]);

  const getData = async () => {
    try {
      const token = localStorage.getItem("token");
      const { data } = await axios.get(
        `http://localhost:3333/products/${productId}/`,
        {
          headers: {
            token: token,
          },
        }
      );
      setProductInfo(data);
      setBasicInfo({
        user_id: data.user_id,
        title: data.title,
        price: data.price,
        quantity: data.quantity,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const refreshData = () => {
    getData();
  };

  return (
    <>
      <h1>Product Details</h1>
      <p>ID: {productId}</p>
      <div className="p-4 lg:p-10 lg:pt-[45px]">
        <div className="space-y-4 xl:space-y-[30px]">
          <button
            type="button"
            className="text-primary hover:text-black"
            onClick={() => infoModal.current.open()}
          >
            Edit
          </button>
          <div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 xl:gap-[30px]">
              <div>
                <label className="form-label">UserId:-</label>
                <p className="leading-5">{productInfo.user_id}</p>
              </div>
              <div>
                <label className="form-label">Title</label>
                <p className="leading-5">{productInfo.title}</p>
              </div>
              <div>
                <label className="form-label">Price</label>
                <p className="leading-5">{productInfo.price}</p>
              </div>
              <div>
                <label className="form-label">Quantity</label>
                <p className="leading-5">{productInfo.quantity}</p>
              </div>
              <div>
                <label className="form-label">Created_At</label>
                <p className="leading-5">{productInfo.created_at}</p>
              </div>
              <div>
                <label className="form-label">Updated_At</label>
                <p className="leading-5">{productInfo.updated_at}</p>
              </div>
            </div>
          </div>
        </div>
        <ProductEdit ref={infoModal} data={basicInfo} refresh={refreshData} />
      </div>
    </>
  );
};

export default Product;
