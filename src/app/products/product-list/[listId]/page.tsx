// pages/products/product-list/[listId]/page.tsx
"use client";
import axios from "axios";
// import { RedirectType, useRouter } from "next/navigation";
import { RedirectType, redirect } from "next/navigation";
import { use, useEffect, useState } from "react";

type ProductListParams = {
  params: Promise<{ listId: string }>;
};

type ProductType = {
  id: string;
  innovator: string;
  product: string;
  code: string;
  composition: string;
  color: string;
};

interface ProductPageState {
  title: string;
  list: ProductType[];
}

export default function ProductList({ params }: ProductListParams) {
  const { listId } = use(params);

  const [productList, setProductList] = useState<ProductPageState>({
    title: "Loading...",
    list: [
      {
        id: "98sdjf",
        innovator: "Loading...",
        product: "",
        code: "",
        composition: "",
        color: "",
      },
    ],
  });
  useEffect(() => {
    async function fetchData() {
      try {
        const productListResponse = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/product_list?product_list_id=${listId}`,
        );
        console.log("product list response:", productListResponse);
        const id_array = productListResponse.data.product_list.product_ids;
        const title = productListResponse.data.product_list.product_list_name;
        // console.log("Title:", title);
        // console.log("ID list:", ids_list);
        // setProductList({ ...productList, title: title });

        const productsRes = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/get_all_products`,
          { product_id_array: id_array },
        );
        const products_list = productsRes.data.products;
        console.log("products list:", products_list);

        const processedProducts: ProductType[] = [];

        for (const product of products_list) {
          processedProducts.push(product);
        }
        setProductList({ title: title, list: processedProducts });
      } catch (error) {
        console.log("Error occurred while fetching product list");
        console.log("Error:", error);
      }
    }
    fetchData();
  }, []);

  const handleBackClick = () => {
    redirect("/products/products-at-medgel", RedirectType.push);
  };

  return (
    <div className="flex flex-col items-center px-4">
      {/* Back Button */}
      <div className="self-start pt-5">
        <button
          onClick={handleBackClick}
          aria-label="Go back"
          className="rounded-full bg-[#1D8892] px-3 py-1 text-white transition-colors hover:bg-[#146d73]"
        >
          &#10094;
        </button>
      </div>

      {/* Page Title */}
      {/* <h1 className="p-2 pb-10 pt-5 text-center text-4xl font-bold text-[#1D8892] underline decoration-[#F9BC65] underline-offset-[15px] md:text-6xl">
        OTC Pharma
      </h1> */}

      {/* Product List Title */}
      <h2 className="mb-8 w-full text-center text-3xl font-bold text-orange-400">
        {productList.title}
      </h2>

      {/* Desktop View - Table */}
      <div className="mb-10 hidden w-full overflow-x-auto rounded-2xl border-2 bg-neutral-100 md:block md:w-5/6">
        <table className="min-w-full">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="px-4 py-3 font-semibold">#</th>
              <th className="px-4 py-3 font-semibold">Innovator</th>
              <th className="px-4 py-3 font-semibold">Product</th>
              <th className="px-4 py-3 font-semibold">Code</th>
              <th className="px-4 py-3 font-semibold">Composition</th>
              <th className="px-4 py-3 font-semibold">Color</th>
            </tr>
          </thead>
          <tbody>
            {productList.list.map((product, index) => (
              <tr key={index} className="border-t border-gray-200">
                <td className="px-4 py-4 font-bold text-orange-500">
                  {/* {product.id} */}
                  {index + 1}
                </td>
                <td className="px-4 py-4">
                  <div className="font-bold text-orange-500">
                    {product.innovator}
                  </div>
                </td>
                <td className="px-4 py-4">{product.product}</td>
                <td className="px-4 py-4">{product.code}</td>
                <td className="px-4 py-4">
                  <div>Each soft gelatin capsule contains:</div>
                  <div>{product.composition}</div>
                </td>
                <td className="px-4 py-4">{product.color}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile View - Vertical Layout */}
      <div className="mb-10 w-full md:hidden">
        {productList.list.map((product, index) => (
          <div
            key={index}
            className="mb-8 overflow-hidden rounded-lg bg-white shadow-md"
          >
            {/* Header */}
            <div className="flex items-center justify-between bg-orange-100 p-3">
              <span className="font-bold text-orange-500">
                {product.innovator}
              </span>
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-500 font-bold text-white">
                {/* {product.id} */}
                {index + 1}
              </span>
            </div>

            {/* Content - Vertical Layout */}
            <div className="p-4">
              <dl>
                {/* Product Field */}
                <div className="border-b py-2">
                  <dt className="mb-1 text-sm font-medium text-gray-500">
                    Product
                  </dt>
                  <dd className="text-sm">{product.product}</dd>
                </div>

                {/* Code Field */}
                <div className="border-b py-2">
                  <dt className="mb-1 text-sm font-medium text-gray-500">
                    Code
                  </dt>
                  <dd className="text-sm">{product.code}</dd>
                </div>

                {/* Composition Field */}
                <div className="border-b py-2">
                  <dt className="mb-1 text-sm font-medium text-gray-500">
                    Composition
                  </dt>
                  <dd className="text-sm">
                    <p>Each soft gelatin capsule contains:</p>
                    <div className="w-full text-sm">{product.composition}</div>
                  </dd>
                </div>

                {/* Color Field */}
                <div className="py-2">
                  <dt className="mb-1 text-sm font-medium text-gray-500">
                    Color
                  </dt>
                  <dd className="text-sm">
                    <span className="mr-2 inline-block">{product.color}</span>
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        ))}
      </div>
      {/* <div className="p-10">
        <h1 className="flex items-center justify-center">List Id</h1>
        <div className="flex items-center justify-center">{listId}</div>
      </div> */}
    </div>
  );
}
