import Portals from "@/components/Portals";
import ProductEdit from "@/components/ProductEdit";
import axios from "axios";
import Link from "next/link";
import React, { useState, useEffect, useRef } from "react";
import Pagination from "rc-pagination";
import "rc-pagination/assets/index.css";

export default function Home() {
  const add = useRef();

  const [params, setParams] = useState({
    itemsPerPage: 2,
    currentPage: 1,
  });

  const [productDetails, setProductDetails] = useState([]);
  const [metaData, setMetaData] = useState({});

  useEffect(() => {
    productData();
  }, [params]);

  const refreshData = () => {
    productData();
  };

  const productData = async () => {
    const token = localStorage.getItem("token");
    try {
      const { data } = await axios.get("http://localhost:3333/products", {
        headers: {
          token: token,
        },
        params: {
          page: params.currentPage,
        },
      });
      setProductDetails(data.data);
      setMetaData(data.meta);
    } catch (err) {
      console.log(err);
    }
  };

  const logoutUser = async (values) => {
    const token = localStorage.getItem("token");
    try {
      const { data } = await axios.post("http://localhost:3333/logout", {
        headers: {
          token: token,
        },
      });
    } catch (err) {
      console.log(err);
    }
  };

  const pageChange = (page) => {
    setParams({
      ...params,
      currentPage: page,
    });
  };

  const userId = () => {
    const user = localStorage.getItem("user");
    if (user) {
      return JSON.parse(user).id;
    } else {
      return null;
    }
  };

  const deleteProduct = async (productId) => {
    const token = localStorage.getItem("token");
    try {
      const { data } = await axios.post(
        `http://localhost:3333/products/${productId}/delete`,
        {
          headers: {
            token: token,
          },
        }
      );
      productData();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="mb-5 overflow-x-auto shadow-[0_4px_4px_rgba(0,0,0,0.05)] mt-8 mr-4 ml-4 py-4 p-4 lg:p-10 lg:pt-[45px]">
      <button type="button" onClick={logoutUser}>
        Logout
      </button>
      <div className="mb-5 justify-end md:flex">
        <div className="flex justify-end gap-5">
          <button
            type="button"
            className="btn shrink-0"
            onClick={() => add.current.open()}
          >
            Add New
          </button>
          <div className="md:w-[240px] md:flex-none">
            <div className="relative">
              <input
                type="text"
                className="form-input pr-10"
                placeholder="Search..."
                // onKeyUp={searchBar}
              />
              <button
                type="button"
                className="absolute top-0 right-0 my-auto inline-flex h-10 w-10 items-center justify-center text-black-dark hover:opacity-70"
              >
                search
              </button>
            </div>
          </div>
        </div>
      </div>

      <table>
        <thead className="bg-[#F7F7F7]">
          <tr>
            <th className="w-[50px]">#</th>
            <th>
              <div className="inline-flex items-center gap-1">
                <button type="button">user_id</button>
              </div>
            </th>
            <th>
              <div className="inline-flex items-center gap-1">
                <button type="button">title</button>
              </div>
            </th>
            <th>
              <div className="inline-flex items-center gap-1">
                <button type="button">price</button>
              </div>
            </th>
            <th>
              <div className="inline-flex items-center gap-1">
                <button type="button">quantity</button>
              </div>
            </th>
            <th>
              <div className="inline-flex items-center gap-1">
                <button type="button">created_at</button>
              </div>
            </th>
            <th>
              <div className="inline-flex items-center gap-1">
                <button type="button">updated_at</button>
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          {productDetails.length ? (
            productDetails.map((product) => {
              return (
                <tr key={product.id}>
                  <td className="font-semibold text-primary">{product.id}</td>
                  <td className="font-semibold text-primary">
                    <Link
                      href={`/products/${product.id}`}
                      className="h-[30px] w-[30px] rounded-sm object-cover"
                    >
                      {product.user_id}
                    </Link>
                  </td>
                  <td className="font-semibold text-primary">
                    {product.title}
                  </td>
                  <td className="font-semibold text-primary">
                    {product.price}
                  </td>
                  <td className="font-semibold text-primary">
                    {product.quantity}
                  </td>
                  <td className="font-semibold text-primary">
                    {product.created_at}
                  </td>
                  <td className="font-semibold text-primary">
                    {product.updated_at}
                  </td>
                  <td className="font-semibold text-primary">
                    <button
                      type="button"
                      onClick={() => deleteProduct(product.user_id)}
                      className="btn"
                    >
                      delete
                    </button>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr className="py-5 text-center text-danger">
              <td>No Data Found</td>
            </tr>
          )}
        </tbody>
      </table>

      <ProductEdit ref={add} data={{}} refresh={refreshData} />
      <div className="flex items-center justify-end gap-2">
        <select
          className="form-select w-auto"
          value={params.itemsPerPage}
          onChange={(e) =>
            setParams({
              ...params,
              itemsPerPage: e.target.value,
            })
          }
        >
          <option value="10">10</option>
          <option value="25">25</option>
          <option value="50">50</option>
          <option value="100">100</option>
        </select>
        <div>
          showing {params.itemsPerPage} of{" "}
          {metaData.total < params.itemsPerPage ? "-" : metaData.total} enteries
        </div>
      </div>
      <Pagination
        className="pagination-data"
        current={params.currentPage}
        total={metaData.total}
        pageSize={params.itemsPerPage}
        onChange={pageChange}
        showPrevNextJumpers={true}
      />

      <Portals />
    </div>
  );
}
