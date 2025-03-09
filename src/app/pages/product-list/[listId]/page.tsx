type ProductListParams = {
  params: Promise<{ listId: string }>;
};

export default async function ProductList({ params }: ProductListParams) {
  const UrlParams = await params;
  const listId = UrlParams.listId;
  return (
    <div className="p-10">
      <h1 className="flex items-center justify-center">List Id</h1>
      <div className="flex items-center justify-center">{listId}</div>
    </div>
  );
}
