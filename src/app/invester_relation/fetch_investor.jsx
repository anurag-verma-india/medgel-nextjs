// //! Policy

// export  async function fetchPolicy() {
//     const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/investor_policy`, {
//         cache: "force-cache",
//         // cache: "no-store",
//         next: { tags: ["pages/about-us/about-medgel#investor"] },
//     }); // Ensure API URL matches your setup
//     // console.log("response --> \n", res);
//     const policy_arr = await res.json();
//     const policy = policy_arr[0];
//     return policy;
// }


// //! shareholder

// export  async function fetchShareholder() {
//     const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/investor_shareholder`, {
//         cache: "force-cache",
//         // cache: "no-store",
//         next: { tags: ["pages/about-us/about-medgel#investor"] },
//     }); // Ensure API URL matches your setup
//     // console.log("response --> \n", res);
//     const shareholder_arr = await res.json();
//     const shareholder = shareholder_arr[0];
//     return shareholder;
// }




//! Policy
export async function fetchPolicy() {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/investor_policy`, {
        cache: "force-cache",
        next: { tags: ["pages/about-us/about-medgel#investor"] },
      });
      if (!res.ok) throw new Error(`Failed to fetch policy data: ${res.status}`);
      const policy_arr = await res.json();
      return policy_arr[0] || {}; // Return an empty object if no data
    } catch (error) {
      console.error("Error fetching policies:", error);
      return {}; // Default fallback
    }
  }
  
  //! Shareholder
  export async function fetchShareholder() {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/investor_shareholder`, {
        cache: "force-cache",
        next: { tags: ["pages/about-us/about-medgel#investor"] },
      });
      if (!res.ok) throw new Error(`Failed to fetch shareholder data: ${res.status}`);
      const shareholder_arr = await res.json();
      return shareholder_arr[0] || {}; // Return an empty object if no data
    } catch (error) {
      console.error("Error fetching shareholders:", error);
      return {}; // Default fallback
    }
  }
  
