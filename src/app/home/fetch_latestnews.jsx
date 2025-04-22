export async function latestNews() {
    
    try{
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/home_latest_news`, {
            // cache: "force-cache",
            cache: "no-store",
            next: { tags: ["pages/home#LatestAtMedgel"] },
          });

          if(!res.ok) throw new Error(`Failed to fetch latest news data: ${res.status}`);
          const news_arr = await res.json();
          return news_arr[0] || {}; //Return an empty object if no data
          } catch (error) {
            console.error("Error fetching policies",error);
            return {};//Default fallback

    }

}
