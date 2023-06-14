import OrderEdit from "@/components/OrderEdit";
import Portals from "@/components/Portals";
import axios from "axios";
import Link from "next/link";
import Pagination from "rc-pagination";
import "rc-pagination/assets/index.css";
import React, { useRef, useState, useEffect } from "react";

const Home = () => {
  const add = useRef();

  const [params, setParams] = useState({
    itemsPerPage: 2,
    currentPage: 1,
  });

  const [orderDeatils, setOrderDeatils] = useState([]);
  const [metaData, setMetaData] = useState({});

  useEffect(() => {
    orderData();
  }, [params]);

  const refreshData = () => {
    orderData();
  };

  const orderData = async () => {
    const token = localStorage.getItem("token");
    try {
      const { data } = await axios.get("http://localhost:3333/orders", {
        headers: {
          token: token,
        },
        params: {
          page: params.currentPage,
        },
      });
      setOrderDeatils(data.data);
      setMetaData(data.meta);
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

  return (
    <div className="mb-5 overflow-x-auto shadow-[0_4px_4px_rgba(0,0,0,0.05)] mt-8 mr-4 ml-4 py-4 p-4 lg:p-10 lg:pt-[45px]">
      <button
        type="button"
        className="btn"
        // onClick={logoutUser}
      >
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
          {orderDeatils.length ? (
            orderDeatils.map((order) => {
              return (
                <tr key={order.id}>
                  <td className="font-semibold text-primary">{order.id}</td>
                  <td className="font-semibold text-primary">
                    <Link
                      href={`/products/${order.id}`}
                      className="h-[30px] w-[30px] rounded-sm object-cover"
                    >
                      {order.order_userid}
                    </Link>
                  </td>
                  <td className="font-semibold text-primary">
                    {order.order_details}
                  </td>
                  <td className="font-semibold text-primary">
                    {order.order_amount}
                  </td>
                  <td className="font-semibold text-primary">
                    {order.order_quantity}
                  </td>
                  <td className="font-semibold text-primary">
                    {order.created_at}
                  </td>
                  <td className="font-semibold text-primary">
                    {order.updated_at}
                  </td>
                  <td className="font-semibold text-primary">
                    <button
                      type="button"
                      onClick={() => deleteProduct(product.id)}
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

      <OrderEdit ref={add} data={{}} refresh={refreshData} />
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
};

export default Home;
