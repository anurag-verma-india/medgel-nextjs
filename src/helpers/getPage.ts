import { PageObject } from "@/types";
export default async function fetchPage(title: string): Promise<PageObject> {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/page/?title=${title}`,
        {
            cache: "force-cache",
            // cache: "no-store",
            next: { tags: [title] },
        }
    );
    const page = await res.json();
    // console.log("Page: ", page);
    return page;
}
