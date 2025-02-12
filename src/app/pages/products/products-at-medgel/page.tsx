import ListOfProducts from "./ListOfProducts";

export default function ProductPage() {
  return (
    <div className="flex flex-col items-center">
      <h1 className="p-2 pb-10 pt-5 text-6xl font-bold text-[#1D8892] underline decoration-[#F9BC65] underline-offset-[15px]">
        Products at Medgel
      </h1>
      <div className="mb-10 w-5/6 overflow-hidden rounded-2xl border-2 bg-neutral-100">
        <div className="flex w-full flex-row justify-evenly bg-white text-2xl font-bold">
          <div className="flex w-full justify-center border-b-2 border-r-2 border-neutral-200 bg-neutral-100 p-8">
            OTC Products
          </div>
          <div className="flex w-full justify-center border-b-2 border-r-2 border-neutral-200 p-8">
            OTC Products
          </div>
          <div className="flex w-full justify-center border-b-2 border-r-2 border-neutral-200 p-8">
            OTC Products
          </div>
          <div className="flex w-full justify-center border-b-2 border-r-2 border-neutral-200 p-8">
            OTC Products
          </div>
        </div>
        <ListOfProducts />
      </div>
    </div>
  );
}
