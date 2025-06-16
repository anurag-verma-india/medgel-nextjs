import { checkAdminFromCookie } from "@/helpers/checkAdmin"
import NewsPage from "./NewsPage"

export default async function page() {
  const isAdmin = await checkAdminFromCookie()
  return <NewsPage checkAdmin={isAdmin}/>
}