import { checkAdminFromCookie } from "@/helpers/checkAdmin";
import NewsPage from "./NewsPage";

export const dynamic = "force-dynamic";

export default async function page() {
  let isAdmin = false;
  try {
    isAdmin = await checkAdminFromCookie();
  } catch (error) {
    console.error("Error in checking admin: ", error);
  }

  return <NewsPage checkAdmin={isAdmin} />;
}
