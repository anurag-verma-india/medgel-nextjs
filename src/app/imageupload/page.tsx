import { checkAdminFromCookie } from "@/helpers/checkAdmin";
import ImageUploadClientComponent from "./ImageUploadClientComponent";

import { notFound } from "next/navigation";

const Page = async () => {
  let isAdmin = false;
  try {
    isAdmin = await checkAdminFromCookie();
  } catch (error) {
    console.log("Image upload page error");
    console.log(error);
  }
  // const isAdmin = await checkAdminFromCookie();
  if (!isAdmin) {
    // return <div>You are not authorized to access this page</div>;
    return <>{notFound()}</>;
  }
  return (
    <>
      <ImageUploadClientComponent />
    </>
  );
};

export default Page;
