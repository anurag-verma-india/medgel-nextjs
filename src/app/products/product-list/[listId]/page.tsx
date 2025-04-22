// product-list/[listId]/page.tsx

type ProductListParams = {
  params: Promise<{ listId: string }>;
};

export default async function ProductList({ params }: ProductListParams) {
  // TODO: Make sure that the user's token is checked in api call too
  const UrlParams = await params;
  const listId = UrlParams.listId;

  const product_list_URL = `product_list?product_list_id=${listId}`;
  // `product_category?product_category_name=${listId}`;
  console.log(`${process.env.NEXT_PUBLIC_API_URL}/${product_list_URL}`);
  // const req_url = `${process.env.NEXT_PUBLIC_API_URL}/${product_list_URL}`;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/${product_list_URL}`,
    // {
    //   cache: "force-cache",
    //   // cache: "no-store",
    //   next: { tags: [listId] },
    // },
  );
  // const res = await GET(req_url);

  const res_json = await res.json();
  // console.log(res.json);
  console.log(res_json);

  return (
    <>
      <div className="flex flex-col items-center">
        <h1 className="p-2 pb-10 pt-5 text-6xl font-bold text-[#1D8892] underline decoration-[#F9BC65] underline-offset-[15px]">
          List Title
        </h1>
        {/* Product Categories */}
        <div className="mb-10 w-5/6 overflow-hidden rounded-2xl border-2 bg-neutral-100">
          <div className="flex w-full flex-row justify-evenly bg-white text-2xl font-bold"></div>

          <div className="text-2xl text-orange-400">
            <div
              className="m-6 flex flex-row rounded-xl bg-white px-2 py-3"
              // onClick={() => HandleListClick("1")}
            >
              {/* <p className="w-full">Row 1</p> */}
              <p className="w-full">
                {res_json.product_list &&
                  res_json.product_list.product_list_name}
              </p>

              {/* <div className="flex min-w-fit flex-row text-neutral-500"> */}
              {/* <p className="min-w-fit">4 Products</p> */}
              {/* <RightPointerBracketSvg /> */}
              {/* </div> */}
            </div>
          </div>
        </div>
      </div>

      <div className="p-10">
        <h1 className="flex items-center justify-center">List Id</h1>
        <div className="flex items-center justify-center">{listId}</div>
      </div>
    </>
  );
}
