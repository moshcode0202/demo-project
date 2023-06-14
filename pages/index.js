import Portals from "@/components/Portals";
import ProductEdit from "@/components/ProductEdit";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useState, useEffect, useRef } from "react";

export default function Home() {
  const add = useRef();

  const router = useRouter();

  return (
    <div className="mx-auto mt-20 max-w-sm space-y-4">
      <div>
      <button
        type="button"
        className="btn"
        onClick={()=>router.push('/products')}
      >
        ProductPage
      </button>
      </div>
      <div>
      <button
        type="button"
        className="btn"
        onClick={()=>router.push('/order')}
      >
        OrderPage
      </button>
      </div>
    </div>
  );
}
