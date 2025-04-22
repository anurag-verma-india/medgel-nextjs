// pages/products/product-list/[listId]/page.tsx
"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type ProductListParams = {
  params: { listId: string };
};

type AlkaProduct = {
  id: number;
  innovator: string;
  product: string;
  code: string;
  composition: {
    mainIngredient: string;
    dosage: string;
    secondaryIngredient?: string;
    secondaryDosage?: string;
    tertiaryIngredient?: string;
    tertiaryDosage?: string;
  }[];
  color: string[];
};

export default function ProductList({ params }: ProductListParams) {
  const router = useRouter();
  const { listId } = params;



  const [productList, setProductList] = useState<AlkaProduct[]>([
    {
      id: 1,
      innovator: "Day Time",
      product: "Acetaminophen + Dextromethophan + Phenylephrine Soft Gels",
      code: "AP",
      composition: [
        {
          mainIngredient: "Acetaminophen",
          dosage: "325 mg",
          secondaryIngredient: "Dextromethophan",
          secondaryDosage: "10 mg",
          tertiaryIngredient: "Phenylephrine HCL",
          tertiaryDosage: "5 mg",
        },
      ],
      color: ["Orange", "Transparent"],
    },
    {
      id: 2,
      innovator: "Night Time",
      product:
        "Acetaminophen + Dextromethophan + Doxylamine Succinate Soft Gels",
      code: "AS",
      composition: [
        {
          mainIngredient: "Acetaminophen",
          dosage: "325 mg",
          secondaryIngredient: "Dextromethophan HBr",
          secondaryDosage: "15 mg",
          tertiaryIngredient: "Doxylamine Succinate",
          tertiaryDosage: "6.25 mg",
        },
      ],
      color: ["Green", "Transparent"],
    },
    {
      id: 3,
      innovator: "Sinus Day Time",
      product: "Acetaminophen + Phenylephrine Soft Gels",
      code: "SD",
      composition: [
        {
          mainIngredient: "Acetaminophen",
          dosage: "325 mg",
          secondaryIngredient: "Phenylephrine HCL",
          secondaryDosage: "5 mg",
        },
      ],
      color: ["Light Orange", "Transparent"],
    },
    {
      id: 4,
      innovator: "Sinus Night Time",
      product: "Acetaminophen + Doxylamine Succinate + Phenylephrine Soft Gels",
      code: "SN",
      composition: [
        {
          mainIngredient: "Acetaminophen",
          dosage: "325 mg",
          secondaryIngredient: "Doxylamine Succinate",
          secondaryDosage: "6.25 mg",
          tertiaryIngredient: "Phenylephrine HCL",
          tertiaryDosage: "5 mg",
        },
      ],
      color: ["Light Blue", "Transparent"],
    },
  ]);

  const handleBackClick = () => {
    router.push("/products/products-at-medgel");
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
      <h1 className="p-2 pb-10 pt-5 text-center text-4xl font-bold text-[#1D8892] underline decoration-[#F9BC65] underline-offset-[15px] md:text-6xl">
        OTC Pharma
      </h1>

      {/* Product List Title */}
      <h2 className="mb-8 w-full text-center text-3xl font-bold text-orange-400">
        Alka Seltzer Plus Range
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
            {productList.map((product) => (
              <tr key={product.id} className="border-t border-gray-200">
                <td className="px-4 py-4 font-bold text-orange-500">
                  {product.id}
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
                  <div>
                    {product.composition[0].mainIngredient}
                    ................................
                    {product.composition[0].dosage}
                  </div>
                  {product.composition[0].secondaryIngredient && (
                    <div>
                      {product.composition[0].secondaryIngredient}
                      ............................
                      {product.composition[0].secondaryDosage}
                    </div>
                  )}
                  {product.composition[0].tertiaryIngredient && (
                    <div>
                      {product.composition[0].tertiaryIngredient}
                      ..............................
                      {product.composition[0].tertiaryDosage}
                    </div>
                  )}
                </td>
                <td className="px-4 py-4">
                  {product.color.map((c, i) => (
                    <div key={i}>{c}</div>
                  ))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile View - Vertical Layout */}
      <div className="mb-10 w-full md:hidden">
        {productList.map((product) => (
          <div
            key={product.id}
            className="mb-8 overflow-hidden rounded-lg bg-white shadow-md"
          >
            {/* Header */}
            <div className="flex items-center justify-between bg-orange-100 p-3">
              <span className="font-bold text-orange-500">
                {product.innovator}
              </span>
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-500 font-bold text-white">
                {product.id}
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
                    <table className="w-full text-sm">
                      <tbody>
                        <tr>
                          <td>{product.composition[0].mainIngredient}</td>
                          <td className="text-right">
                            {product.composition[0].dosage}
                          </td>
                        </tr>
                        {product.composition[0].secondaryIngredient && (
                          <tr>
                            <td>
                              {product.composition[0].secondaryIngredient}
                            </td>
                            <td className="text-right">
                              {product.composition[0].secondaryDosage}
                            </td>
                          </tr>
                        )}
                        {product.composition[0].tertiaryIngredient && (
                          <tr>
                            <td>{product.composition[0].tertiaryIngredient}</td>
                            <td className="text-right">
                              {product.composition[0].tertiaryDosage}
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </dd>
                </div>

                {/* Color Field */}
                <div className="py-2">
                  <dt className="mb-1 text-sm font-medium text-gray-500">
                    Color
                  </dt>
                  <dd className="text-sm">
                    {product.color.map((c, i) => (
                      <span key={i} className="mr-2 inline-block">
                        {c}
                      </span>
                    ))}
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        ))}
      </div>
      <div className="p-10">
        <h1 className="flex items-center justify-center">List Id</h1>
        <div className="flex items-center justify-center">{listId}</div>
      </div>
    </div>
  );
}
