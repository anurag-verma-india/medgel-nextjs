import React from "react";
import { cookies } from "next/headers";
import ClientSideContextHandler from "./ClientSideContextHandler";
import Categories from "./Categories";
import ProductList from "./ProductList";
import { checkAdminFromCookie } from "@/helpers/checkAdmin";
// import ErrorDisplayModal from "./popups/ErrorDisplayModal";
import verifyJwtToken from "@/helpers/jwtHelper";
import EmailPopupContainer from "./EmailPopupContainer";
// import ProductCategoriesPageContainer from "./ProductCategoriesPageContainer";

const ProductCategoriesPage = async () => {
  let tokenValid = false;
  const cookieStore = await cookies();
  const tokenObj = cookieStore.get("token");
  const allowVerificationAfter = Number(
    cookieStore.get("allowVerificationAfter")?.value,
  );
  const emailSent = Boolean(cookieStore.get("sent")?.value);

  const token = tokenObj ? tokenObj.value : "";
  const decodedToken = verifyJwtToken(token);
  if (decodedToken.exp > Date.now() / 1000) {
    // milliseconds -> seconds
    // JWT uses seconds instead of milliseconds for exp
    tokenValid = true;
  }

  const isAdmin = await checkAdminFromCookie();

  return (
    <>
      <div className="flex min-h-screen flex-col items-center bg-gray-50 p-4 sm:p-6 md:p-8">
        <h1 className="p-2 pb-10 pt-5 text-center text-4xl font-bold text-[#1D8892] decoration-[#F9BC65] underline-offset-[15px] sm:pb-20 sm:underline md:text-6xl">
          Products at Medgel
        </h1>
        {/* <ProductCategoriesPageContainer /> */}
        <ClientSideContextHandler
          tokenValid={tokenValid}
          allowVerificationAfter={allowVerificationAfter}
          emailSent={emailSent}
        >
          <EmailPopupContainer
            tokenValid={tokenValid}
            allowVerificationAfter={allowVerificationAfter}
            emailSent={emailSent}
          />
          <div className="mb-10 w-full max-w-6xl overflow-hidden rounded-2xl border-2 bg-neutral-100 shadow-lg">
            <Categories isAdmin={isAdmin} />
            <ProductList isAdmin={isAdmin} />
          </div>
        </ClientSideContextHandler>
      </div>
    </>
  );
};

export default ProductCategoriesPage;
