export async function fetchWorldWide() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/about_world`,
    {
      cache: "force-cache",
      // cache: "no-store",
      next: { tags: ["world-wide-operations"] },
    },
  ); // Ensure API URL matches your setup
  console.log("response --> \n", res);
  const world_arr = await res.json();
  const world_wide = world_arr[0];
  return world_wide;
}

export async function fetchEHS() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/about_responsibilities`,
    {
      cache: "force-cache",
      // cache: "no-store",
      next: { tags: ["about-EHS"] },
    },
  ); // Ensure API URL matches your setup
  console.log("response --> \n", res);
  const about_ehs_arr = await res.json();
  const about_ehs = about_ehs_arr[0];
  return about_ehs;
}
