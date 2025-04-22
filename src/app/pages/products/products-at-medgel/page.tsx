// pages/products/products-at-medgel/page.tsx
import { cookies } from "next/headers";
import ListOfProducts from "./ListOfProducts";
import ProductCategories from "./ProductCategories";
import verifyJwtToken from "@/helpers/jwtHelper";

export default async function ProductPage() {
  let tokenValid = false;
  const cookieStore = await cookies();
  const tokenObj = cookieStore.get("token");
  const token = tokenObj ? tokenObj.value : "";
  // console.log("Token:", token);
  const decodedToken = verifyJwtToken(token);
  console.log("Decoded token:", decodedToken);
  if (decodedToken.exp > Date.now() / 1000) {
    // milliseconds -> seconds
    // JWT uses seconds instead of milliseconds for exp
    tokenValid = true;
  }

  // Define product categories
  // const categories = [
  //   "OTC Products",
  //   "Prescription Products",
  //   "Medical Devices",
  //   "Health Supplements",
  // ];
  const categories = [
    "OTC Products",
    "Natraceuticals Products",
    "Food Supplements",
    "Products Under Development",
  ];
  // const cateogry_ids = [
  //   "68076867fc4571f78ddf2dfe",
  //   "680768c1fc4571f78ddf2e00",
  //   "6807690b6ef2f0812a26954d",
  //   "680769426ef2f0812a269550",
  // ];

  categories.forEach(async (category, i) => {
    // console.log(`Product Name ${i}: ${v}`);
    const category_details = await fetch(
      // `${process.env.NEXT_PUBLIC_API_URL}/page/?title=${title}`,
      `${process.env.NEXT_PUBLIC_API_URL}/product_category?product_category_name=${category}`,
      {
        cache: "no-store",
        // cache: "force-cache",
        // next: { tags: [title] },
      },
    );
    console.log(`Product name: ${category}`);
    console.log(`Product details: ${category_details}`);
  });

  return (
    <div className="flex flex-col items-center">
      <h1 className="p-2 pb-10 pt-5 text-4xl font-bold text-[#1D8892] underline decoration-[#F9BC65] underline-offset-[15px] md:text-6xl">
        Products at Medgel
      </h1>
      {/* Product Categories */}
      <div className="mb-10 w-11/12 overflow-hidden rounded-2xl border-2 bg-neutral-100 md:w-5/6">
        <ProductCategories categories={categories} />
        {/* TODO: Make it so that the active category is the one currently active right now in state*/}
        <ListOfProducts tokenValid={tokenValid} />
      </div>
    </div>
  );
}
