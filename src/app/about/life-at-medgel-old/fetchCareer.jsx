

export default async function fetchCareer() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/careers`, {
        cache: "force-cache",
        // cache: "no-store",
        next: { tags: ["life-at-medgel"] },
    }); // Ensure API URL matches your setup
    // console.log("response --> \n", res);
    const career_arr = await res.json();
    const career = career_arr[0];
    return career;
}



