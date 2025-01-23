export default async function fetchPage(title: string) {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/page/?title=${title}`,
        {
            cache: "force-cache",
            // cache: "no-store",
            next: { tags: [title] },
        }
    );
    const page = await res.json();
    return page;
}
