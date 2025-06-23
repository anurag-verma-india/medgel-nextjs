// pages/products/product-list/[listId]/page.tsx
"use client";
import axios from "axios";
// import { RedirectType, useRouter } from "next/navigation";
import { RedirectType, redirect, useSearchParams } from "next/navigation";
import { ProductListParams } from "@/types";
import { use, useEffect, useState } from "react";
import AddProductPopup from "./AddProductPopup";
import ProductEditPopup from "./ProductEditPopup";
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

const MobileProductList = ({
  productList,
  isAdmin,
}: {
  productList: ProductPageState;
  isAdmin: Boolean;
}) => {
  const openeditmodal = (product) => {
    setProductData(product);
    setProductOpenEditModal(true);
  };

  return (
    <>
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
                  {/* <dd className="text-sm">
                    <span className="mr-2 inline-block">{product.color}</span>
                  </dd> */}
                </div>

                {isAdmin && (
                  <div className="py-2">
                    <dt className="mb-1 text-sm font-medium text-gray-500">
                      Edit
                    </dt>
                    <dd className="text-sm">
                      <button
                        onClick={() => openeditmodal(product)}
                        className="rounded-lg bg-[#1d8892] p-3 text-white"
                      >
                        Edit
                      </button>
                    </dd>
                  </div>
                )}
              </dl>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

const DesktopProductList = ({
  productList,
  isAdmin,
  listId,
}: {
  productList: ProductPageState;
  isAdmin: Boolean;
  listId: string;
}) => {
  const [openProductEditModal, setProductOpenEditModal] =
    useState<Boolean>(false);
  const [productdata, setProductData] = useState({});
  const openeditmodal = (product) => {
    setProductData(product);
    setProductOpenEditModal(true);
  };
  return (
    <>
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
              {isAdmin && <th className="px-4 py-3 font-semibold">Edit</th>}
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
                <td className="px-4 py-4">
                  {isAdmin && (
                    <button
                      onClick={() => openeditmodal(product)}
                      className="rounded-lg bg-[#1d8892] p-3 text-white"
                    >
                      Edit
                    </button>
                  )}
                </td>
              </tr>
            ))}

            {openProductEditModal && (
              <ProductEditPopup
                openProductEditModal={openProductEditModal}
                setProductOpenEditModal={setProductOpenEditModal}
                productdata={productdata}
                listId={listId}
              />
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default function ProductList({
  params,
  checkAdmin,
}: {
  checkAdmin: boolean;
  params: ProductListParams;
}) {
  const { listId } = use(params);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isEmpty, setIsEmpty] = useState<boolean>(false);
  const [productList, setProductList] = useState<ProductPageState>({
    title: "",
    list: [],
  });
  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        const productListResponse = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/product_list?product_list_id=${listId}`,
        );
        // console.log("product list response:", productListResponse);
        const id_array: string[] =
          productListResponse.data.product_list.product_ids;
        const title = productListResponse.data.product_list.product_list_name;
        // console.log("Title:", title);
        // console.log("ID list:", ids_list);
        setProductList({ ...productList, title: title });
        // console.log("Id Array");
        // console.log(id_array);

        // setProductList({ title, list: [] });

        // There are elements in this list
        if (id_array && id_array.length > 0) {
          const productsRes = await axios.post(
            `${process.env.NEXT_PUBLIC_API_URL}/get_all_products`,
            { product_id_array: id_array },
          );
          // console.log("Get all products res: ")
          // console.log(productsRes)
          const products_list = productsRes.data.products;
          console.log("products list:", products_list);

          const processedProducts: ProductType[] = [];

          for (const product of products_list) {
            processedProducts.push(product);
          }
          setProductList({ title: title, list: processedProducts });
        } else {
          setIsEmpty(true);
        }
        setIsLoading(false);
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
  const [openEditModal, setOpenEditModal] = useState<Boolean>(false);

  return (
    <>
      <div className="flex flex-col items-center">
        <div className="flex min-w-full flex-col items-center px-4">
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
          {isLoading && (
            <>
              <h2 className="mb-8 w-max text-center text-3xl font-bold text-orange-400">
                Loading...
              </h2>
              <div className="h-screen" />
            </>
          )}
          {!isLoading && (
            <>
              {checkAdmin && (
                <button
                  onClick={() => setOpenEditModal(true)}
                  className="ml-auto rounded-lg bg-[#1d8892] p-3 text-white"
                >
                  Add
                </button>
              )}
              {/* Product List Title */}
              <h2 className="mb-8 w-full text-center text-3xl font-bold text-orange-400">
                {productList.title}
              </h2>

              {openEditModal && (
                <AddProductPopup
                  openEditModal={openEditModal}
                  setOpenEditModal={setOpenEditModal}
                  listId={listId}
                />
              )}

              {isEmpty && (
                <>
                  <div className="text-3xl">This list is empty</div>
                  {/* <div className="flex w-full justify-center">{children}</div> */}
                  <div className="h-screen" />
                </>
              )}
              {!isEmpty && (
                <>
                  <MobileProductList
                    isAdmin={checkAdmin}
                    productList={productList}
                  />
                  <DesktopProductList
                    listId={listId}
                    isAdmin={checkAdmin}
                    productList={productList}
                  />
                </>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
}
