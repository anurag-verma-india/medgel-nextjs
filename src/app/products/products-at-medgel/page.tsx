// src/app/products/products-at-medgel/page.tsx
import { cookies } from "next/headers";
import verifyJwtToken from "@/helpers/jwtHelper";
import ProductContainer from "./ProductContainer";
// import IfAdminShowThis from "@/app/_common_component/IfAdminShowThis";
import EditProductsPopupContainer from "./EditProductsPopup";
import { checkAdminFromCookie } from "@/helpers/checkAdmin";

export default async function ProductPage() {
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
      {/* <IfAdminShowThis> */}
      {isAdmin && <EditProductsPopupContainer />}
      {/* </IfAdminShowThis> */}
      <div className="flex flex-col items-center">
        <h1 className="p-2 pb-10 pt-5 text-center text-4xl font-bold text-[#1D8892] underline decoration-[#F9BC65] underline-offset-[15px] md:text-6xl">
          Products at Medgel
        </h1>
        {/* Product Categories */}
        <div className="mb-10 w-11/12 overflow-hidden rounded-2xl border-2 bg-neutral-100 md:w-5/6">
          <ProductContainer
            tokenValid={tokenValid}
            allowVerificationAfter={allowVerificationAfter}
            emailSent={emailSent}
          />
        </div>
      </div>
    </>
  );
}
