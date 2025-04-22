export async function fetchService() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products_services`, {
        cache: "force-cache",
        // cache: "no-store",
        next: { tags: ["page/products/medgel-services#MedgelServices"] },
    }); // Ensure API URL matches your setup
    console.log("response --> \n", res);
    const service_arr = await res.json();
    const service = service_arr[0];
    return service;
}