// file_path: "@/helpers/getPage"

import { PageObject, BasePageContent } from "@/types";

export default async function fetchPage<T extends BasePageContent = BasePageContent>(
  title: string
): Promise<PageObject<T>> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/page/?title=${title}`,
    {
      // cache: "force-cache",
      cache: "no-store",
      next: { tags: [title] },
    }
  );
  const page = await res.json();
  // console.log("Page: ", page);
  return page as PageObject<T>;
}
